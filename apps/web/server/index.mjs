import crypto from 'node:crypto';
import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, '..');
const distDir = path.join(appRoot, 'dist');
const dataDir = path.join(appRoot, 'data');
const submissionsFile = path.join(dataDir, 'contact-submissions.json');

const port = Number(process.env.PORT || 3001);
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxRequests = 3;
const requestLog = new Map();

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

const normalizeText = (value, maxLength) =>
  String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);

const normalizeMessage = (value, maxLength) =>
  String(value || '')
    .trim()
    .replace(/\r\n/g, '\n')
    .slice(0, maxLength);

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket.remoteAddress || 'unknown';
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const windowStart = now - rateLimitWindowMs;
  const timestamps = (requestLog.get(ip) || []).filter((timestamp) => timestamp > windowStart);

  if (timestamps.length >= rateLimitMaxRequests) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
};

const getMailConfig = () => {
  const host = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || 'juanbautistasilva02@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || user;

  if (!host || !user || !pass || !from || !to) {
    return null;
  }

  return {
    host,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
    user,
    pass,
    to,
    from,
  };
};

const sendContactEmail = async (submission) => {
  const mailConfig = getMailConfig();

  if (!mailConfig) {
    return { sent: false, reason: 'Configuracion SMTP no definida.' };
  }

  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass,
    },
  });

  const subjectLine = submission.subject
    ? `[Contacto zuzudev] ${submission.subject}`
    : `[Contacto zuzudev] Nuevo mensaje de ${submission.name}`;

  const text = [
    'Nuevo mensaje desde el portfolio de zuzudev',
    '',
    `Nombre: ${submission.name}`,
    `Email: ${submission.email}`,
    `Asunto: ${submission.subject || 'Sin asunto'}`,
    '',
    'Mensaje:',
    submission.message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2>Nuevo mensaje desde el portfolio de zuzudev</h2>
      <p><strong>Nombre:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Asunto:</strong> ${submission.subject || 'Sin asunto'}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${submission.message}</p>
    </div>
  `;

  await transporter.sendMail({
    from: mailConfig.from,
    to: mailConfig.to,
    replyTo: submission.email,
    subject: subjectLine,
    text,
    html,
  });

  return { sent: true };
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/api/contact') {
    try {
      await ensureStorage();

      const clientIp = getClientIp(req);
      if (isRateLimited(clientIp)) {
        return sendJson(res, 429, {
          ok: false,
          message: 'Demasiados intentos. Espera unos minutos antes de volver a enviar.',
        });
      }

      const body = await readJsonBody(req);

      if (body.companyWebsite) {
        return sendJson(res, 200, {
          ok: true,
          message: 'Mensaje recibido.',
        });
      }

      const submission = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        name: normalizeText(body.name, 120),
        email: normalizeText(body.email, 160).toLowerCase(),
        subject: normalizeText(body.subject, 180),
        message: normalizeMessage(body.message, 4000),
      };

      if (!submission.name || !submission.email || !submission.message) {
        return sendJson(res, 400, {
          ok: false,
          message: 'Faltan campos obligatorios.',
        });
      }

      if (!isValidEmail(submission.email)) {
        return sendJson(res, 400, {
          ok: false,
          message: 'Ingresa un email valido.',
        });
      }

      const current = JSON.parse(await fs.readFile(submissionsFile, 'utf8'));
      current.push(submission);
      await fs.writeFile(submissionsFile, JSON.stringify(current, null, 2), 'utf8');

      const emailResult = await sendContactEmail(submission);

      return sendJson(res, 201, {
        ok: true,
        message: emailResult.sent
          ? 'Mensaje guardado y enviado por email correctamente.'
          : 'Mensaje guardado correctamente.',
        emailSent: emailResult.sent,
        emailNotice: emailResult.sent ? undefined : emailResult.reason,
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
