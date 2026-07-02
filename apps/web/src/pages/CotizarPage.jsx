import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  Database,
  LayoutTemplate,
  MessageCircle,
  ShoppingCart,
  Terminal,
  Workflow,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { fadeUp, staggerContainer, revealOnView } from '@/lib/motion';
import { categorias, extras, calcularRango } from '@/data/cotizador.js';

const iconos = { LayoutTemplate, Building2, ShoppingCart, Database, Workflow, Bot };

const CotizarPage = () => {
  const [categoriaId, setCategoriaId] = useState('landing');
  const [nivelId, setNivelId] = useState('express');
  const [extrasIds, setExtrasIds] = useState([]);

  const categoria = categorias.find((c) => c.id === categoriaId);
  const nivel = categoria?.niveles.find((n) => n.id === nivelId) || categoria?.niveles[0];
  const extrasSeleccionados = extras.filter((e) => extrasIds.includes(e.id));
  const rango = useMemo(
    () => calcularRango(nivel, extrasSeleccionados),
    [nivel, extrasSeleccionados]
  );

  const elegirCategoria = (id) => {
    setCategoriaId(id);
    const cat = categorias.find((c) => c.id === id);
    setNivelId(cat.niveles[0].id);
  };

  const toggleExtra = (id) => {
    setExtrasIds((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  const resumen = `Proyecto: ${categoria.nombre} — nivel ${nivel.nombre}. Extras: ${
    extrasSeleccionados.length ? extrasSeleccionados.map((e) => e.nombre).join(', ') : 'ninguno'
  }. Estimado del cotizador: ${rango[0]}–${rango[1]} USD. Quiero una cotización exacta.`;

  const linkWhatsApp = `https://wa.me/541136952045?text=${encodeURIComponent(`Hola Juan, usé el cotizador de zuzudev.pro. ${resumen}`)}`;
  const linkContacto = `/contact?service=cotizacion&detalle=${encodeURIComponent(resumen)}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Helmet>
        <title>Cotizá tu proyecto web, automatización o IA | zuzudev</title>
        <meta
          name="description"
          content="Cotizador online: estimá el precio de tu landing page, sitio web, tienda online, automatización con n8n o solución con IA según la complejidad del proyecto."
        />
        <link rel="canonical" href="https://zuzudev.pro/cotizar" />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <Header />

        <main className="pt-24 pb-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 mb-5">
                <Terminal className="w-3.5 h-3.5" />
                Cotizador online
              </span>
              <h1
                className="page-title-shine text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-5 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                Cotizá tu proyecto <span className="text-slate-400">en 30 segundos</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Elegí el tipo de proyecto, el nivel de complejidad y los extras. El estimador te da un rango
                real basado en precios de mercado — la cotización exacta te la paso yo, sin compromiso.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
              {/* Columna de selección */}
              <motion.div variants={staggerContainer(0.08)} {...revealOnView} className="space-y-8">
                <motion.div variants={fadeUp}>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4">
                    1 · Tipo de proyecto
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categorias.map((cat) => {
                      const Icono = iconos[cat.icono];
                      const activa = cat.id === categoriaId;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => elegirCategoria(cat.id)}
                          className={`text-left rounded-[1.25rem] p-4 border transition-all duration-200 active:scale-[0.98] ${
                            activa
                              ? 'liquid-glass-blue border-sky-300/40'
                              : 'liquid-glass-light border-transparent hover:border-slate-500/40'
                          }`}
                        >
                          <Icono className={`w-5 h-5 mb-2 ${activa ? 'text-sky-200' : 'text-slate-400'}`} />
                          <div className="text-sm font-semibold text-slate-100">{cat.nombre}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            desde {cat.niveles[0].rango[0]} USD
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4">
                    2 · Nivel de complejidad
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {categoria.niveles.map((n) => {
                      const activo = n.id === nivel.id;
                      return (
                        <button
                          key={n.id}
                          onClick={() => setNivelId(n.id)}
                          className={`text-left rounded-[1.25rem] p-4 border transition-all duration-200 active:scale-[0.98] ${
                            activo
                              ? 'liquid-glass-blue border-sky-300/40'
                              : 'liquid-glass-light border-transparent hover:border-slate-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-100">{n.nombre}</span>
                            {activo && <Check className="w-4 h-4 text-sky-200" />}
                          </div>
                          <div className="text-xs text-slate-300 font-mono mb-2">
                            {n.rango[0]}–{n.rango[1]} USD
                          </div>
                          <ul className="space-y-1">
                            {n.incluye.map((item) => (
                              <li key={item} className="text-xs text-slate-400 leading-relaxed">
                                · {item}
                              </li>
                            ))}
                          </ul>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4">
                    3 · Extras
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {extras.map((e) => {
                      const activo = extrasIds.includes(e.id);
                      return (
                        <button
                          key={e.id}
                          onClick={() => toggleExtra(e.id)}
                          className={`flex items-center justify-between rounded-[1.25rem] px-4 py-3 border transition-all duration-200 active:scale-[0.98] ${
                            activo
                              ? 'liquid-glass-blue border-sky-300/40'
                              : 'liquid-glass-light border-transparent hover:border-slate-500/40'
                          }`}
                        >
                          <span className="text-sm text-slate-100 text-left">{e.nombre}</span>
                          <span className="text-xs font-mono text-slate-300 ml-3 whitespace-nowrap">{e.precio}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>

              {/* Panel resultado estilo terminal */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:sticky lg:top-24"
              >
                <div className="overflow-hidden rounded-2xl border border-sky-300/20 bg-[#0d1117] shadow-[0_40px_80px_-40px_rgba(56,189,248,0.4)]">
                  <div className="flex items-center gap-2 border-b border-white/5 bg-[#161b22] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-xs text-slate-500 font-mono">zuzudev — estimador</span>
                  </div>

                  <div className="p-5 font-mono text-sm leading-relaxed">
                    <div className="text-slate-400">
                      <span className="text-emerald-400">$</span> zuzudev estimate{' '}
                      <span className="text-sky-400">--tipo</span> {categoria.id}{' '}
                      <span className="text-sky-400">--nivel</span> {nivel.id}
                      {extrasIds.length > 0 && (
                        <>
                          {' '}<span className="text-sky-400">--extras</span> {extrasIds.join(',')}
                        </>
                      )}
                    </div>

                    <div className="mt-4 space-y-1.5 text-slate-300">
                      <div><span className="text-slate-500">proyecto :</span> {categoria.nombre}</div>
                      <div><span className="text-slate-500">nivel    :</span> {nivel.nombre}</div>
                      <div>
                        <span className="text-slate-500">extras   :</span>{' '}
                        {extrasSeleccionados.length ? extrasSeleccionados.map((e) => e.nombre).join(', ') : '—'}
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                      <div className="text-xs text-slate-500 mb-1">estimado</div>
                      <motion.div
                        key={`${rango[0]}-${rango[1]}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-2xl font-bold text-emerald-300"
                      >
                        {rango[0]}–{rango[1]} <span className="text-base font-medium text-emerald-400/70">USD</span>
                      </motion.div>
                      <div className="text-xs text-slate-500 mt-2">
                        ✓ Rango orientativo · la cotización exacta depende del alcance final
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <a
                        href={linkWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 liquid-glass-button-blue px-5 py-3 rounded-xl font-medium text-slate-50 transition-all duration-200 hover:brightness-110 active:scale-95 font-sans"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Pedir cotización exacta por WhatsApp
                      </a>
                      <Link
                        to={linkContacto}
                        className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-medium text-slate-200 transition-all duration-200 hover:bg-slate-800 active:scale-95 font-sans"
                      >
                        Enviar por formulario
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-4 text-center leading-relaxed">
                  Precios de referencia en USD basados en el mercado freelance. Proyectos con alcance especial
                  se cotizan a medida.
                </p>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default CotizarPage;
