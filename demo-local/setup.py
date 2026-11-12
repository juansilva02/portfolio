"""Prepare ignored local configuration and a development TLS certificate."""
import argparse
from datetime import datetime, timedelta, timezone
import ipaddress
from pathlib import Path

from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa

parser = argparse.ArgumentParser()
parser.add_argument("--erp-root", required=True, type=Path)
parser.add_argument("--google-client", required=True, type=Path)
args = parser.parse_args()
if not (args.erp_root / "deploy/auth-broker/app.py").is_file() or not args.google_client.is_file():
    parser.error("ERP checkout and Google web client file must exist")
root = Path(__file__).resolve().parent
certs = root / "certs"
certs.mkdir(exist_ok=True)
if not (certs / "local.key").exists():
    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, "zuzudev local demos")])
    now = datetime.now(timezone.utc)
    cert = (x509.CertificateBuilder().subject_name(name).issuer_name(name).public_key(key.public_key())
            .serial_number(x509.random_serial_number()).not_valid_before(now-timedelta(days=1))
            .not_valid_after(now+timedelta(days=90))
            .add_extension(x509.BasicConstraints(ca=True, path_length=0), critical=True)
            .add_extension(x509.SubjectAlternativeName([x509.DNSName("localhost"), x509.DNSName("auth-proxy"),
                x509.DNSName("*.demo.localhost"), x509.IPAddress(ipaddress.ip_address("127.0.0.1"))]), critical=False)
            .sign(key, hashes.SHA256()))
    (certs / "local.key").write_bytes(key.private_bytes(serialization.Encoding.PEM,
        serialization.PrivateFormat.PKCS8, serialization.NoEncryption()))
    (certs / "local.crt").write_bytes(cert.public_bytes(serialization.Encoding.PEM))
if not (root / ".env").exists():
    (root / ".env").write_text("ERP_ROOT="+args.erp_root.resolve().as_posix()+"\nGOOGLE_OAUTH_FILE="+
                              args.google_client.resolve().as_posix()+"\n", encoding="utf-8")
print("Local configuration prepared. Google credentials remain in the original file.")
