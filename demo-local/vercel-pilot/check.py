import json, sqlite3, subprocess, urllib3, sys, secrets, time, base64
from pathlib import Path
root=Path(__file__).resolve().parent
proxy=urllib3.HTTPSConnectionPool("127.0.0.1",19444,server_hostname="demo.zuzudev.pro",assert_hostname="demo.zuzudev.pro",ca_certs=str(root.parents[1]/"demo-production/certs/ca.crt"),cert_reqs="CERT_REQUIRED")
def check(label, cond):
 if not cond: raise RuntimeError(label)
 print("PASS",label,flush=True)
def query(sql):
 code="import sqlite3,json;print(json.dumps(sqlite3.connect('/data/auth.sqlite').execute("+repr(sql)+").fetchall()))"
 return json.loads(subprocess.check_output(['docker','exec','zd-vercel-pilot-broker-1','python','-c',code]))
import os
key=os.environ['DEMO_GATEWAY_SECRET']
def req(label,path,method='GET',data=None,session=None,gateway=key,**options):
 headers={'Host':'api-demos.zuzudev.pro','X-Demo-Host':label+'.demo.zuzudev.pro','X-Demo-Gateway':gateway,'Origin':'https://'+label+'.demo.zuzudev.pro'}
 if session:headers['Cookie']=session
 return proxy.request(method,path,headers=headers,json=data,redirect=False,retries=False,**options)
def expect(r,code):
 if r.status!=code: raise RuntimeError('Expected %s got %s'%(code,r.status))
 return r
rows=query("select subdomain,email,admin_password,id,status from demos order by subdomain")
tokens={}
for label,email,pwd,id,status in rows:
 check(label+" ready",status=='ready')
 r=expect(req(label,'/api/v1/auth/login','POST',{'email':email,'password':pwd}),200)
 tokens[label]=r.headers['set-cookie'].split(';')[0]
 check(label+" host-only secure cookie",all(s in r.headers['set-cookie'] for s in ['Secure','HttpOnly','SameSite=Lax']) and 'Domain=' not in r.headers['set-cookie'])
check("wrong gateway rejected",req('norte','/api/v1/health',gateway='wrong').status==403)
check("unknown host rejected",req('unknown','/api/v1/health').status==403)
check("cross-tenant session rejected",req('sur','/api/v1/customers',session=tokens['norte']).status==401)
def get(path):return expect(req('norte',path,session=tokens['norte']),200).json()['data']
customer=get('/api/v1/sales/options/customers')[0]
product=get('/api/v1/sales/options/products')[0]
r=req('norte','/api/v1/sales','POST',dict(customerId=customer['id'],paymentMethod='CASH',shippingAddress='Ensayo',items=[dict(productId=product['id'],quantity=1)]),tokens['norte'])
if r.status==409: r=req('norte','/api/v1/sales','POST',dict(customerId=customer['id'],paymentMethod='CASH',shippingAddress='Ensayo',items=[dict(productId=product['id'],quantity=1)],stockConfirmation=r.json()['confirmation']),tokens['norte'])
sale=expect(r,201).json()['data']['id']
check("other tenant cannot read sale",req('sur','/api/v1/sales/'+sale,session=tokens['sur']).status==404)
from struct import pack
import zlib
def chunk(n,d):return pack('>I',len(d))+n+d+pack('>I',zlib.crc32(n+d))
png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',pack('>IIBBBBB',2,2,8,2,0,0,0))+chunk(b'IDAT',zlib.compress((b'\0'+b'\xff\0\0'*2)*2))+chunk(b'IEND',b'')
r=expect(req('norte','/api/v1/auth/avatar','POST',session=tokens['norte'],fields={'file':('avatar.png',png,'image/png')}),201)
asset=r.json()['data']['avatarUrl']
check("owner can read upload",req('norte',asset,session=tokens['norte']).status==200)
check("other tenant cannot read upload",req('sur',asset,session=tokens['sur']).status==404)
check("anonymous upload rejected",req('norte',asset).status==401)
project='zd-pilot-'+rows[0][3]
subprocess.run(['docker','restart',project+'-db-1',project+'-api-1'],check=True,stdout=subprocess.DEVNULL)
for i in range(40):
 if req('norte','/api/v1/health').status==200:break
 time.sleep(1)
check("sale survives restart",get('/api/v1/sales/'+sale)['id']==sale)
check("upload survives restart",req('norte',asset,session=tokens['norte']).status==200)



# Simulate expiry only in the private Norte fixture. Restore the original deadline
# once its original services have become healthy again.
def update_fixture(statement, params):
    script = """import json,sqlite3,sys
statement,params=json.load(sys.stdin)
with sqlite3.connect('/data/auth.sqlite',timeout=30) as db:
    if db.execute(statement,params).rowcount != 1:
        raise ValueError('Expected one private Norte fixture')
"""
    subprocess.run(["docker","exec","-i","zd-vercel-pilot-broker-1","python","-c",script],
                   input=json.dumps([statement,params]),text=True,check=True)

fixture = query("SELECT id, expires FROM demos WHERE subject='pilot-norte' AND subdomain='norte' AND status='ready'")
check("isolated Norte fixture", len(fixture)==1 and fixture[0][0]==rows[0][3])
identity, original_deadline = fixture[0]
update_fixture("UPDATE demos SET expires=? WHERE id=? AND subject='pilot-norte' AND status='ready'",
               [time.time()-1, identity])
try:
    check("expired active session denied", req("norte","/api/v1/customers",session=tokens["norte"]).status==403)
    check("expired upload denied", req("norte",asset,session=tokens["norte"]).status==403)
    check("expired login denied", req("norte","/api/v1/auth/login","POST",
                                      {"email":rows[0][1],"password":rows[0][2]}).status==403)
    for _ in range(60):
        if query("SELECT status FROM demos WHERE subject='pilot-norte'")==[["expired"]]:
            break
        time.sleep(1)
    check("worker recorded expiry",query("SELECT status FROM demos WHERE subject='pilot-norte'")==[["expired"]])
    for service in ["api","db"]:
        running=subprocess.check_output(["docker","inspect","--format","{{.State.Running}}",project+"-"+service+"-1"],text=True)
        check("expired "+service+" stopped",running.strip()=="false")
    check("Sur session remains valid",req("sur","/api/v1/customers",session=tokens["sur"]).status==200)
finally:
    subprocess.run(["docker","start",project+"-db-1",project+"-api-1"],check=True,stdout=subprocess.DEVNULL)
    for _ in range(45):
        health=subprocess.run(["docker","exec",project+"-api-1","node","-e",
                               "fetch('http://localhost:4000/api/v1/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"],
                              capture_output=True)
        if health.returncode==0:
            break
        time.sleep(1)
    else:
        raise RuntimeError("Norte API failed to recover; fixture remains inaccessible")
    update_fixture("UPDATE demos SET status='ready',expires=? WHERE id=? AND subject='pilot-norte'",
                   [original_deadline, identity])
check("sale retained after expiry",get("/api/v1/sales/"+sale)["id"]==sale)
check("upload retained after expiry",req("norte",asset,session=tokens["norte"]).status==200)
