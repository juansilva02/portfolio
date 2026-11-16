import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, ArrowUpRight, ShoppingBag, Package, Wallet, Users, Truck, Check } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MagicBento from '@/components/MagicBento';
import { Button } from '@/components/ui/button';
import './ProjectsPage.css';

const GradientASCII = lazy(() => import('@/components/GradientASCII'));
const demoUrl = 'https://demo.zuzudev.pro/';
const colors = ['#12304a', '#38bdf8', '#a5d8ff', '#edf7ff'];

function SalesPreview() {
  return <div className="erp-sales-preview">
    <div className="erp-preview-top"><span>Ventas de hoy</span><span className="erp-example">Vista de ejemplo</span></div>
    <strong className="erp-preview-total">$ 284.500</strong>
    <div className="erp-preview-chart">{[28, 42, 36, 61, 49, 78, 66, 92, 81, 100].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
    <div className="erp-preview-row"><span>Venta #1042</span><strong>$ 124.500</strong><span className="erp-paid">Registrada</span></div>
    <div className="erp-preview-row"><span>Venta #1041</span><strong>$ 96.000</strong><span className="erp-paid">Registrada</span></div>
    <div className="erp-preview-row"><span>Venta #1040</span><strong>$ 64.000</strong><span className="erp-paid">Registrada</span></div>
  </div>;
}
const features = [
  { id: 'ventas', label: '01 / VENTAS', icon: <ShoppingBag size={18} />, title: 'Cada venta, con su registro.', description: 'Prepará presupuestos, registrá ventas y consultá el historial de operaciones.', visual: <SalesPreview />, colSpan: 2, rowSpan: 2 },
  { id: 'stock', label: '02 / INVENTARIO', icon: <Package size={18} />, title: 'Sabé qué tenés disponible.', description: 'Controlá existencias, reservas y movimientos entre depósitos.', visual: <div className="erp-stock-tags"><span>Cemento <b>128</b></span><span>Ladrillos <b>2.400</b></span><span>Arena <b>18 m³</b></span></div>, colSpan: 2 },
  { id: 'caja', label: '03 / CAJA', icon: <Wallet size={18} />, title: 'Tus movimientos, claros.', description: 'Consultá cobros, pagos y medios de cobro.', visual: <div className="erp-mini-flow"><span>Ingresos</span><ArrowRight size={17} /><Wallet size={28} /><ArrowRight size={17} /><span>Egresos</span></div> },
  { id: 'clientes', label: '04 / CLIENTES', icon: <Users size={18} />, title: 'El historial a mano.', description: 'Revisá operaciones y saldos pendientes de tus clientes.', visual: <div className="erp-people"><span>CL</span><span>AB</span><span>MN</span><span>+</span></div> },
  { id: 'compras', label: '05 / COMPRAS', icon: <Truck size={18} />, title: 'Compras y proveedores, conectados.', description: 'Organizá las compras y consultá la información de tus proveedores.', visual: <div className="erp-mini-flow"><Truck size={24} /><span>Compra</span><ArrowRight size={17} /><Package size={24} /><span>Stock</span></div>, colSpan: 2 },
  { id: 'demo', href: demoUrl, colSpan: 2, content: <div className="erp-demo-tile"><span className="erp-eyebrow">TU PRÓXIMO PASO</span><h3>Probalo Gratis <ArrowUpRight size={30} /></h3><p>Creá una demo privada para tu empresa.</p><span>20 días de prueba desde la activación.</span></div> },
];

export default function ProjectsPage() {
  return <>
    <Helmet>
      <title>ERP zuzudev | Ventas, stock y caja para tu negocio</title>
      <meta name="description" content="Conocé el ERP de zuzudev: ventas, stock, caja, clientes y proveedores en un mismo sistema. Creá tu demo privada y probalo durante 20 días desde la activación." />
      <link rel="canonical" href="https://zuzudev.pro/projects" />
    </Helmet>
    <Header />
    <main className="erp-page">
      <section className="erp-hero" aria-labelledby="erp-title">
        <div className="erp-ascii" aria-hidden="true"><Suspense fallback={null}><GradientASCII colors={colors} shape="horizon" characters=" =+xX0S8#@" cellSize={20} density={0.65} glyphOpacity={0.35} gradientOpacity={0.45} glow={0.12} depthOfField={0} softness={0.65} speed={0} flow={0} flicker={0} grain={0} mouseInteraction={false} clickEffect="none" intro={false} dpr={1} /></Suspense></div>
        <div className="erp-hero-scrim" />
        <div className="erp-wrap erp-hero-content">
          <p className="erp-eyebrow"><span className="erp-brand-mark">z</span> ZUZUDEV ERP / GESTIÓN COMERCIAL</p>
          <h1 id="erp-title">Ventas, stock y caja.<br /><span>Todo en su lugar.</span></h1>
          <p className="erp-hero-copy">La información de tu negocio, en un mismo sistema. Desde tu computadora o tu celular.</p>
          <div className="erp-hero-actions"><Button asChild className="liquid-glass-button-blue min-h-12 rounded-xl px-7 text-slate-50"><a href={demoUrl}>Probalo Gratis<ArrowRight aria-hidden="true" /></a></Button><a className="erp-secondary-link" href="#funciones">Explorá el sistema <ArrowRight size={16} /></a></div>
          <p className="erp-trial"><Check size={15} /> Demo privada · 20 días desde la activación</p>
        </div>
      </section>
      <section id="funciones" className="erp-wrap erp-functions" aria-labelledby="erp-functions-title">
        <div className="erp-section-heading"><div><p className="erp-eyebrow">DE LA OPERACIÓN A LA INFORMACIÓN</p><h2 id="erp-functions-title">Lo que pasa en tu negocio,<br /><span>lo encontrás acá.</span></h2></div><p>Explorá ventas, inventario y caja con datos de ejemplo. Después, probalo en tu propia demo.</p></div>
        <MagicBento items={features} columns={4} rowHeight={200} gap={15} radius={19} glowColor="#7dd3fc" enableBorderGlow enableSpotlight spotlightRadius={280} clickEffect enableStars particleCount={41} enableTilt enableMagnetism textAutoHide={false} intro={false} className="erp-bento" style={{ '--mb-surface': 'linear-gradient(155deg, #142133, #0b1421)', '--mb-ink': '#f1f5f9', '--mb-muted': '#a5b4c8', '--mb-faint': '#94a3b8', '--mb-shadow': 'none' }} />
      </section>
      <section className="erp-wrap erp-closing" aria-labelledby="erp-closing-title"><div><p className="erp-eyebrow">EMPEZÁ A EXPLORAR</p><h2 id="erp-closing-title">Tu negocio, tu espacio de prueba.</h2><p>Un entorno privado con datos de ejemplo para recorrer, editar y conocer el sistema.</p></div><Button asChild className="liquid-glass-button-blue min-h-12 rounded-xl px-7 text-slate-50"><a href={demoUrl}>Crear mi demo<ArrowUpRight aria-hidden="true" /></a></Button></section>
    </main>
    <Footer />
  </>;
}
