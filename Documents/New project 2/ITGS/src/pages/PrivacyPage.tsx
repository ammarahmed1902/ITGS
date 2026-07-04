import React from 'react';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { ROUTES } from '../config/site';

const PrivacyPage = () => (
  <>
    <PageMeta title="Privacy Policy" description="How ITGS collects, uses, and protects your personal information." path={ROUTES.privacy} />
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: June 2026" />
        <div className="card-premium prose prose-steel max-w-none space-y-6 text-steel leading-relaxed">
          <section><h2 className="text-xl font-bold text-midnight mb-3">Information We Collect</h2><p>We collect information you provide directly, including name, email, phone number, and messages submitted through our contact and careers forms.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">How We Use Information</h2><p>We use your information to respond to inquiries, process job applications, improve our services, and communicate about ITGS offerings.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">Cookies</h2><p>We use essential cookies to remember your cookie consent preference. Analytics cookies are only activated if you accept all cookies.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">Data Security</h2><p>We implement industry-standard security measures including encrypted transport, access controls, and secure storage for submitted data.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">Contact</h2><p>For privacy inquiries, email contact@itgs.global.</p></section>
        </div>
      </div>
    </div>
  </>
);

export default PrivacyPage;
