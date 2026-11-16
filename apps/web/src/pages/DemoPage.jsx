import GlassSurfaceLayer from '@/components/GlassSurfaceLayer';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { prepareDemoRequest } from '../../lib/demo-request.js';
import DemoPreparation, { DemoCredentials } from '@/components/DemoPreparation';
import DemoPhoneInput from '@/components/DemoPhoneInput';
import demoBackground from '@/assets/demo-erp-background.webp';
import './DemoPage.css';

const industries = [
  'Almacén, kiosco y supermercado',
  'Ferretería y materiales de construcción',
  'Indumentaria, calzado y accesorios',
  'Electrónica y electrodomésticos',
  'Hogar, muebles y decoración',
  'Librería y artículos de oficina',
  'Repuestos y accesorios para vehículos',
  'Alimentos y bebidas',
  'Salud, belleza y cuidado personal',
  'Distribución y venta mayorista',
  'Industria y fabricación',
  'Servicios profesionales y técnicos',
  'Otro',
];

export default function DemoPage({ contactOnly = false } = {}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const sending = useRef(false);
  const phoneInput = useRef(null);
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
      const telephone = phoneInput.current?.getInstance();
      if (!telephone) throw new Error('Esperá un momento e intentá nuevamente.');
      await telephone.promise.catch(() => {});
      if (!telephone.getSelectedCountryData()?.iso2) throw new Error('Seleccioná el país de tu teléfono.');
      if (!telephone.isValidNumber()) throw new Error('Ingresá un teléfono válido para el país seleccionado.');
      const request = {
        ...Object.fromEntries(form),
        phone: telephone.getNumber(),
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
    <main className="demo-page min-h-screen px-5 pb-64 pt-32 text-slate-100 lg:pb-24" style={{ '--demo-background': `url("${demoBackground}")` }}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-4 text-sm font-medium text-sky-300">ERP para empresas y comercios</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Probá cómo se organiza tu negocio.</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">Ventas, stock, caja y clientes en un mismo lugar, desde tu computadora o celular.</p>
          <ul className="mt-7 space-y-4 text-slate-300">
            {['Un entorno privado para tu empresa.', 'Datos de ejemplo para explorar y editar.', '20 días de prueba desde que tu demo esté lista.'].map(text => <li key={text} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky-300" />{text}</li>)}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-slate-400">{automatic ? 'Identificate con Google para crear tu demo. Al volver, encontrarás la misma empresa con los cambios que hayas guardado.' : 'Estamos preparando el acceso a las demos. Dejanos tus datos y te contactaremos por correo para continuar con la activación.'}</p>
        </div>
        <section aria-label="Solicitud de demo" className="has-glass-surface liquid-glass-light min-w-0 rounded-3xl p-6 sm:p-8"><GlassSurfaceLayer />
          {demo ? <div role="status" className="space-y-4">
            <h2 className="text-2xl font-semibold">{demo.status === 'ready' ? 'Tu demo está lista' : demo.status === 'expired' ? 'Tu demo venció' : demo.status === 'failed' ? 'No pudimos preparar tu demo' : 'Estamos preparando tu empresa'}</h2>
            {['pending', 'provisioning'].includes(demo.status) && <DemoPreparation status={demo.status} />}
            {demo.status === 'ready' && <DemoCredentials username={demo.username} />}
            <p className="leading-relaxed text-slate-300">{demo.status === 'ready' ? 'Ingresá con la misma cuenta de Google. Tus cambios se guardan en la base de tu empresa.' : demo.status === 'expired' ? 'Contactanos si querés continuar usando el sistema.' : demo.status === 'failed' ? 'Contactanos para revisar la activación de tu empresa.' : 'Estamos creando tu base y cargando los datos de ejemplo. Podés volver a esta página para consultar el estado.'}</p>
            {demo.status === 'ready' && <a href={demo.url} className="inline-flex min-h-12 items-center rounded-xl bg-sky-200 px-6 font-semibold text-slate-950">Entrar a mi demo<ArrowRight className="ml-2 size-4" /></a>}
          </div> : status === 'success' ? <div role="status" className="space-y-4">
            <CheckCircle2 className="size-9 text-sky-300" />
            <h2 className="text-2xl font-semibold">Recibimos tu solicitud</h2>
            <p className="leading-relaxed text-slate-300">Te contactaremos al correo que ingresaste para continuar con tu demo.</p>
          </div> : <form onSubmit={submit} className="space-y-5">
            <h2 className="text-2xl font-semibold">{automatic ? 'Creá tu demo privada' : 'Solicitá tu demo'}</h2>
            {(!automatic || method === 'email') && <Field label="Correo electrónico" name="email" type="email" autoComplete="email" inputMode="email" maxLength={160} />}
            {verification && <Field label="Código recibido por correo" name="code" inputMode="numeric" pattern="[0-9]{8}" minLength={8} maxLength={8} />}
            <p className="text-sm leading-relaxed text-slate-400">Tu correo será tu usuario. Podrás elegir una contraseña al activar el acceso.</p>
            <DemoPhoneInput ref={phoneInput} />
            <Field label="Nombre de tu empresa" name="businessName" autoComplete="organization" maxLength={120} />
            <label className="block text-sm font-medium" htmlFor="demo-industry">Rubro
              <select id="demo-industry" name="industry" required defaultValue="" className="mt-2 min-h-12 w-full min-w-0 max-w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-base text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-300">
                <option value="" disabled>Seleccioná un rubro</option>
                {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
              </select>
            </label>
            <div className="hidden" aria-hidden="true"><input name="companyWebsite" tabIndex={-1} autoComplete="off" /></div>
            <p className="text-sm leading-relaxed text-slate-400">Usaremos estos datos para gestionar tu solicitud y contactarte sobre la demo. Podés solicitar su eliminación escribiendo a <a className="break-all text-sky-300 underline" href="mailto:administracion@zuzudev.pro">administracion@zuzudev.pro</a>.</p>
            <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-300">
              <input className="mt-1 size-5 shrink-0 accent-sky-400" name="marketingConsent" type="checkbox" />
              Quiero recibir novedades de zuzudev por correo. Puedo darme de baja cuando quiera.
            </label>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <Button type="submit" name="method" value="email" disabled={status === 'sending' || !methods.email} className="min-h-12 w-full whitespace-normal bg-sky-200 font-semibold text-slate-950 hover:bg-sky-100">{status === 'sending' ? 'Continuando…' : verification ? 'Verificar correo' : 'Crear demo con usuario y contraseña'}<ArrowRight className="ml-2 size-4" /></Button>
            {!methods.email && <p className="text-sm text-slate-400">El alta por correo está en preparación. Falta configurar el envío del código de verificación.</p>}
            {!verification && <div className="space-y-4 border-t border-slate-600 pt-5">
              <Button type="submit" name="method" value="google" disabled={status === 'sending' || !methods.google} className="min-h-12 w-full bg-white font-semibold text-slate-950 hover:bg-slate-100"><GoogleIcon />Continuar con Google</Button>
            </div>}
            {automatic && <button type="button" onClick={returnToDemo} disabled={status === 'sending'} className="min-h-11 w-full text-sm text-sky-200 underline underline-offset-4">Ya tengo una demo. Ingresar con Google</button>}
          </form>}
        </section>
      </div>
    </main>
    <Footer />
  </>;
}

function GoogleIcon() {
  return <svg aria-hidden="true" focusable="false" className="mr-3 size-5 shrink-0" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19A23.87 23.87 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
  </svg>;
}

function Field({ label, name, ...props }) {
  return <label className="block text-sm font-medium" htmlFor={`demo-${name}`}>{label}<Input id={`demo-${name}`} name={name} required className="mt-2 min-h-12 w-full border-slate-600 bg-slate-950/40 text-base" {...props} /></label>;
}
