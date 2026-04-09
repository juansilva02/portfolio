import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SocialLinks from '@/components/SocialLinks.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Faltan campos',
        description: 'Completá los campos obligatorios antes de enviar.',
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
        description: 'Tu mensaje se guardó correctamente. Te responderé pronto.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
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
        <title>Contacto | zuzudev</title>
        <meta name="description" content="Contactá a zuzudev para proyectos de desarrollo web, UI y automatización. Ubicado en Buenos Aires, Argentina." />
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
              <motion.h1
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="page-title-shine text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance"
                style={{ letterSpacing: '-0.02em' }}
              >
                Pongamos tu proyecto en <span className="text-slate-400">marcha</span>
              </motion.h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Si tenés una idea, una marca o un negocio que necesita una mejor presencia digital, escribime y lo conversamos.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="liquid-glass-blue rounded-[1.75rem] p-8"
              >
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Enviame un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="De qué se trata?"
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
                        Enviar mensaje
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
                <div className="liquid-glass-light rounded-[1.75rem] p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">Información de contacto</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <Mail className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-semibold mb-1">Correo</h3>
                        <a
                          href="mailto:juanbautistasilva02@gmail.com"
                          className="text-slate-300 hover:text-slate-100 transition-colors duration-200"
                        >
                          juanbautistasilva02@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <MapPin className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-semibold mb-1">Ubicación</h3>
                        <p className="text-slate-300">Buenos Aires, Argentina</p>
                        <p className="text-slate-400 text-sm">Disponible para proyectos remotos y colaboraciones.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="liquid-glass-blue rounded-[1.75rem] p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">Redes y canales</h2>
                  <SocialLinks />
                </div>

                <div className="liquid-glass-light rounded-[1.75rem] p-8">
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">Disponibilidad</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 font-medium">Disponible para trabajar</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Actualmente disponible para proyectos freelance, colaboraciones con equipos y desarrollo de soluciones web con foco en UI, performance y automatización.
                  </p>
                </div>
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
