"""Prepare an independent, unpublished production origin on this Docker host."""
import argparse
from datetime import datetime, timedelta, timezone
from pathlib import Path
import subprocess

from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.x509.oid import ExtendedKeyUsageOID, NameOID

parser = argparse.ArgumentParser()
parser.add_argument('--erp-root', required=True, type=Path)
parser.add_argument('--google-client', required=True, type=Path)
args = parser.parse_args()
if not (args.erp_root / 'deploy/auth-broker/app.py').is_file() or not args.google_client.is_file():
    parser.error('ERP checkout and original Google credentials file must exist')
root = Path(__file__).resolve().parent
certs = root / 'certs'
certs.mkdir(exist_ok=True)
if not any(certs.iterdir()):
    now = datetime.now(timezone.utc)
    ca_key = rsa.generate_private_key(public_exponent=65537, key_size=3072)
    ca_name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, 'zuzudev Docker origin CA')])
    ca = (x509.CertificateBuilder().subject_name(ca_name).issuer_name(ca_name)
          .public_key(ca_key.public_key()).serial_number(x509.random_serial_number())
          .not_valid_before(now-timedelta(minutes=5)).not_valid_after(now+timedelta(days=91))
          .add_extension(x509.BasicConstraints(ca=True, path_length=0), critical=True)
          .add_extension(x509.KeyUsage(False, False, False, False, False, True, True, False, False), critical=True)
          .sign(ca_key, hashes.SHA256()))
    key = rsa.generate_private_key(public_exponent=65537, key_size=3072)
    name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, 'demo.zuzudev.pro')])
    leaf = (x509.CertificateBuilder().subject_name(name).issuer_name(ca_name)
            .public_key(key.public_key()).serial_number(x509.random_serial_number())
            .not_valid_before(now-timedelta(minutes=5)).not_valid_after(now+timedelta(days=90))
            .add_extension(x509.BasicConstraints(ca=False, path_length=None), critical=True)
            .add_extension(x509.ExtendedKeyUsage([ExtendedKeyUsageOID.SERVER_AUTH]), critical=False)
            .add_extension(x509.SubjectAlternativeName([x509.DNSName('demo.zuzudev.pro'),
                x509.DNSName('*.demo.zuzudev.pro'), x509.DNSName('auth-proxy')]), critical=False)
            .sign(ca_key, hashes.SHA256()))
    # The signing key is discarded. Only Nginx receives the leaf's private key.
    (certs / 'ca.crt').write_bytes(ca.public_bytes(serialization.Encoding.PEM))
    (certs / 'local.crt').write_bytes(leaf.public_bytes(serialization.Encoding.PEM))
    (certs / 'local.key').write_bytes(key.private_bytes(serialization.Encoding.PEM,
        serialization.PrivateFormat.PKCS8, serialization.NoEncryption()))
if not all((certs / item).is_file() for item in ('ca.crt', 'local.crt', 'local.key')):
    parser.error('Incomplete certificate directory; restore it before continuing')
if not (root / '.env').exists():
    (root / '.env').write_text('ERP_ROOT='+args.erp_root.resolve().as_posix()+'\nGOOGLE_OAUTH_FILE='
        +args.google_client.resolve().as_posix()+'\nAPI_IMAGE=zd-demo-local-api:dev\n'
        +'WEB_IMAGE=zd-demo-local-web:dev\nMAX_DEMOS=2\n', encoding='utf-8')
subprocess.run(['docker', 'volume', 'create', 'zd-demo-production-ca'], check=True, capture_output=True)
# API containers receive the public CA only, under the path they already trust.
subprocess.run(['docker', 'run', '--rm', '-v', str(certs)+':/source:ro',
    '-v', 'zd-demo-production-ca:/target', 'alpine:3.22',
    'cp', '/source/ca.crt', '/target/local.crt'], check=True, capture_output=True)
print('Production origin prepared. No DNS or tunnel settings were changed.')
