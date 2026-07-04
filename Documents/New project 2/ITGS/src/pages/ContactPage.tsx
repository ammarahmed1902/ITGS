import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import StatusMessage from '../components/StatusMessage';
import { submitContactForm } from '../api/contact';
import { isValidEmail } from '../utils/validation';
import { SITE, ROUTES } from '../config/site';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) { setStatus('success'); return; }
    if (!form.name || !form.email || !form.message) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }
    if (!isValidEmail(form.email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      await submitContactForm({ name: form.name, email: form.email, subject: form.subject, message: form.message, honeypot: form.honeypot });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <>
      <PageMeta title="Contact Us" description="Get in touch with ITGS for enterprise technology solutions." path={ROUTES.contact} />
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Get in Touch"
            title={<>Let&apos;s Build the <span className="text-electric">Future</span> Together</>}
            description="Have a project in mind or want to learn more about our global technology solutions?"
          />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'Email Us', lines: [`General: ${SITE.email}`, `Support: ${SITE.supportEmail}`] },
                { icon: Phone, title: 'Call Us', lines: [`Global HQ: ${SITE.phone}`, `Enterprise Sales: ${SITE.salesPhone}`] },
                { icon: MapPin, title: 'Our HQ', lines: [SITE.address.line1, `${SITE.address.city}, ${SITE.address.country}`] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="card-premium flex items-start gap-5">
                  <div className="w-14 h-14 bg-electric/10 rounded-2xl flex items-center justify-center text-electric shrink-0">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    {lines.map((line) => <p key={line} className="text-steel">{line}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="card-premium">
              {status === 'success' ? (
                <div className="text-center py-10" role="status">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                    <CheckCircle size={48} aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-steel mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn-primary px-10 py-4">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="hidden" aria-hidden="true">
                    <input type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Your Name *</label>
                      <input id="contact-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Email Address *</label>
                      <input id="contact-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Subject</label>
                    <input id="contact-subject" type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-steel mb-2 block">Message *</label>
                    <textarea id="contact-message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" placeholder="Tell us about your project..." />
                  </div>
                  {status === 'error' && <StatusMessage variant="error" message={errorMessage} />}
                  <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg">
                    {status === 'submitting' ? (<><Loader2 size={20} className="animate-spin" aria-hidden="true" /> Sending...</>) : (<><Send size={20} aria-hidden="true" /> Send Message</>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
