import GlassSurfaceLayer from '@/components/GlassSurfaceLayer';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Package, Wallet, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const screens = {
  ventas: { label: 'Ventas', icon: ShoppingBag, total: '$ 284.500', metric: 'Ventas del día', columns: ['Operación', 'Total'], rows: [['Venta #1042', '$ 124.500'], ['Venta #1041', '$ 96.000'], ['Venta #1040', '$ 64.000']], note: 'Consultá el historial y el estado de cada venta.' },
  stock: { label: 'Stock', icon: Package, total: '3 depósitos', metric: 'Inventario organizado', columns: ['Producto', 'Disponible'], rows: [['Cemento 50 kg', '128 bolsas'], ['Ladrillo hueco', '2.400 unidades'], ['Arena fina', '18 m³']], note: 'Revisá existencias y reservas por depósito.' },
  caja: { label: 'Caja', icon: Wallet, total: '$ 186.000', metric: 'Cobros registrados', columns: ['Medio de cobro', 'Importe'], rows: [['Efectivo', '$ 82.000'], ['Transferencia', '$ 64.000'], ['Tarjeta', '$ 40.000']], note: 'Seguí los movimientos y medios de cobro.' },
};

function ProductPreview() {
  const [active, setActive] = useState('ventas');
  const screen = screens[active];
  return <div data-visual="product-ui" className="has-glass-surface app-frame overflow-hidden rounded-2xl border border-slate-600/70 bg-[#111a28] shadow-2xl shadow-black/30" aria-label="Preview del sistema de gestión con datos de ejemplo"><GlassSurfaceLayer />
    <div className="flex items-center justify-between gap-3 border-b border-slate-700/70 px-5 py-4">
      <span className="font-semibold tracking-tight text-slate-100">zuzu<span className="text-sky-300">dev</span><span className="ml-3 border-l border-slate-600 pl-3 text-sm font-normal text-slate-400">Gestión</span></span>
      <span className="text-xs text-slate-400">Datos de ejemplo</span>
    </div>
    <div className="grid grid-cols-3 gap-1 border-b border-slate-700/70 p-2" role="group" aria-label="Pantallas del sistema">
      {Object.entries(screens).map(([id, { label, icon: Icon }]) => <button key={id} type="button" aria-pressed={active === id} onClick={() => setActive(id)} className={`flex min-h-12 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${active === id ? 'bg-sky-300/10 text-sky-200' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}><Icon size={16} aria-hidden="true" />{label}</button>)}
    </div>
    <div className="p-5 sm:p-7" aria-live="polite" aria-atomic="true">
      <div className="mb-7 flex items-center justify-between"><p className="text-lg font-semibold text-slate-100">{screen.label}</p><span className="text-xs text-slate-400">Vista general</span></div>
      <p className="text-sm text-slate-400">{screen.metric}</p>
      <p className="mt-2 text-3xl font-medium tracking-tight text-slate-50 tabular-nums sm:text-4xl">{screen.total}</p>
      <table className="mt-7 w-full text-left text-sm tabular-nums">
        <caption className="sr-only">{screen.label} con datos de ejemplo</caption>
        <thead><tr>{screen.columns.map((column, index) => <th key={column} scope="col" className={`border-b border-slate-700 pb-3 font-normal text-slate-400 ${index ? 'text-right' : ''}`}>{column}</th>)}</tr></thead>
        <tbody>{screen.rows.map(([name, value]) => <tr key={name}><td className="border-b border-slate-800 py-4 text-slate-200">{name}</td><td className="border-b border-slate-800 py-4 text-right text-slate-300">{value}</td></tr>)}</tbody>
      </table>
      <p className="mt-5 min-h-10 text-sm leading-relaxed text-slate-400">{screen.note}</p>
    </div>
  </div>;
}

export default function CommercialSaas() {
  const reduceMotion = useReducedMotion();
  return <>
    <section id="gestion-comercial" className="relative flex min-h-[100svh] items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:py-32" aria-labelledby="gestion-title">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="max-w-xl motion-reduce:transform-none">
          <p className="mb-6 text-sm font-medium text-sky-300">zuzudev · Software para tu negocio</p>
          <h1 id="gestion-title" className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-slate-50">Gestión comercial<br /><span className="text-slate-400">para tu empresa.</span></h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">Organizá ventas, stock y caja en un solo sistema. Consultá tu negocio desde la computadora o el celular.</p>
          <Link to="/demo" className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-4 rounded-xl bg-sky-200 px-7 font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-sky-100 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 sm:w-auto">Solicitá tu demo<ArrowRight className="size-5" aria-hidden="true" /></Link>
          <p className="mt-4 text-sm text-slate-400">20 días de prueba desde la activación.</p>
          <a href="#beneficios-gestion" className="mt-8 inline-flex min-h-11 items-center gap-1 text-sm text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white">Ver qué podés gestionar<ChevronRight size={16} aria-hidden="true" /></a>
        </motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="min-w-0"><ProductPreview /></motion.div>
      </div>
    </section>
    <section id="beneficios-gestion" className="scroll-mt-20 border-y border-slate-700/50 bg-slate-950/70 px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="beneficios-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div><h2 id="beneficios-title" className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-4xl">La información que necesitás para decidir.</h2><p className="mt-5 max-w-md leading-relaxed text-slate-400">Una venta, un cobro o una entrega dejan su registro. Podés revisar lo que pasó y seguir lo que queda pendiente.</p></div>
        <div className="space-y-7">
          {[['Registrá tus ventas', 'Prepará presupuestos, registrá ventas y consultá el historial de tus clientes.'], ['Conocé tu stock disponible', 'Controlá existencias, reservas y movimientos de materiales por depósito.'], ['Seguí tus cobros y pagos', 'Revisá caja, medios de cobro y saldos pendientes de clientes y proveedores.']].map(([title, body]) => <div key={title} className="border-b border-slate-700/60 pb-7 last:border-0 last:pb-0"><h3 className="text-xl font-medium text-slate-100">{title}</h3><p className="mt-2 max-w-lg leading-relaxed text-slate-400">{body}</p></div>)}
        </div>
      </div>
    </section>
  </>;
}
