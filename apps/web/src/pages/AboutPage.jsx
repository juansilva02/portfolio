import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Gauge, GraduationCap, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const driveCards = [
  {
    icon: GraduationCap,
    title: 'Mentalidad de crecimiento',
    description:
      'Estudio Ingenieria Informatica y mantengo una curiosidad tecnica constante. Me interesa entender como funcionan las cosas, no solo usarlas.',
    glow: 'rgba(191, 219, 254, 0.2)',
    border: 'rgba(191, 219, 254, 0.28)',
    accent: 'rgba(239, 246, 255, 0.42)',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Vision de mercado',
    description:
      'Mi paso por el trabajo administrativo me enseno a leer necesidades reales de empresa y a llevar la tecnologia a problemas concretos y valiosos.',
    glow: 'rgba(226, 232, 240, 0.18)',
    border: 'rgba(203, 213, 225, 0.28)',
    accent: 'rgba(248, 250, 252, 0.38)',
  },
  {
    icon: Users,
    title: 'Liderazgo y colaboracion',
    description:
      'Aprendi a trabajar con equipos, sostener altos estandares, comunicar con claridad y responder bien bajo presion sin perder foco ni detalle.',
    glow: 'rgba(74, 222, 128, 0.18)',
    border: 'rgba(134, 239, 172, 0.28)',
    accent: 'rgba(220, 252, 231, 0.4)',
  },
  {
    icon: Gauge,
    title: 'Ambicion profesional',
    description:
      'Quiero especializarme en full-stack, agentes de programacion, automatizaciones y soluciones de alto nivel para clientes que valoran calidad, criterio y ejecucion seria.',
    glow: 'rgba(196, 181, 253, 0.18)',
    border: 'rgba(216, 180, 254, 0.3)',
    accent: 'rgba(243, 232, 255, 0.4)',
  },
];

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Sobre mi | Juan Silva | zuzudev</title>
        <meta
          name="description"
          content="Conoce a Juan Silva, fundador de zuzudev. Desarrollador full-stack en formacion, con experiencia real de negocio, criterio tecnico y enfoque profesional en soluciones web."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />

        <main className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.h1
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                Sobre <span className="text-slate-400">mi</span>
              </motion.h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Desarrollo con mentalidad de negocio, energia joven y una ejecucion enfocada en calidad, detalle y resultados serios.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-stable relative overflow-hidden space-y-6 rounded-[2rem] border p-8 backdrop-blur-xl"
                style={{
                  borderColor: 'rgba(125, 211, 252, 0.3)',
                  background:
                    'linear-gradient(180deg, rgba(125,211,252,0.12), rgba(15,23,42,0.18)), rgba(15,23,42,0.18)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.03), 0 24px 50px -34px rgba(56,189,248,0.35)',
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(191,219,254,0.22),transparent_26%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.03)_100%)]" />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/20" />
                <div className="pointer-events-none absolute inset-0 orbit-glow opacity-75">
                  <div className="absolute -bottom-10 right-8 h-28 w-28 rounded-full blur-3xl bg-sky-300/20" />
                </div>
                <h2 className="relative z-10 text-3xl font-bold text-slate-100">Mi trayectoria</h2>
                <p className="relative z-10 text-slate-300 leading-relaxed">
                  Soy un entusiasta de la programacion y estudiante de Ingenieria Informatica. Me interesa la informatica de una forma profunda: aprender, entender sistemas y convertir ese conocimiento en herramientas utiles.
                </p>
                <p className="relative z-10 text-slate-300 leading-relaxed">
                  Antes de enfocarme por completo en desarrollo, trabaje en el area administrativa de empresa. Ese paso fue clave porque me mostro algo que muchos perfiles tecnicos tardan en entender: la tecnologia solo vale de verdad cuando mejora operaciones, ventas, tiempos o decisiones.
                </p>
                <p className="relative z-10 text-slate-300 leading-relaxed">
                  Hoy construyo productos web y soluciones digitales con una mirada mas madura: pienso en el usuario, en el negocio y en la calidad de ejecucion al mismo tiempo.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-stable relative overflow-hidden space-y-6 rounded-[2rem] border p-8 backdrop-blur-xl"
                style={{
                  borderColor: 'rgba(226, 232, 240, 0.28)',
                  background:
                    'linear-gradient(180deg, rgba(248,250,252,0.07), rgba(15,23,42,0.14)), rgba(15,23,42,0.14)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.03), 0 24px 50px -34px rgba(226,232,240,0.28)',
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(226,232,240,0.18),transparent_24%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_38%,rgba(255,255,255,0.03)_100%)]" />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/20" />
                <div className="pointer-events-none absolute inset-0 orbit-glow opacity-70" style={{ animationDuration: '15s' }}>
                  <div className="absolute -bottom-10 right-8 h-28 w-28 rounded-full blur-3xl bg-slate-100/12" />
                </div>
                <h2 className="relative z-10 text-3xl font-bold text-slate-100">Como trabajo</h2>
                <p className="relative z-10 text-slate-300 leading-relaxed">
                  Me identifico como una persona detallista, exigente y perfeccionista en el buen sentido: cuido la terminacion, la claridad tecnica y la coherencia visual de lo que entrego.
                </p>
                <p className="relative z-10 text-slate-300 leading-relaxed">
                  Tambien aprendi liderazgo, colaboracion y trabajo bajo presion. Eso me permite adaptarme bien a contextos reales, sostener estandares altos y responder con seriedad frente a objetivos concretos.
                </p>
                <p className="relative z-10 text-slate-300 leading-relaxed">
                  Mi objetivo es especializarme en full-stack, agentes de programacion, automatizaciones y soluciones que importan de verdad dentro de una empresa. Quiero trabajar con clientes que busquen un nivel superior de servicio, criterio y calidad.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Que me impulsa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {driveCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="glass-stable group relative overflow-hidden rounded-[1.35rem] border bg-slate-900/28 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      borderColor: card.border,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.02), 0 18px 38px -28px ${card.glow}`,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-70"
                      style={{
                        background: `radial-gradient(circle at 14% 16%, ${card.glow}, transparent 28%), radial-gradient(circle at 82% 18%, ${card.accent}, transparent 22%), linear-gradient(145deg, rgba(255,255,255,0.05) 0%, transparent 32%, rgba(255,255,255,0.02) 100%)`,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 skill-sheen"
                      style={{
                        background: `linear-gradient(115deg, transparent 18%, ${card.accent} 42%, transparent 68%)`,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute -top-10 left-8 h-24 w-32 rounded-full blur-2xl opacity-45"
                      style={{ background: card.glow }}
                    />
                    <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/20" />

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md"
                        style={{
                          borderColor: card.border,
                          background: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03)), radial-gradient(circle at 30% 20%, ${card.accent}, transparent 55%), rgba(15,23,42,0.32)`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 24px -18px ${card.glow}`,
                        }}
                      >
                        <card.icon className="h-5 w-5 text-slate-100" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">{card.title}</h3>
                        <p className="text-slate-300 leading-relaxed">{card.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default AboutPage;
