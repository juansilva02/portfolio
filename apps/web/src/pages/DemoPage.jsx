import GlassSurfaceLayer from '@/components/GlassSurfaceLayer';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { prepareDemoRequest } from '../../lib/demo-request.js';

export default function DemoPage({ contactOnly = false } = {}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const sending = useRef(false);
  const [automatic, setAutomatic] = useState(contactOnly ? false : null);
  const [demo, setDemo] = useState(null);
  const [methods, setMethods] = useState({});
  const [method, setMethod] = useState('email');
  const [verification, setVerification] = useState(false);

  useEffect(() => {
    if (contactOnly) return;
    let cancelled = false;
    let timer;
    async function refresh() {
      try {
        const response = await fetch('/api/demo/status', { cache: 'no-store' });
        if (!response.ok) throw new Error();
        const result = await response.json();
        if (cancelled) return;
        setDemo(result.status === 'anonymous' ? null : result);
        if (['pending', 'provisioning'].includes(result.status)) timer = setTimeout(refresh, 3000);
      } catch {
        if (!cancelled) timer = setTimeout(refresh, 5000);
      }
    }
    fetch('/api/demo/config', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : { enabled: false })
      .then(result => {
        if (!cancelled) {
          setAutomatic(result.enabled === true);
          setMethods(result);
          setMethod('email');
          if (result.enabled) refresh();
        }
      })
      .catch(() => { if (!cancelled) setAutomatic(false); });
    if (new URLSearchParams(window.location.search).get('creation') === 'failed') {
      setError('No pudimos verificar tu cuenta de Google. Volvé a intentarlo.');
    }
    return () => { cancelled = true; clearTimeout(timer); };
  }, [contactOnly]);

  async function submit(event) {
    event.preventDefault();
    if (sending.current) return;
    const form = new FormData(event.currentTarget);
    sending.current = true;
    setStatus('sending');
    setError('');
    try {
      const request = {
        ...Object.fromEntries(form),
        type: 'demo-request',
        method: event.nativeEvent.submitter?.value || 'email',
        marketingConsent: form.get('marketingConsent') === 'on',
      };
      if (contactOnly) {
        const prepared = prepareDemoRequest(request);
        if (prepared.error) throw new Error(prepared.error);
        Object.assign(request, prepared.fields);
      }
      if (!automatic) throw new Error('La activación está temporalmente en preparación. Contactanos a administracion@zuzudev.pro.');
      const response = await fetch(verification ? '/api/demo/verify' : '/api/demo/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      const result = await response.json();
      if (!response.ok || (!automatic && !result.ok)) throw new Error(result.message || 'No pudimos recibir tu solicitud. Intentá nuevamente.');
      if (result.verification === 'email') { setVerification(true); setStatus('idle'); }
      else if (result.verified) window.location.assign('/demo');
      else if (automatic) window.location.assign(result.url);
      else setStatus('success');
    } catch (failure) {
      setError(failure.message || 'Revisá tu conexión e intentá nuevamente.');
      setStatus('idle');
    } finally {
      sending.current = false;
    }
  }

  async function returnToDemo() {
    if (sending.current) return;
    sending.current = true;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/demo/login', { method: 'POST' });
      const result = await response.json();
      if (!response.ok) throw new Error();
      window.location.assign(result.url);
    } catch {
      setError('No pudimos abrir el acceso de Google. Intentá nuevamente.');
      setStatus('idle');
    } finally { sending.current = false; }
  }

  return <>
    <Helmet>
      <title>Solicitá tu demo del ERP | zuzudev</title>
      <meta name="description" content="Solicitá una demo privada del ERP de zuzudev para tu empresa. Ventas, stock, caja y clientes desde tu celular." />
      <link rel="canonical" href={contactOnly ? 'https://demo.zuzudev.pro/' : 'https://zuzudev.pro/demo'} />
    </Helmet>
    <Header />
    <main className="min-h-screen px-5 pb-24 pt-32 text-slate-100">
      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-medium text-sky-300">ERP para empresas y comercios</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Probá cómo se organiza tu negocio.</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">Ventas, stock, caja y clientes en un mismo lugar, desde tu computadora o celular.</p>
          <ul className="mt-7 space-y-4 text-slate-300">
            {['Un entorno privado para tu empresa.', 'Datos de ejemplo para explorar y editar.', '20 días de prueba desde que tu demo esté lista.'].map(text => <li key={text} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky-300" />{text}</li>)}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-slate-400">{automatic ? 'Identificate con Google para crear tu demo. Al volver, encontrarás la misma empresa con los cambios que hayas guardado.' : 'Estamos preparando el acceso a las demos. Dejanos tus datos y te contactaremos por correo para continuar con la activación.'}</p>
        </div>
        <section aria-label="Solicitud de demo" className="has-glass-surface liquid-glass-light rounded-3xl p-6 sm:p-8"><GlassSurfaceLayer />
          {demo ? <div role="status" className="space-y-4">
            <h2 className="text-2xl font-semibold">{demo.status === 'ready' ? 'Tu demo está lista' : demo.status === 'expired' ? 'Tu demo venció' : demo.status === 'failed' ? 'No pudimos preparar tu demo' : 'Estamos preparando tu empresa'}</h2>
            <p className="leading-relaxed text-slate-300">{demo.status === 'ready' ? 'Ingresá con la misma cuenta de Google. Tus cambios se guardan en la base de tu empresa.' : demo.status === 'expired' ? 'Contactanos si querés continuar usando el sistema.' : demo.status === 'failed' ? 'Contactanos para revisar la activación de tu empresa.' : 'Estamos creando tu base y cargando los datos de ejemplo. Podés volver a esta página para consultar el estado.'}</p>
            {demo.status === 'ready' && <a href={demo.url} className="inline-flex min-h-12 items-center rounded-xl bg-sky-200 px-6 font-semibold text-slate-950">Entrar a mi demo<ArrowRight className="ml-2 size-4" /></a>}
          </div> : status === 'success' ? <div role="status" className="space-y-4">
            <CheckCircle2 className="size-9 text-sky-300" />
            <h2 className="text-2xl font-semibold">Recibimos tu solicitud</h2>
            <p className="leading-relaxed text-slate-300">Te contactaremos al correo que ingresaste para continuar con tu demo.</p>
          </div> : <form onSubmit={submit} className="space-y-5">
            <h2 className="text-2xl font-semibold">{automatic ? 'Creá tu demo privada' : 'Solicitá tu demo'}</h2>
            <Field label="Nombre y apellido" name="name" autoComplete="name" maxLength={120} />
            {(!automatic || method === 'email') && <Field label="Correo electrónico" name="email" type="email" autoComplete="email" inputMode="email" maxLength={160} />}
            {verification && <Field label="Código recibido por correo" name="code" inputMode="numeric" pattern="[0-9]{8}" minLength={8} maxLength={8} />}
            <p className="text-sm leading-relaxed text-slate-400">Tu correo será tu usuario. Podrás elegir una contraseña al activar el acceso.</p>
            <Field label="Teléfono con código de país" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+54 11 1234 5678" minLength={7} maxLength={30} />
            <Field label="Nombre de tu empresa" name="businessName" autoComplete="organization" maxLength={120} />
            <Field label="Rubro" name="industry" placeholder="Por ejemplo, materiales de construcción" maxLength={120} />
            <div className="hidden" aria-hidden="true"><input name="companyWebsite" tabIndex={-1} autoComplete="off" /></div>
            <p className="text-sm leading-relaxed text-slate-400">Usaremos estos datos para gestionar tu solicitud y contactarte sobre la demo. Podés solicitar su eliminación escribiendo a <a className="break-all text-sky-300 underline" href="mailto:administracion@zuzudev.pro">administracion@zuzudev.pro</a>.</p>
            <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-300">
              <input className="mt-1 size-5 shrink-0 accent-sky-400" name="marketingConsent" type="checkbox" />
              Quiero recibir novedades de zuzudev por correo. Puedo darme de baja cuando quiera.
            </label>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <Button type="submit" name="method" value="email" disabled={status === 'sending' || !methods.email} className="min-h-12 w-full bg-sky-200 font-semibold text-slate-950 hover:bg-sky-100">{status === 'sending' ? 'Continuando…' : verification ? 'Verificar correo' : 'Crear demo con usuario y contraseña'}<ArrowRight className="ml-2 size-4" /></Button>
            {!methods.email && <p className="text-sm text-slate-400">El alta por correo está en preparación. Falta configurar el envío del código de verificación.</p>}
            {!verification && <div className="space-y-4 border-t border-slate-600 pt-5">
              <h3 className="text-lg font-semibold">Crear cuenta con Google</h3>
              <Button type="submit" name="method" value="google" disabled={status === 'sending' || !methods.google} className="min-h-12 w-full bg-white font-semibold text-slate-950 hover:bg-slate-100"><span aria-hidden="true" className="mr-3 text-xl font-bold text-blue-600">G</span>Continuar con Google</Button>
            </div>}
            {automatic && <button type="button" onClick={returnToDemo} disabled={status === 'sending'} className="min-h-11 w-full text-sm text-sky-200 underline underline-offset-4">Ya tengo una demo. Ingresar con Google</button>}
          </form>}
        </section>
      </div>
    </main>
    <Footer />
  </>;
}

function Field({ label, name, ...props }) {
  return <label className="block text-sm font-medium" htmlFor={`demo-${name}`}>{label}<Input id={`demo-${name}`} name={name} required className="mt-2 min-h-12 w-full border-slate-600 bg-slate-950/40 text-base" {...props} /></label>;
}
