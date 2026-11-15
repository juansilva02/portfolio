"""Upload a maximum-sized private PDF through local Next, Nginx and the pilot API."""
import hashlib
import json
import os
import subprocess
import uuid
from datetime import date
from pathlib import Path

import pymupdf
import requests
import urllib3

key = os.environ['DEMO_GATEWAY_SECRET']
script = "import sqlite3,json;print(json.dumps(sqlite3.connect('/data/auth.sqlite').execute(\"select subdomain,email,admin_password from demos where subject in ('pilot-norte','pilot-sur')\").fetchall()))"
rows = json.loads(subprocess.check_output(['docker','exec','zd-vercel-pilot-broker-1','python','-c',script]))
origin = urllib3.HTTPSConnectionPool('127.0.0.1',19444,server_hostname='demo.zuzudev.pro',
    assert_hostname='demo.zuzudev.pro',ca_certs=str(Path(__file__).resolve().parents[3]/'demo-production/certs/ca.crt'),
    cert_reqs='CERT_REQUIRED')
tokens = {}
for label,email,password in rows:
    response = origin.request('POST','/api/v1/auth/login',json={'email':email,'password':password},
        headers={'Host':'api-demos.zuzudev.pro','X-Demo-Host':label+'.demo.zuzudev.pro',
                 'X-Demo-Gateway':key,'Origin':'https://'+label+'.demo.zuzudev.pro'})
    assert response.status == 200, response.status
    tokens[label] = response.headers['set-cookie'].split(';')[0]
with pymupdf.open() as document:
    page = document.new_page()
    page.insert_text((72,72),'Synthetic private receipt '+str(uuid.uuid4()))
    pdf = document.tobytes()
payload = pdf + b' ' * (10*1024*1024-len(pdf))
base='http://127.0.0.1:19302'
def headers(label, cookie=True):
    host=label+'.demo.zuzudev.pro'
    return {'Host':host,'Origin':'https://'+host, **({'Cookie':tokens[label]} if cookie else {}),
            'X-Demo-Host':'fake.demo.zuzudev.pro','X-Demo-Gateway':'forged'}
response = requests.post(base+'/api/v1/fuel',headers=headers('norte'),
    data={'requestId':str(uuid.uuid4()),'amount':'100','date':date.today().isoformat(),'station':'Large file pilot'},
    files={'file':('private.pdf',payload,'application/pdf')},timeout=180)
assert response.status_code == 201, (response.status_code,response.text[:100])
path='/api/v1/fuel/'+response.json()['data']['id']+'/attachment'
restored = requests.get(base+path,headers=headers('norte'),timeout=60)
assert restored.status_code == 200
assert len(restored.content) == len(payload)
assert hashlib.sha256(restored.content).digest() == hashlib.sha256(payload).digest()
assert 'no-store' in restored.headers['Cache-Control']
assert requests.get(base+path,headers=headers('norte',False),timeout=60).status_code == 401
assert requests.get(base+path,headers=headers('sur'),timeout=60).status_code == 404
cross=headers('sur');cross['Cookie']=tokens['norte']
assert requests.get(base+path,headers=cross,timeout=60).status_code == 401
oversized = requests.post(base+'/api/v1/fuel',headers=headers('norte'),
    data={'requestId':str(uuid.uuid4()),'amount':'100','date':date.today().isoformat(),'station':'Rejected size'},
    files={'file':('oversized.pdf',payload+b' ', 'application/pdf')},timeout=60)
assert oversized.status_code == 413, oversized.status_code
bad_origin=headers('norte');bad_origin['Origin']='https://sur.demo.zuzudev.pro'
assert requests.post(base+'/api/v1/fuel',headers=bad_origin,timeout=60).status_code == 403
print('PASS oversized file and cross-origin mutation rejected')
print('PASS 10 MiB multipart and private download, exact hash, anonymous and cross-tenant denial')

