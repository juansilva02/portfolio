// Función serverless de Vercel para el formulario de contacto.
// En producción Vercel solo sirve el build estático: este archivo es el backend real.
// Variables de entorno (configurar en Vercel → Settings → Environment Variables):
//   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
//   CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL
//   N8N_WEBHOOK_URL (opcional: reenvía cada consulta a un flujo de n8n)

import nodemailer from 'nodemailer';

const ventanaMs = 15 * 60 * 1000;
const maxPorVentana = 3;
const registro = new Map(); // rate limit por instancia (suficiente para este tráfico)

const normalizar = (v, max) => String(v || '').trim().replace(/\s+/g, ' ').slice(0, max);
const normalizarMensaje = (v, max) => String(v || '').trim().replace(/\r\n/g, '\n').slice(0, max);
const emailValido = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const escaparHtml = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const limitado = (ip) => {
  const ahora = Date.now();
  const marcas = (registro.get(ip) || []).filter((t) => t > ahora - ventanaMs);
  if (marcas.length >= maxPorVentana) {
    registro.set(ip, marcas);
    return true;
  }
  marcas.push(ahora);
  registro.set(ip, marcas);
  return false;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Método no permitido.' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'desconocida';
  if (limitado(ip)) {
    return res.status(429).json({ ok: false, message: 'Demasiados intentos. Esperá unos minutos.' });
  }

  const body = req.body || {};

  // Honeypot: los bots completan este campo oculto
  if (body.companyWebsite) {
    return res.status(200).json({ ok: true, message: 'Mensaje recibido.' });
  }

  const envio = {
    createdAt: new Date().toISOString(),
    name: normalizar(body.name, 120),
    email: normalizar(body.email, 160).toLowerCase(),
    subject: normalizar(body.subject, 180),
    message: normalizarMensaje(body.message, 4000),
  };

  if (!envio.name || !envio.email || !envio.message) {
    return res.status(400).json({ ok: false, message: 'Faltan campos obligatorios.' });
  }
  if (!emailValido(envio.email)) {
    return res.status(400).json({ ok: false, message: 'Ingresá un email válido.' });
  }

  let emailEnviado = false;
  let webhookEnviado = false;

  // 1) Email vía SMTP (si está configurado)
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 587),
        secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      const asunto = envio.subject
        ? `[Contacto zuzudev] ${envio.subject}`
        : `[Contacto zuzudev] Nuevo mensaje de ${envio.name}`;
      await transporter.sendMail({
        from: CONTACT_FROM_EMAIL || SMTP_USER,
        to: CONTACT_TO_EMAIL || 'administracion@zuzudev.pro',
        replyTo: envio.email,
        subject: asunto,
        text: [
          'Nuevo mensaje desde zuzudev.pro',
          '',
          `Nombre: ${envio.name}`,
          `Email: ${envio.email}`,
          `Asunto: ${envio.subject || 'Sin asunto'}`,
          '',
          'Mensaje:',
          envio.message,
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
            <h2>Nuevo mensaje desde zuzudev.pro</h2>
            <p><strong>Nombre:</strong> ${escaparHtml(envio.name)}</p>
            <p><strong>Email:</strong> ${escaparHtml(envio.email)}</p>
            <p><strong>Asunto:</strong> ${escaparHtml(envio.subject || 'Sin asunto')}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${escaparHtml(envio.message)}</p>
          </div>
        `,
      });
      emailEnviado = true;
    } catch (e) {
      console.error('Error enviando email:', e.message);
    }
  }

  // 2) Webhook n8n (si está configurado): notificaciones, CRM, agenda, etc.
  if (process.env.N8N_WEBHOOK_URL) {
    try {
      const r = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origen: 'zuzudev.pro', ...envio }),
      });
      webhookEnviado = r.ok;
    } catch (e) {
      console.error('Error enviando webhook n8n:', e.message);
    }
  }

  if (!emailEnviado && !webhookEnviado) {
    return res.status(500).json({
      ok: false,
      message: 'No se pudo procesar el mensaje. Escribime directo a administracion@zuzudev.pro.',
    });
  }

  return res.status(201).json({ ok: true, message: 'Mensaje enviado correctamente.', emailSent: emailEnviado });
}
