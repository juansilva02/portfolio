"""Local-only provisioner. Accepts jobs exclusively from the verified control database."""
from contextlib import contextmanager
from datetime import datetime, timezone
import json
import hashlib
import hmac
import os
from pathlib import Path
import re
import sqlite3
import subprocess
import time

DATABASE = os.environ.get("BROKER_DB", "/data/auth.sqlite")
MAX_DEMOS = int(os.environ.get("MAX_DEMOS", "2"))
PROJECT_PREFIX = os.environ.get("DEMO_PROJECT_PREFIX", "zd-demo-")
PROXY_CONTAINER = os.environ.get("DEMO_PROXY_CONTAINER", "zd-demo-local-proxy")
if not re.fullmatch(r"[a-z0-9][a-z0-9_-]*-", PROJECT_PREFIX):
    raise ValueError("Invalid Docker project prefix")


@contextmanager
def connection():
    db = sqlite3.connect(DATABASE, timeout=30)
    db.row_factory = sqlite3.Row
    try:
        with db:
            yield db
    finally:
        db.close()


def environment(demo, ready_at=""):
    if not re.fullmatch("[a-f0-9]{32}", demo["id"]):
        raise ValueError("Invalid instance identifier")
    # Distinct runtime credential, deterministically recoverable only by control.
    app_password = hmac.new(demo["db_password"].encode(), b"zuzudev-runtime-db-v1", hashlib.sha256).hexdigest()
    return dict(os.environ, DEMO_ID=demo["id"], DB_PASSWORD=demo["db_password"], APP_DB_PASSWORD=app_password,
                JWT_SECRET=demo["jwt_secret"], ADMIN_EMAIL=demo["email"],
                ADMIN_PASSWORD=demo["admin_password"], GOOGLE_SUBJECT=demo["subject"],
                OWNER_NAME=json.loads(demo["lead"])["name"], READY_AT=ready_at,
                INSTANCE_ORIGIN=demo["instance_origin"],
                INSTANCE_SECRET=demo["instance_secret"])


def compose(demo, *args, ready_at="", input=None):
    # No shell and no client-supplied paths, commands, images or project names.
    return subprocess.run(["docker", "compose", "-p", PROJECT_PREFIX+demo["id"],
                           "-f", "/worker/tenant.compose.yml", *args],
                          env=environment(demo, ready_at), capture_output=True, input=input,
                          timeout=300, check=True).stdout


def healthy(demo, service, path, port, ready_at=""):
    script = "fetch('http://localhost:"+str(port)+path+"').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
    for _ in range(90):
        try:
            compose(demo, "exec", "-T", service, "node", "-e", script, ready_at=ready_at)
            return
        except subprocess.CalledProcessError:
            time.sleep(2)
    raise RuntimeError("Instance health check failed")


def prepare_database(demo):
    compose(demo, "up", "-d", "--wait", "db")
    compose(demo, "run", "--rm", "-T", "migrate")
    password = environment(demo)["APP_DB_PASSWORD"]
    # Password is generated hex, sent on stdin, never command arguments or logs.
    sql = """BEGIN;
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname='demo_app') THEN
    CREATE ROLE demo_app LOGIN;
  END IF;
END $$;
ALTER ROLE demo_app WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD '%s';
REVOKE ALL ON DATABASE demo FROM PUBLIC;
GRANT CONNECT ON DATABASE demo TO demo_app;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO demo_app;
GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA public TO demo_app;
GRANT USAGE,SELECT ON ALL SEQUENCES IN SCHEMA public TO demo_app;
ALTER DEFAULT PRIVILEGES FOR ROLE demo IN SCHEMA public GRANT SELECT,INSERT,UPDATE,DELETE ON TABLES TO demo_app;
ALTER DEFAULT PRIVILEGES FOR ROLE demo IN SCHEMA public GRANT USAGE,SELECT ON SEQUENCES TO demo_app;
REVOKE ALL ON TABLE public._prisma_migrations FROM demo_app;
COMMIT;
""" % password
    compose(demo, "exec", "-T", "db", "psql", "-X", "-v", "ON_ERROR_STOP=1", "-U", "demo", "-d", "demo", input=sql.encode())


def attach_proxy(demo):
    network = PROJECT_PREFIX+demo["id"]+"-edge"
    inspection = subprocess.run(["docker", "network", "inspect", network], capture_output=True,
                                check=True, timeout=30)
    members = json.loads(inspection.stdout)[0]["Containers"].values()
    if not any(member["Name"] == PROXY_CONTAINER for member in members):
        subprocess.run(["docker", "network", "connect", "--alias", "auth-proxy",
                        network, PROXY_CONTAINER], capture_output=True, check=True, timeout=30)


def provision(demo):
    prepare_database(demo)
    compose(demo, "up", "-d", "api", "web")
    healthy(demo, "api", "/api/v1/health", 4000)
    compose(demo, "exec", "-T", "api", "node", "dist/prisma/seed.js")
    compose(demo, "exec", "-T", "api", "node", "dist/prisma/bootstrap-demo.js")
    ready_at = datetime.now(timezone.utc).isoformat()
    compose(demo, "up", "-d", "api", ready_at=ready_at)
    healthy(demo, "api", "/api/v1/health", 4000, ready_at)
    healthy(demo, "web", "/login", 3000, ready_at)
    attach_proxy(demo)
    with connection() as db:
        db.execute("UPDATE demos SET status='ready',ready_at=?,expires=?,lease_until=NULL,applied_origin=instance_origin WHERE id=?",
                   (ready_at, datetime.fromisoformat(ready_at).timestamp()+20*86400, demo["id"]))
    print("Demo ready", demo["id"], flush=True)


def harden_existing(demo):
    # Administrative operation only. Preserve ready_at, expiry and all named volumes.
    if demo["status"] != "ready" or demo["expires"] <= time.time():
        raise ValueError("Expected a ready, unexpired demo")
    compose(demo, "stop", "api", "web", ready_at=demo["ready_at"])
    backup_dir = Path(DATABASE).parent / "backups"
    backup_dir.mkdir(mode=0o700, exist_ok=True)
    backup = backup_dir / (demo["id"]+"-"+str(time.time_ns())+".dump")
    with backup.open('xb') as output:
        os.chmod(backup, 0o600)
        output.write(compose(demo, "exec", "-T", "db", "pg_dump", "-U", "demo", "-d", "demo", "-Fc"))
    prepare_database(demo)
    compose(demo, "up", "-d", "api", "web", ready_at=demo["ready_at"])
    healthy(demo, "api", "/api/v1/health", 4000, demo["ready_at"])
    healthy(demo, "web", "/login", 3000, demo["ready_at"])
    attach_proxy(demo)
    # Detach the proxy from the obsolete, non-isolated legacy network if present.
    detached = subprocess.run(["docker", "network", "disconnect", PROJECT_PREFIX+demo["id"], PROXY_CONTAINER],
                              capture_output=True, timeout=30)
    if detached.returncode == 0:
        # Docker Desktop can retain a stale published-port mapping after detaching
        # the old network. Restart preserves the attached networks and repairs it.
        subprocess.run(["docker", "restart", PROXY_CONTAINER], capture_output=True, check=True, timeout=60)
    print("Existing demo hardened; private database backup retained", demo["id"], flush=True)


def tick():
    with connection() as db:
        changed = db.execute("SELECT * FROM demos WHERE status='ready' AND expires>? AND (applied_origin IS NULL OR applied_origin<>instance_origin)", (time.time(),)).fetchall()
    for demo in changed:
        # Host migration only recreates the API configuration, preserving its data and expiry.
        compose(demo, "up", "-d", "api", "web", ready_at=demo["ready_at"])
        healthy(demo, "api", "/api/v1/health", 4000, demo["ready_at"])
        healthy(demo, "web", "/login", 3000, demo["ready_at"])
        with connection() as db:
            db.execute("UPDATE demos SET applied_origin=instance_origin WHERE id=?", (demo["id"],))
    with connection() as db:
        expired = db.execute("SELECT * FROM demos WHERE status='ready' AND expires<=?", (time.time(),)).fetchall()
    for demo in expired:
        compose(demo, "stop", ready_at=demo["ready_at"])
        with connection() as db:
            db.execute("UPDATE demos SET status='expired' WHERE id=?", (demo["id"],))
    with connection() as db:
        db.execute("BEGIN IMMEDIATE")
        active = db.execute("SELECT COUNT(*) FROM demos WHERE status IN ('ready','provisioning')").fetchone()[0]
        # Reclaim only after the previous worker's lease has elapsed.
        db.execute("UPDATE demos SET status=CASE WHEN attempts>=3 THEN 'failed' ELSE 'pending' END WHERE status='provisioning' AND lease_until<?", (time.time(),))
        if active >= MAX_DEMOS:
            return
        row = db.execute('''UPDATE demos SET status='provisioning',attempts=attempts+1,lease_until=?
            WHERE id=(SELECT id FROM demos WHERE status='pending' AND attempts<3 AND next_attempt<=? LIMIT 1)
            RETURNING *''', (time.time()+1800, time.time())).fetchone()
    if not row:
        return
    try:
        provision(row)
    except Exception:
        # Keep diagnostic output free of database passwords and personal information.
        print("Provisioning failed", row["id"], flush=True)
        try:
            compose(row, "stop")
        except Exception:
            pass
        with connection() as db:
            db.execute("UPDATE demos SET status=?,lease_until=NULL,next_attempt=? WHERE id=?",
                       ("failed" if row["attempts"] >= 3 else "pending", time.time()+30, row["id"]))


if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3 and sys.argv[1] == "--harden-existing":
        if not re.fullmatch("[a-f0-9]{32}", sys.argv[2]):
            raise ValueError("Invalid instance identifier")
        with connection() as db:
            demo = db.execute("SELECT * FROM demos WHERE id=?", (sys.argv[2],)).fetchone()
        if not demo:
            raise ValueError("Unknown demo")
        harden_existing(demo)
        sys.exit(0)
    if len(sys.argv) != 1:
        raise ValueError("Unsupported operation")
    while True:
        try:
            if os.path.isfile(DATABASE):
                tick()
        except (sqlite3.OperationalError, subprocess.SubprocessError):
            print("Waiting for local services", flush=True)
        time.sleep(3)
