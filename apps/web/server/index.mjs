import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, '..');
const distDir = path.join(appRoot, 'dist');
const dataDir = path.join(appRoot, 'data');
const submissionsFile = path.join(dataDir, 'contact-submissions.json');

const port = Number(process.env.PORT || 3001);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const ensureStorage = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(submissionsFile);
  } catch {
    await fs.writeFile(submissionsFile, '[]', 'utf8');
  }
};

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error('Payload demasiado grande'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error('JSON invalido'));
      }
    });

    req.on('error', reject);
  });

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(payload));
};

const serveFile = async (res, filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const data = await fs.readFile(filePath);
    res.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
    });
    res.end(data);
    return true;
  } catch {
    return false;
  }
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/api/contact') {
    try {
      await ensureStorage();
      const body = await readJsonBody(req);

      const submission = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        name: body.name?.trim() || '',
        email: body.email?.trim() || '',
        subject: body.subject?.trim() || '',
        message: body.message?.trim() || '',
      };

      if (!submission.name || !submission.email || !submission.message) {
        return sendJson(res, 400, {
          ok: false,
          message: 'Faltan campos obligatorios.',
        });
      }

      const current = JSON.parse(await fs.readFile(submissionsFile, 'utf8'));
      current.push(submission);
      await fs.writeFile(submissionsFile, JSON.stringify(current, null, 2), 'utf8');

      return sendJson(res, 201, {
        ok: true,
        message: 'Mensaje guardado correctamente.',
      });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        message: error.message || 'No se pudo guardar el mensaje.',
      });
    }
  }

  if (req.method === 'GET' && url.pathname === '/api/contact') {
    try {
      await ensureStorage();
      const current = JSON.parse(await fs.readFile(submissionsFile, 'utf8'));
      return sendJson(res, 200, current);
    } catch {
      return sendJson(res, 500, {
        ok: false,
        message: 'No se pudieron leer los mensajes.',
      });
    }
  }

  const normalizedPath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const requestedFile = path.normalize(path.join(distDir, normalizedPath));

  if (requestedFile.startsWith(distDir) && (await serveFile(res, requestedFile))) {
    return;
  }

  const indexFile = path.join(distDir, 'index.html');
  if (await serveFile(res, indexFile)) {
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('No encontrado');
});

server.listen(port, async () => {
  await ensureStorage();
  console.log(`Servidor listo en http://localhost:${port}`);
});
