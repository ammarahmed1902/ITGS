import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Reveal from '../components/Reveal';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (form.honeypot) {
      setStatus('success');
      return;
    }

    // Validation
    if (!form.name || !form.email || !form.message) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err) {
      setErrorMessage('Failed to send message. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Let's Build the <span className="text-electric">Future</span> Together.</h1>
            <p className="text-steel max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Have a project in mind or want to learn more about our global technology solutions? We're here to help you scale.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-premium p-8 flex items-start gap-6">
              <div className="w-14 h-14 bg-electric/10 rounded-2xl flex items-center justify-center text-electric shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-steel mb-1">General Inquiries: contact@itgs.global</p>
                <p className="text-steel">Support: support@itgs.global</p>
              </div>
            </div>

            <div className="card-premium p-8 flex items-start gap-6">
              <div className="w-14 h-14 bg-electric/10 rounded-2xl flex items-center justify-center text-electric shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-steel mb-1">Global HQ: +1 (800) ITGS-TECH</p>
                <p className="text-steel">Enterprise Sales: +1 (800) ITGS-SALES</p>
              </div>
            </div>

            <div className="card-premium p-8 flex items-start gap-6">
              <div className="w-14 h-14 bg-electric/10 rounded-2xl flex items-center justify-center text-electric shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Our HQ</h3>
                <p className="text-steel leading-relaxed">
                  100 Innovation Way<br />
                  Silicon Valley, CA 94025<br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-premium p-10">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className="text-steel mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="btn-primary px-10 py-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input 
                    type="text" 
                    tabIndex={-1} 
                    autoComplete="off" 
                    value={form.honeypot} 
                    onChange={(e) => setForm({...form, honeypot: e.target.value})} 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-steel block">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-steel block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-steel block">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-steel block">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-starfield border border-midnight/5 rounded-xl px-5 py-4 focus:border-electric outline-none transition-all resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    <AlertCircle size={18} />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg"
                >
                  {status === 'submitting' ? (
                    <>
                      Sending Message...
                      <Loader2 size={20} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
