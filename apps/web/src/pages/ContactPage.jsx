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
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: 'Message sent',
        description: 'Thank you for reaching out. I\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Contact - Aaron Dukes</title>
        <meta name="description" content="Get in touch with Aaron Dukes for blockchain development, AI/ML projects, or collaboration opportunities." />
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                Get in <span className="text-slate-400">Touch</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Let's discuss your next blockchain or AI project
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50"
              >
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-300 mb-2 block">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-400"
                      placeholder="Your name"
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
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-slate-300 mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-400"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-slate-300 mb-2 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-slate-900 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-400 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-300 text-slate-900 hover:bg-slate-200 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
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
                <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50">
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <Mail className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:aaron@example.com"
                          className="text-slate-300 hover:text-slate-100 transition-colors duration-200"
                        >
                          aaron@example.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600/50">
                        <MapPin className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-semibold mb-1">Location</h3>
                        <p className="text-slate-300">United States</p>
                        <p className="text-slate-400 text-sm">Available for remote work worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50">
                  <h2 className="text-2xl font-bold text-slate-100 mb-6">Connect on Social</h2>
                  <SocialLinks />
                </div>

                <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50">
                  <h2 className="text-2xl font-bold text-slate-100 mb-4">Availability</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 font-medium">Open to Work</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Currently available for freelance projects, consulting opportunities, and full-time positions 
                    in blockchain development and AI/ML engineering.
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