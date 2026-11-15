"""Exercise orphan task recovery with a private Docker fixture."""
import secrets
import subprocess
import sys
import time
sys.path.insert(0, "/worker")
import worker

worker.PROJECT_PREFIX = "zd-orphan-check-"
identity = secrets.token_hex(16)
project = worker.PROJECT_PREFIX + identity
name = project + "-task"
try:
    # The launcher exits immediately, leaving the synthetic migration alive.
    subprocess.run(["docker", "run", "-d", "--name", name, "--network", "none",
                    "--label", "com.docker.compose.project="+project,
                    "--label", "com.docker.compose.service=migrate",
                    "alpine:3.22", "sleep", "8"],check=True,stdout=subprocess.DEVNULL)
    independent = time.monotonic()
    worker.wait_for_migrations({"id": secrets.token_hex(16)})
    assert time.monotonic() - independent < 3
    before = time.monotonic()
    worker.wait_for_migrations({"id": identity})
    assert time.monotonic() - before >= 5
    state = subprocess.check_output(["docker","inspect","--format","{{.State.Running}}",name],text=True)
    assert state.strip() == "false"
    print("PASS waited for surviving task; independent company proceeds")
finally:
    subprocess.run(["docker","stop",name],check=True,stdout=subprocess.DEVNULL)
