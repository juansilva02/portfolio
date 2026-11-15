"""Run inside the Linux worker image with its worker.py mounted."""
import os
import signal
import subprocess
import sys
import tempfile

sys.path.insert(0, "/worker")
import worker

with tempfile.TemporaryDirectory() as folder:
    worker.DATABASE = folder + "/registry.sqlite"
    environment = dict(os.environ, BROKER_DB=worker.DATABASE)
    script = "import worker; lock=worker.exclusive_worker(); lock.__enter__(); print('owned',flush=True); signal.pause()"
    script = "import signal; " + script
    owner = subprocess.Popen([sys.executable, "-c", script], env=environment,
                             stdout=subprocess.PIPE, text=True)
    try:
        assert owner.stdout.readline().strip() == "owned"
        try:
            with worker.exclusive_worker():
                raise AssertionError("Competing worker entered")
        except RuntimeError as error:
            assert "Another worker" in str(error)
        owner.kill()
        owner.wait(timeout=10)
        # The stale file remains. Only the kernel lock determines ownership.
        assert os.path.isfile(worker.DATABASE + ".worker.lock")
        with worker.exclusive_worker():
            pass
        print("PASS concurrent worker rejected; killed owner releases registry")
    finally:
        if owner.poll() is None:
            owner.kill()
            owner.wait(timeout=10)
