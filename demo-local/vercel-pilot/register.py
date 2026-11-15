"""Register synthetic jobs only inside the isolated pilot broker."""
import subprocess

fixture = """
import json, secrets, sqlite3
with sqlite3.connect('/data/auth.sqlite') as db:
    for label in ['norte', 'sur']:
        db.execute('''INSERT INTO demos (id,subject,email,lead,slug,instance_origin,
            instance_secret,db_password,jwt_secret,admin_password,subdomain,frontend_mode)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(subject) DO NOTHING''',
            (secrets.token_hex(16), 'pilot-'+label, label+'@example.invalid',
             json.dumps({'name':'Pilot','businessName':label}), label,
             'https://'+label+'.demo.zuzudev.pro', secrets.token_hex(32),
             secrets.token_hex(32), secrets.token_hex(32), secrets.token_hex(32),label,'vercel'))
"""
subprocess.run(["docker", "exec", "-i", "zd-vercel-pilot-broker-1", "python", "-"],
               input=fixture, text=True, check=True)
