"""Disposable integration test. Creates two synthetic companies through the private job queue.

No public OAuth bypass is installed. Run only against the zd-demo-local project.
"""
import json
from pathlib import Path
import secrets
import struct
import subprocess
import time
import zlib

import requests

BROKER = "zd-demo-local-broker-1"
CERT = str(Path(__file__).with_name("certs") / "local.crt")


def query(sql, parameters=()):
    script = '''import json,sqlite3,sys
sql,parameters=json.load(sys.stdin)
db=sqlite3.connect('/data/auth.sqlite',timeout=30)
db.row_factory=sqlite3.Row
with db:
    rows=db.execute(sql,parameters).fetchall()
    print(json.dumps([dict(row) for row in rows]))
db.close()
'''
    result = subprocess.run(["docker", "exec", "-i", BROKER, "python", "-c", script],
                            input=json.dumps([sql, parameters]), text=True, capture_output=True, check=True)
    return json.loads(result.stdout)


def add_company():
    demo_id = secrets.token_hex(16)
    email = "test-"+demo_id+"@example.invalid"
    password = secrets.token_urlsafe(40)
    lead = dict(name="Local isolation test", businessName="Disposable company", industry="Test",
                phone="+54 11 1234 5678", marketingConsent=False)
    label = 'test-'+demo_id[:12]
    origin = 'https://'+label+'.demo.localhost:8443'
    query('''INSERT INTO demos (id,subject,email,lead,slug,instance_origin,instance_secret,
             db_password,jwt_secret,admin_password,subdomain) VALUES (?,?,?,?,?,?,?,?,?,?,?)''',
          [demo_id, "local-isolation-"+demo_id, email, json.dumps(lead), "test",
           origin, secrets.token_urlsafe(40),
           secrets.token_hex(32), secrets.token_urlsafe(40), password,label])
    return dict(id=demo_id, email=email, password=password,host=label+'.demo.localhost:8443')


def wait_ready(demo):
    deadline = time.time()+600
    while time.time() < deadline:
        status = query("SELECT status FROM demos WHERE id=?", [demo["id"]])[0]["status"]
        if status == "ready":
            return
        if status == "failed":
            raise RuntimeError("Synthetic demo failed to provision: "+demo["id"])
        time.sleep(3)
    raise RuntimeError("Timed out waiting for synthetic demo")


def api(demo, method, path, token=None, body=None):
    headers = {"Host": demo["host"]}
    if token:
        headers["Cookie"] = "zuzudev_demo_session="+token
    return requests.request(method, "https://127.0.0.1:8443/api/v1"+path, headers=headers,
                            json=body, verify=CERT, timeout=(3, 10))


def login(demo):
    response = api(demo, "POST", "/auth/login", body={"email": demo["email"], "password": demo["password"]})
    assert response.status_code == 200, "Password authentication failed"
    return response.cookies["zuzudev_demo_session"]


def upload_avatar(demo, token):
    def chunk(name, data):
        return struct.pack(">I", len(data))+name+data+struct.pack(">I", zlib.crc32(name+data))
    image = (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", 2, 2, 8, 2, 0, 0, 0))
             + chunk(b"IDAT", zlib.compress(b"\0"+b"\xff\0\0"*2+b"\0"+b"\xff\0\0"*2)) + chunk(b"IEND", b""))
    response = requests.post("https://127.0.0.1:8443/api/v1/auth/avatar",
                             headers={"Host": demo["host"],
                                      "Cookie": "zuzudev_demo_session="+token},
                             files={"file": ("test.png", image, "image/png")}, verify=CERT, timeout=10)
    assert response.status_code == 201, "Avatar upload failed"
    return response.json()["data"]["avatarUrl"]


def asset(demo, path, token=None):
    headers = {"Host": demo["host"]}
    if token:
        headers["Cookie"] = "zuzudev_demo_session="+token
    return requests.get("https://127.0.0.1:8443"+path, headers=headers, verify=CERT, timeout=10)


def destroy(demo):
    project = "zd-demo-"+demo["id"]
    result = subprocess.run(["docker", "ps", "-aq", "--filter", "label=com.docker.compose.project="+project],
                            capture_output=True, text=True, check=True)
    containers = result.stdout.split()
    if containers:
        subprocess.run(["docker", "rm", "-f", *containers], capture_output=True, check=True)
    subprocess.run(["docker", "network", "disconnect", project, "zd-demo-local-proxy"], capture_output=True)
    subprocess.run(["docker", "network", "rm", project], capture_output=True)
    for suffix in ("database", "uploads", "receipts"):
        subprocess.run(["docker", "volume", "rm", project+"_"+suffix], capture_output=True, check=True)
    query("DELETE FROM demos WHERE id=? AND subject=?", [demo["id"], "local-isolation-"+demo["id"]])


def main():
    a, b = add_company(), add_company()
    print("Waiting for two disposable isolated companies", flush=True)
    wait_ready(a)
    wait_ready(b)
    token_a, token_b = login(a), login(b)
    subprocess.run(["docker", "exec", "zd-demo-"+a["id"]+"-api-1", "node", "-e",
                    "process.exit(require('fs').existsSync('/certs/local.key')?1:0)"], check=True)
    response = api(a, "POST", "/customers", token_a,
                   {"name": "Only company A", "email": "customer-a@example.invalid"})
    assert response.status_code == 201, "Customer creation failed"
    customer_id = response.json()["data"]["id"]
    assert api(b, "GET", "/customers?search=Only%20company%20A", token_b).json()["data"] == []
    assert api(b, "GET", "/customers", token_a).status_code == 401, "Cross-company session accepted"
    assert api(b, "PATCH", "/customers/"+customer_id, token_b, {"name": "Cross-company change"}).status_code == 404, "Cross-company customer modified"
    assert api(b, "POST", "/auth/login", body={"email": a["email"], "password": a["password"]}).status_code == 401
    print("API data, identifiers and sessions isolated", flush=True)
    uploaded = upload_avatar(a, token_a)
    assert asset(a, uploaded).status_code == 401, "Anonymous upload access accepted"
    assert asset(a, uploaded, token_a).status_code == 200, "Owner upload access failed"
    assert asset(b, uploaded, token_b).status_code == 404, "Other company exposed uploaded file"
    assert asset(b, uploaded, token_a).status_code == 401, "Cross-company file session accepted"
    print("Uploaded files isolated and authenticated", flush=True)
    script = "fetch('http://demo-"+b["id"]+"-api:4000/api/v1/health',{signal:AbortSignal.timeout(3000)}).then(()=>process.exit(1)).catch(()=>process.exit(0))"
    subprocess.run(["docker", "exec", "zd-demo-"+a["id"]+"-api-1", "node", "-e", script], check=True)
    target = subprocess.run(["docker", "inspect", "--format", "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}",
                             "zd-demo-"+b["id"]+"-api-1"], capture_output=True, text=True, check=True).stdout.strip()
    direct = "fetch('http://"+target+":4000/api/v1/health',{signal:AbortSignal.timeout(3000)}).then(()=>process.exit(1)).catch(()=>process.exit(0))"
    subprocess.run(["docker", "exec", "zd-demo-"+a["id"]+"-api-1", "node", "-e", direct], check=True)
    subprocess.run(["docker", "restart", "zd-demo-"+a["id"]+"-db-1", "zd-demo-"+a["id"]+"-api-1"],
                   capture_output=True, check=True)
    for _ in range(60):
        response = api(a, "GET", "/customers?search=Only%20company%20A", token_a)
        if response.status_code == 200 and any(row["id"] == customer_id for row in response.json()["data"]):
            break
        time.sleep(2)
    assert response.status_code == 200 and any(row["id"] == customer_id for row in response.json()["data"]), "Customer did not survive restart"
    print("Private network and persistence after restart verified", flush=True)
    destroy(a)
    destroy(b)
    print("PASS: disposable test resources removed", flush=True)


if __name__ == "__main__":
    main()
