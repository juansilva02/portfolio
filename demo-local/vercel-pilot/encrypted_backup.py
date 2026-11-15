"""Local restic rehearsal. Repository volumes are retained encrypted for inspection."""
import hashlib
import json
import os
import subprocess
import tempfile
from pathlib import Path

IMAGE = "restic/restic@sha256:136600b6ff6843d61d355f7f71f460a166429f35de6fd11b568fece3c9a4d510"


def roundtrip(payloads):
    repository = "zd-encrypted-rehearsal-" + os.urandom(6).hex()
    subprocess.run(["docker", "volume", "create", repository], check=True, capture_output=True)
    with tempfile.TemporaryDirectory() as folder:
        root = Path(folder)
        source = root / "source"
        source.mkdir()
        password = root / "password"
        password.write_text(os.urandom(48).hex(), encoding="ascii")
        wrong_password = root / "wrong-password"
        wrong_password.write_text(os.urandom(48).hex(), encoding="ascii")
        for name, data in payloads.items():
            if Path(name).name != name:
                raise ValueError("Expected a backup filename")
            (source / name).write_bytes(data)
        manifest = {name: hashlib.sha256(data).hexdigest() for name, data in payloads.items()}
        (source / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
        target = root / "restored"
        target.mkdir()

        def command(*args, password_file=password):
            return ["docker", "run", "--rm", "--network", "none", "--hostname", "zd-demo-backup",
                    "-v", repository + ":/repository",
                    "-v", str(source) + ":/snapshot:ro",
                    "-v", str(target) + ":/restore",
                    "-v", str(password_file) + ":/run/secrets/password:ro",
                    IMAGE, "--no-cache", "-r", "/repository", "-p", "/run/secrets/password", *args]

        def run(*args):
            return subprocess.run(command(*args), check=True, capture_output=True).stdout

        run("init")
        output = run("backup", "--json", "/snapshot")
        summary = next(json.loads(line) for line in output.splitlines()
                       if json.loads(line).get("message_type") == "summary")
        snapshot = summary["snapshot_id"]
        run("check", "--read-data")
        denied = subprocess.run(command("snapshots", "--json", password_file=wrong_password),
                                capture_output=True)
        if denied.returncode == 0:
            raise RuntimeError("Wrong backup password accepted")
        run("restore", snapshot, "--target", "/restore")
        recovered = target / "snapshot"
        stored_manifest = json.loads((recovered / "manifest.json").read_text(encoding="utf-8"))
        result = {name: (recovered / name).read_bytes() for name in payloads}
        if stored_manifest != manifest or any(
                hashlib.sha256(data).hexdigest() != manifest[name] for name, data in result.items()):
            raise RuntimeError("Restored backup content mismatch")
    print("PASS encrypted restic backup, data check, wrong password denied and restored hashes")
    print("Local encrypted repository:", repository)
    return result
