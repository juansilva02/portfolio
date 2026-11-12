"""Exercise the real TLS gateway without changing public DNS or disabling trust."""
import argparse
import http.client
from pathlib import Path
import socket
import ssl

parser = argparse.ArgumentParser()
parser.add_argument('--local', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent
port = 8443 if args.local else 9444
portal = 'localhost' if args.local else 'demo.zuzudev.pro'
suffix = 'demo.localhost' if args.local else 'demo.zuzudev.pro'
ca = root.parent / 'demo-local/certs/local.crt' if args.local else root / 'certs/ca.crt'
context = ssl.create_default_context(cafile=str(ca))

def request(host, path='/', sni=None):
    raw = socket.create_connection(('127.0.0.1', port), timeout=10)
    with context.wrap_socket(raw, server_hostname=sni or host) as tls:
        assert tls.version() in ('TLSv1.2', 'TLSv1.3')
        tls.sendall(('GET '+path+' HTTP/1.1\r\nHost: '+host+'\r\nConnection: close\r\n\r\n').encode())
        response = http.client.HTTPResponse(tls)
        response.begin()
        response.read()
        return response.status, response.headers

status, headers = request(portal, '/demo')
assert status == 200, status
for name, value in [('Referrer-Policy', 'no-referrer'), ('X-Content-Type-Options', 'nosniff'),
                    ('X-Frame-Options', 'DENY')]:
    assert headers[name] == value, (name, headers[name])
assert headers['Server'] == 'nginx', headers['Server']
if not args.local:
    assert headers['Strict-Transport-Security'] == 'max-age=86400'
assert request(portal, '/api/demo/config')[0] == 200
assert request('unregistered-isolation-check.'+suffix, '/login')[0] == 403
assert request('unregistered-isolation-check.'+suffix, '/_demo_resolve')[0] == 404
try:
    request('foreign.example', sni=portal)
except http.client.RemoteDisconnected:
    pass
else:
    raise AssertionError('Unregistered Host was accepted')
try:
    request('foreign.example')
except ssl.SSLError:
    pass
else:
    raise AssertionError('Unregistered TLS name was accepted')
print('PASS: verified TLS, portal, headers, unknown tenant, internal endpoint, Host and SNI rejection')
