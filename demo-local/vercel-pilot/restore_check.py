"""Rehearse recovery in the private pilot with disposable destination volumes."""
import hashlib
import hmac
import json
import tarfile
import io
import os
import re
import sqlite3
import subprocess
import tempfile
import time
from pathlib import Path
from encrypted_backup import roundtrip


def docker(*args, **options):
    return subprocess.run(["docker", *args], check=True, stdout=subprocess.PIPE, **options).stdout


def files(volume):
    return docker("run", "--rm", "--network", "none", "-v", volume+":/source:ro", "alpine:3.22",
                  "tar", "-C", "/source", "-cf", "-", ".")


def manifest(archive):
    with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
        return {entry.name: (entry.type, entry.mode, hashlib.sha256(tar.extractfile(entry).read()).hexdigest()
                             if entry.isfile() else entry.linkname) for entry in tar}


def main():
    broker = "zd-vercel-pilot-broker-1"
    # SQLite's backup API takes a consistent snapshot including committed WAL data.
    script = """import sqlite3,tempfile,sys
with tempfile.TemporaryDirectory() as folder:
    target=sqlite3.connect(folder+'/control.sqlite')
    source=sqlite3.connect('file:/data/auth.sqlite?mode=ro',uri=True)
    source.backup(target)
    target.close()
    source.close()
    sys.stdout.buffer.write(open(folder+'/control.sqlite','rb').read())"""
    with tempfile.TemporaryDirectory() as folder:
        snapshot = Path(folder)/"control.sqlite"
        snapshot.write_bytes(docker("exec", broker, "python", "-c", script))
        registry_backup = snapshot.read_bytes()
        with sqlite3.connect(snapshot) as db:
            assert db.execute("pragma integrity_check").fetchone()[0] == "ok"
            db.row_factory = sqlite3.Row
            restored_owner = dict(db.execute("select * from demos where subdomain='norte' and subject='pilot-norte'").fetchone())
            identity = db.execute("select id from demos where subdomain='norte' and subject='pilot-norte'").fetchone()[0]
        db.close()
    assert re.fullmatch("[0-9a-f]{32}", identity)
    project = "zd-pilot-"+identity
    name = "zd-restore-"+os.urandom(6).hex()
    def sql(container, statement):
        return docker("exec", container, "psql", "-U", "demo", "-d", "demo", "-Atc", statement).strip()
    db_container=project+"-db-1"
    api=project+"-api-1"
    receipt_fixture = """const {randomUUID,createHash}=require('node:crypto');
async function fixture(){
 const base='http://localhost:4000/api/v1';
 for(let i=0;i<60;i++){
  try {if((await fetch(base+'/health')).ok)break;}catch{}
  await new Promise(resolve=>setTimeout(resolve,1000));
 }
 const login=await fetch(base+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD})});
 if(login.status!==200)throw Error('Login status '+login.status);
 const cookie=login.headers.get('set-cookie').split(';')[0];
 const image=await require('sharp')({create:{width:4,height:4,channels:3,background:'#417da3'}}).png().toBuffer();
 const form=new FormData();
 form.set('file',new Blob([Buffer.concat([image,Buffer.from(randomUUID())])],{type:'image/png'}),'recovery.png');
 form.set('requestId',randomUUID());form.set('amount','100');
 form.set('date',new Date().toISOString().slice(0,10));form.set('station','Restoration fixture');
 const created=await fetch(base+'/fuel',{method:'POST',headers:{cookie},body:form});
 if(created.status!==201)throw Error('Receipt status '+created.status);
 const id=(await created.json()).data.id;
 const attachment=await fetch(base+'/fuel/'+id+'/attachment',{headers:{cookie}});
 if(attachment.status!==200)throw Error();
 const hash=createHash('sha256').update(Buffer.from(await attachment.arrayBuffer())).digest('hex');
 console.log(JSON.stringify({id,hash}));
}
fixture().catch(error=>{console.error(error.message);process.exit(1)});"""
    receipt=json.loads(docker("exec",api,"node","-e",receipt_fixture))
    docker("stop", api)
    try:
        dump = docker("exec", db_container, "pg_dump", "-U", "demo", "-Fc", "demo")
        volumes = {kind:files(project+"_"+kind) for kind in ("uploads","receipts")}
        query='select (select count(*) from "Sale"),(select count(*) from "ExternalIdentity"),(select count(*) from _prisma_migrations)'
        expected=sql(db_container,query)
    finally:
        docker("start",api)
    recovered = roundtrip({
        "registry.sqlite": registry_backup,
        "database.dump": dump,
        "uploads.tar": volumes["uploads"],
        "receipts.tar": volumes["receipts"],
    })
    dump = recovered["database.dump"]
    volumes = {kind: recovered[kind + ".tar"] for kind in ("uploads", "receipts")}
    db_volume = name+"-database"
    docker("volume","create",db_volume)
    # Isolated process, one-use password, no external interfaces.
    env=dict(os.environ,POSTGRES_PASSWORD=os.urandom(32).hex())
    network = name+"-data"
    docker("network","create","--internal",network)
    docker("run","-d","--name",name,"--network",network,"--network-alias","db","-e","POSTGRES_PASSWORD","-e","POSTGRES_USER=demo",
           "-v",db_volume+":/var/lib/postgresql/data","postgres:17.11-alpine",env=env)
    for _ in range(60):
        if subprocess.run(["docker","exec",name,"pg_isready","-h","127.0.0.1","-U","demo"],capture_output=True).returncode==0:
            break
        time.sleep(1)
    sql(name,'CREATE ROLE zuzudev_erp_api NOLOGIN; CREATE ROLE demo_app; GRANT zuzudev_erp_api TO demo_app')
    docker("exec","-i",name,"pg_restore","--exit-on-error","-U","demo","-d","demo",input=dump)
    assert sql(name,query)==expected
    for kind, archive in volumes.items():
        destination=name+"-"+kind
        docker("volume","create",destination)
        docker("run","--rm","-i","--network","none","-v",destination+":/target","alpine:3.22",
               "tar","-C","/target","-xf","-",input=archive)
        assert manifest(files(destination)) == manifest(archive)
    runtime_password = hmac.new(restored_owner["db_password"].encode(),
                                b"zuzudev-runtime-db-v1",hashlib.sha256).hexdigest()
    statement = "ALTER ROLE demo_app WITH LOGIN PASSWORD '"+runtime_password+"';"
    docker("exec","-i",name,"psql","-U","demo","-d","demo","-v","ON_ERROR_STOP=1",input=statement.encode())
    inspection=json.loads(docker("inspect",api))[0]
    settings=dict(item.split("=",1) for item in inspection["Config"]["Env"])
    settings.update(DATABASE_URL="postgresql://demo_app:"+runtime_password+"@db:5432/demo",
                    JWT_SECRET=restored_owner["jwt_secret"],DEMO_READY_AT=restored_owner["ready_at"])
    destination_api=name+"-api"
    command=["run","-d","--name",destination_api,"--network",network,
             "--cap-drop","ALL","--security-opt","no-new-privileges:true"]
    environment=dict(os.environ,**settings)
    for key in settings:
        command.extend(["-e",key])
    for kind,directory in [("uploads","uploads"),("receipts","private-receipts")]:
        command.extend(["-v",name+"-"+kind+":/app/apps/api/"+directory])
    command.extend(["-v","zd-demo-production-ca:/certs:ro",inspection["Image"],"node","dist/src/main.js"])
    docker(*command,env=environment)
    try:
        script = "const receipt="+json.dumps(receipt)+";"+"""const assert=require('node:assert/strict');
const origin='http://localhost:4000/api/v1';
async function test(){
 for(let i=0;i<60;i++){
  try { const r=await fetch(origin+'/health'); if(r.ok)break; }catch{}
  await new Promise(r=>setTimeout(r,1000));
 }
 const login=await fetch(origin+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD})});
 assert.equal(login.status,200);
 const cookie=login.headers.get('set-cookie').split(';')[0];
 const me=await fetch(origin+'/auth/me',{headers:{cookie}});
 assert.equal(me.status,200);
 const user=(await me.json()).data;
 assert.ok(user.avatarUrl);
 assert.equal((await fetch('http://localhost:4000'+user.avatarUrl,{headers:{cookie}})).status,200);
 const sales=await fetch(origin+'/sales',{headers:{cookie}});
 assert.equal(sales.status,200);
 assert.ok((await sales.json()).data.length>0);
 assert.equal((await fetch('http://localhost:4000'+user.avatarUrl)).status,401);
 const attachmentPath=origin+'/fuel/'+receipt.id+'/attachment';
 const attachment=await fetch(attachmentPath,{headers:{cookie}});
 assert.equal(attachment.status,200);
 const hash=require('node:crypto').createHash('sha256').update(Buffer.from(await attachment.arrayBuffer())).digest('hex');
 assert.equal(hash,receipt.hash);
 assert.equal((await fetch(attachmentPath)).status,401);
 console.log('PASS restored API login, identity, sales, avatar, receipt and anonymous denial');
}
test().catch(()=>process.exit(1));"""
        docker("exec",destination_api,"node","-e",script)
        print("PASS restored API login, sales, avatar, private receipt hash and anonymous denial.")
    finally:
        docker("stop",destination_api,name)
    print("PASS SQLite integrity and synthetic identity, PostgreSQL sales/links/migrations, uploads and receipts.")
    print("Offline restored project:",name)


if __name__=="__main__":
    main()

