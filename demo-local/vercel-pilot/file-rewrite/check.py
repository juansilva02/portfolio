import hashlib
import requests

payload = b'z' * (10 * 1024 * 1024)
response = requests.post('http://127.0.0.1:19302/api/v1/fuel', data=payload,
    headers={'Host': 'norte.demo.zuzudev.pro', 'Origin': 'https://norte.demo.zuzudev.pro',
             'Content-Type': 'application/octet-stream', 'X-Demo-Host': 'sur.demo.zuzudev.pro',
             'X-Demo-Gateway': 'forged'}, timeout=180)
assert response.status_code == 200, response.status_code
assert response.json() == dict(size=len(payload), hash=hashlib.sha256(payload).hexdigest(),
                              tenant='norte.demo.zuzudev.pro', authenticated=True)
assert 'x-middleware-request-x-demo-gateway' not in response.headers
print('PASS full body hash, server-selected tenant and gateway secret')
