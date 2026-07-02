import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hoverLift } from '@/lib/motion';
import { Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SocialLinks from '@/components/SocialLinks.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  companyWebsite: '',
};

const servicePresets = {
  'landing-48h': {
    badge: 'Landing express',
    headline: 'Pide tu landing page en 48 hs',
    helper: 'Ideal si necesitas salir rapido con una oferta clara y una presencia profesional.',
    subject: 'Quiero una landing page en 48 hs',
    message: 'Necesito una landing page base para mi negocio. Quiero recibir alcance, tiempos y siguiente paso.',
  },
  'web-corporativa': {
    badge: 'Web corporativa',
    headline: 'Cuentame que necesita tu empresa',
    helper: 'Para servicios, presentacion institucional y un canal comercial mas claro.',
    subject: 'Quiero una web corporativa',
    message: 'Busco una web corporativa para presentar servicios y generar consultas de forma profesional.',
  },
  'software-empresa': {
    badge: 'Software empresarial',
    headline: 'Revisemos tu sistema o panel interno',
    helper: 'Pensado para procesos, operaciones, seguimiento y orden interno.',
    subject: 'Quiero software para mi empresa',
    message: 'Necesito una solucion de software para ordenar procesos, paneles o tareas internas.',
  },
  'saas-mvp': {
    badge: 'SaaS / MVP',
    headline: 'Validemos tu producto web',
    helper: 'MVPs, plataformas y productos pensados para crecer con una base tecnica clara.',
    subject: 'Quiero desarrollar un SaaS o MVP',
    message: 'Quiero conversar sobre un SaaS o MVP web y definir un alcance inicial.',
  },
  'infra-local': {
    badge: 'Infraestructura local',
    headline: 'Hablemos de red y servidor local',
    helper: 'Para empresas que necesitan almacenar bases de datos y operar con infraestructura propia.',
    subject: 'Necesito una red local y servidor para bases de datos',
    message: 'Necesito asesoramiento o implementacion de red local y servidor para almacenamiento de bases de datos.',
  },
  cotizacion: {
    badge: 'Cotización',
    headline: 'Recibí tu cotización exacta',
    helper: 'Vi tu estimación del cotizador. Contame un poco más de tu negocio y te paso el presupuesto final.',
    subject: 'Quiero una cotización exacta (usé el cotizador)',
    message: 'Usé el cotizador de zuzudev.pro y quiero avanzar con una cotización exacta.',
  },
  'consulta-general': {
    badge: 'Consulta general',
    headline: 'Cuentame que necesitas resolver',
    helper: 'Si aun no tienes claro el formato, te ayudo a aterrizarlo rapido.',
    subject: 'Quiero consultar por un proyecto',
    message: 'Quiero conversar sobre una necesidad de mi negocio y recibir orientacion sobre la mejor solucion.',
  },
};

const ContactPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const selectedService = searchParams.get('service');
  const detalleCotizacion = searchParams.get('detalle');
  const basePreset = servicePresets[selectedService] || servicePresets['consulta-general'];
  const selectedPreset =
    selectedService === 'cotizacion' && detalleCotizacion
      ? { ...basePreset, message: detalleCotizacion }
      : basePreset;
  const seoTitleByService = {
    'landing-48h': 'Landing page en 48 hs | Contactar desarrollador web freelance en Argentina',
    'web-corporativa': 'Web corporativa para empresas | Contacto zuzudev',
    'software-empresa': 'Software para empresas | Contacto desarrollador freelance en Buenos Aires',
    'saas-mvp': 'Desarrollo SaaS y MVP web | Contacto zuzudev',
    'infra-local': 'Servidor local y bases de datos | Contacto zuzudev',
    'consulta-general': 'Contactar desarrollador web freelance en Buenos Aires | zuzudev',
  };
  const seoDescriptionByService = {
    'landing-48h': 'Pide una landing page en 48 hs desde 200 USD. Contacta a un desarrollador web freelance en Argentina con foco en conversion y negocio.',
    'web-corporativa': 'Contacta a zuzudev para desarrollar una web corporativa clara, profesional y orientada a generar consultas para tu empresa.',
    'software-empresa': 'Consulta por software para empresas, paneles internos y sistemas web desarrollados desde Buenos Aires con foco en procesos y resultados.',
    'saas-mvp': 'Habla con zuzudev sobre desarrollo SaaS, MVPs y productos web escalables pensados para validar y crecer.',
    'infra-local': 'Consulta por armado de red y servidor local para almacenamiento de bases de datos e infraestructura interna.',
    'consulta-general': 'Contacta a zuzudev para desarrollo web freelance, React, automatizacion n8n, software para empresas o una landing page en Argentina.',
  };
  const seoTitle = seoTitleByService[selectedService] || seoTitleByService['consulta-general'];
  const seoDescription = seoDescriptionByService[selectedService] || seoDescriptionByService['consulta-general'];

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      subject: current.subject || selectedPreset.subject,
      message: current.message || selectedPreset.message,
    }));
    // Depende de primitivas: selectedPreset se recrea por render cuando hay ?detalle=
  }, [selectedPreset.subject, selectedPreset.message]);

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Faltan campos',
        description: 'Completa los campos obligatorios antes de enviar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'No se pudo enviar el mensaje.');
      }

      toast({
        title: 'Mensaje enviado',
        description: result.emailSent
          ? 'Tu mensaje se guardo y se envio por email correctamente. Te respondere pronto.'
          : 'Tu mensaje se guardo correctamente. Te respondere pronto.',
      });

      setFormData({
        ...initialFormState,
        subject: selectedPreset.subject,
        message: selectedPreset.message,
      });
    } catch (error) {
      toast({
        title: 'No se pudo enviar',
        description: error.message || 'Hubo un problema al guardar tu mensaje.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://zuzudev.pro/contact" />
      </Helmet>

      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(125,211,252,0.08),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(226,232,240,0.06),transparent_20%),radial-gradient(circle_at_50%_84%,rgba(148,163,184,0.08),transparent_28%)]" />
          <div className="absolute -top-24 left-[10%] h-72 w-72 rounded-full bg-sky-300/8 blur-3xl animate-float" />
          <div className="absolute bottom-[-5rem] right-[12%] h-80 w-80 rounded-full bg-slate-200/6 blur-3xl animate-pulse-glow" />
        </div>
        <Header />

        <main className="pt-24 pb-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 mb-6">
                {selectedPreset.badge}
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="page-title-shine text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                {selectedPreset.headline}
              </motion.h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {selectedPreset.helper} Soy desarrollador web freelance en Buenos Aires y trabajo con comunicacion directa, foco real en negocio y tiempos concretos.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="liquid-glass-blue rounded-[1.75rem] p-8"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-slate-100">Enviame un mensaje</h2>
                  <Link
                    to="/projects"
                    className="text-sm text-slate-300 hover:text-slate-100 transition-colors"
                  >
                    Ver servicios
                  </Link>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="companyWebsite"
                    tabIndex="-1"
                    autoComplete="off"
                    className="hidden"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                  />

                  <div>
                    <Label htmlFor="name" className="text-slate-300 mb-2 block">
                      Nombre *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-400"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-300 mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-400"
                      placeholder="tuemail@ejemplo.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-slate-300 mb-2 block">
                      Asunto
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-400"
                      placeholder="De que se trata?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-slate-300 mb-2 block">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-400 resize-none"
                      placeholder="Contame sobre tu proyecto..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full liquid-glass-button-blue text-slate-50 transition-all duration-200 active:scale-95 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar consulta
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                <motion.div whileHover={hoverLift} className="liquid-glass-light rounded-[1.75rem] p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">Informacion de contacto</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="rounded-[1.25rem] bg-slate-900/40 p-4 border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Oferta base</div>
                      <div className="text-slate-100 font-semibold">200 USD</div>
                    </div>
                    <div className="rounded-[1.25rem] bg-slate-900/40 p-4 border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Entrega express</div>
                      <div className="text-slate-100 font-semibold">48 hs</div>
                    </div>
                    <div className="rounded-[1.25rem] bg-slate-900/40 p-4 border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Canal</div>
                      <div className="text-slate-100 font-semibold">Directo</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <Mail className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-semibold mb-1">Correo</h3>
                        <a
                          href="mailto:administracion@zuzudev.pro"
                          className="text-slate-300 hover:text-slate-100 transition-colors duration-200"
                        >
                          administracion@zuzudev.pro
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <MapPin className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-semibold mb-1">Ubicacion</h3>
                        <p className="text-slate-300">Buenos Aires, Argentina</p>
                        <p className="text-slate-400 text-sm">Disponible para proyectos remotos y colaboraciones.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <MessageCircle className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-semibold mb-1">WhatsApp</h3>
                        <a
                          href="https://wa.me/541136952045?text=Hola%20Juan%2C%20quiero%20consultarte%20por%20un%20proyecto."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-slate-100 transition-colors duration-200"
                        >
                          Hablar ahora
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={hoverLift} className="liquid-glass-blue rounded-[1.75rem] p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">Servicios que estoy tomando</h2>
                  <div className="space-y-3 text-slate-300">
                    <p>Landing pages en 48 hs para ventas y captacion.</p>
                    <p>Software para empresas, paneles y backoffice.</p>
                    <p>SaaS, MVPs y productos web orientados a negocio.</p>
                    <p>Armado de red y servidor local para almacenamiento de bases de datos.</p>
                  </div>
                </motion.div>

                <motion.div whileHover={hoverLift} className="liquid-glass-light rounded-[1.75rem] p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">Redes y canales</h2>
                  <SocialLinks />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};

export default ContactPage;
