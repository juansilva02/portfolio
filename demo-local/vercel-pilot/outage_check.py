"""Exercise controlled 503 responses on the isolated demo gateway."""
import json
import os
import subprocess
import time
from pathlib import Path
import urllib3

broker='zd-vercel-pilot-broker-1'
code="import sqlite3,json;print(json.dumps(sqlite3.connect('/data/auth.sqlite').execute(\"SELECT id FROM demos WHERE subject='pilot-norte' AND status='ready'\").fetchall()))"
rows=json.loads(subprocess.check_output(['docker','exec',broker,'python','-c',code]))
assert len(rows)==1 and len(rows[0][0])==32
api='zd-pilot-'+rows[0][0]+'-api-1'
ca=Path(__file__).resolve().parents[2]/'demo-production/certs/ca.crt'
origin=urllib3.HTTPSConnectionPool('127.0.0.1',19444,server_hostname='demo.zuzudev.pro',
    assert_hostname='demo.zuzudev.pro',ca_certs=str(ca),cert_reqs='CERT_REQUIRED')
def request(label,path='/api/v1/fuel'):
    return origin.request('GET',path,headers={'Host':'api-demos.zuzudev.pro',
        'X-Demo-Host':label+'.demo.zuzudev.pro','X-Demo-Gateway':os.environ['DEMO_GATEWAY_SECRET']},retries=False)
def unavailable(response):
    assert response.status==503,response.status
    assert response.headers['Content-Type'].startswith('application/json')
    assert 'no-store' in response.headers['Cache-Control']
    assert json.loads(response.data)=={'message':'La empresa no está disponible en este momento. Intentá nuevamente.'}
for _ in range(40):
    if request('norte','/api/v1/health').status==200:break
    time.sleep(1)
else:raise RuntimeError('Norte is not healthy')
try:
    subprocess.run(['docker','stop',api],check=True,stdout=subprocess.DEVNULL)
    unavailable(request('norte'))
    assert request('sur','/api/v1/health').status==200
    assert request('unknown').status==403
    print('PASS API outage returns private JSON 503; Sur remains healthy; unknown host denied')
finally:
    subprocess.run(['docker','start',api],check=True,stdout=subprocess.DEVNULL)
try:
    subprocess.run(['docker','stop',broker],check=True,stdout=subprocess.DEVNULL)
    unavailable(request('sur'))
    print('PASS registry outage returns private JSON 503')
finally:
    subprocess.run(['docker','start',broker],check=True,stdout=subprocess.DEVNULL)
