export const demoConsentText = 'Quiero recibir novedades de zuzudev por correo. Puedo darme de baja cuando quiera.';

export function prepareDemoRequest(body) {
  if (body.type !== 'demo-request') return { fields: {} };
  const clean = (value, limit) => typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, limit) : '';
  const phone = clean(body.phone, 30);
  const businessName = clean(body.businessName, 120);
  const industry = clean(body.industry, 120);
  if (!businessName || !industry || !/^[+\d\s().-]{7,30}$/.test(phone) || phone.replace(/\D/g, '').length < 7) {
    return { error: 'Completá empresa, rubro y un teléfono válido con código de país.' };
  }
  if (typeof body.marketingConsent !== 'boolean') return { error: 'Revisá la opción de novedades e intentá nuevamente.' };
  const consent = body.marketingConsent;
  return { fields: {
    type: 'demo-request', phone, businessName, industry,
    status: 'requested', emailVerified: false,
    marketingConsent: consent,
    consentRecordedAt: new Date().toISOString(),
    consentVersion: 'demo-news-2026-11-11',
    consentText: demoConsentText,
    source: 'portfolio-demo',
    subject: 'Solicitud de demo ERP',
    message: `Solicitud de demo ERP\nEmpresa: ${businessName}\nRubro: ${industry}\nTeléfono: ${phone}\nNovedades por correo: ${consent ? 'Sí' : 'No'}\nConsentimiento: ${demoConsentText}`,
  } };
}
