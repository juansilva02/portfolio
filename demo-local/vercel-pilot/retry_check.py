"""Run inside a one-shot pilot worker. The control DB contains only this fixture."""
import json
import os
import secrets
import sqlite3
import subprocess
import sys
import time

sys.path.insert(0, "/worker")
import worker

assert worker.PROJECT_PREFIX == "zd-retry-" and worker.DATABASE == "/tmp/retry.sqlite"
with sqlite3.connect("file:/registry/auth.sqlite?mode=ro", uri=True) as source:
    schema = source.execute("SELECT sql FROM sqlite_master WHERE name='demos'").fetchone()[0]
ident = secrets.token_hex(16)
with worker.connection() as db:
    db.execute(schema)
    db.execute("""INSERT INTO demos(id,subject,email,lead,slug,instance_origin,instance_secret,
               db_password,jwt_secret,admin_password,subdomain,frontend_mode)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
               (ident, "retry-"+ident, "retry@example.invalid", json.dumps({"name":"Retry","businessName":"Retry"}),
                "retry","https://retry.demo.zuzudev.pro",secrets.token_hex(32),secrets.token_hex(32),
                secrets.token_hex(32),secrets.token_hex(32),"retry","vercel"))
worker.ensure_version_column()


def record():
    with worker.connection() as db:
        return db.execute("SELECT * FROM demos").fetchone()


def sql(statement):
    return worker.compose(record(), "exec", "-T", "db", "psql", "-XAt", "-v", "ON_ERROR_STOP=1",
                          "-U", "demo", "-d", "demo", "-c", statement).decode().strip()


row = record()
try:
    worker.compose(row, "up", "-d", "--wait", "db")
    # Keep the Prisma-managed public schema empty for the initial migration.
    sql("CREATE SCHEMA retry_fixture; CREATE TABLE retry_fixture.marker AS SELECT 42 AS value")
    # Prisma's PostgreSQL advisory lock prevents a competing migration from running.
    container = worker.PROJECT_PREFIX+ident+"-db-1"
    subprocess.run(["docker","exec","-d",container,"psql","-U","demo","-d","demo","-c",
                    "SELECT pg_advisory_lock(72707369); SELECT pg_sleep(120)"],check=True)
    for _ in range(30):
        if sql("SELECT count(*) FROM pg_locks WHERE locktype='advisory' AND objid=72707369") == "1":
            break
        time.sleep(1)
    else:
        raise RuntimeError("Migration lock not acquired")
    worker.tick()
    failed = record()
    assert failed["status"] == "pending" and failed["attempts"] == 1 and failed["expires"] is None
    print("PASS failed migration requeued; expiry has not started",flush=True)
    time.sleep(max(0, failed["next_attempt"]-time.time())+0.1)
    worker.tick()
    ready = record()
    assert ready["status"] == "ready" and ready["attempts"] == 2 and ready["api_image_id"]
    containers = subprocess.check_output(
        ["docker", "ps", "-a", "--filter",
         "label=com.docker.compose.project=" + worker.PROJECT_PREFIX + ident,
         "--format", "{{.Label \"com.docker.compose.service\"}}"], text=True).splitlines()
    assert sorted(containers) == ["api", "db"], containers
    for key in ["id","subject","instance_secret","db_password","jwt_secret","admin_password","instance_origin"]:
        assert ready[key] == row[key]
    assert sql("SELECT value FROM retry_fixture.marker") == "42"
    assert int(sql("SELECT count(*) FROM _prisma_migrations WHERE finished_at IS NOT NULL")) > 0
    worker.healthy(ready,"api","/api/v1/health",4000,ready["ready_at"])
    functional = """const assert=require('node:assert/strict');
async function check(){
 const base='http://localhost:4000/api/v1';
 const login=await fetch(base+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD})});
 assert.equal(login.status,200);
 const cookie=login.headers.get('set-cookie').split(';')[0];
 for(const path of ['/fuel','/operating-expenses','/logistics','/sales']){
  assert.equal((await fetch(base+path,{headers:{cookie}})).status,200);
 }
 const image=await require('sharp')({create:{width:4,height:4,channels:3,background:'#427da3'}}).png().toBuffer();
 const form=new FormData();
 form.set('file',new Blob([image],{type:'image/png'}),'pilot.png');
 form.set('requestId',require('node:crypto').randomUUID());
 form.set('station','Fresh tenant');form.set('amount','100');form.set('date',new Date().toISOString().slice(0,10));
 const created=await fetch(base+'/fuel',{method:'POST',headers:{cookie},body:form});
 assert.equal(created.status,201);
 const id=(await created.json()).data.id;
 const path=base+'/fuel/'+id+'/attachment';
 assert.equal((await fetch(path,{headers:{cookie}})).status,200);
 assert.equal((await fetch(path)).status,401);
}
check().catch(()=>process.exit(1));"""
    worker.compose(ready,"exec","-T","api","node","-e",functional,ready_at=ready["ready_at"])
    assert sql("SELECT rolbypassrls OR rolsuper OR rolcreatedb OR rolcreaterole FROM pg_roles WHERE rolname='demo_app'") == "f"
    assert sql("SELECT count(*) FROM pg_policies WHERE policyname='demo_backend'") == "13"
    print("PASS fresh tenant login, fuel creation, private attachment and restricted role",flush=True)
    print("PASS same tenant, credentials and database marker; API healthy on second attempt",flush=True)
finally:
    worker.compose(record(),"stop")
