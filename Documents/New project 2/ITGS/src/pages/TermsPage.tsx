import React from 'react';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { ROUTES } from '../config/site';

const TermsPage = () => (
  <>
    <PageMeta title="Terms of Service" description="Terms and conditions for using ITGS services and website." path={ROUTES.terms} />
    <div className="pt-32 pb-24 bg-starfield min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated: June 2026" />
        <div className="card-premium space-y-6 text-steel leading-relaxed">
          <section><h2 className="text-xl font-bold text-midnight mb-3">Acceptance of Terms</h2><p>By accessing the ITGS website and services, you agree to these Terms of Service and our Privacy Policy.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">Services</h2><p>ITGS provides technology consulting, development, and marketing services. Specific deliverables are defined in individual client agreements.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">Intellectual Property</h2><p>All content on this website, including text, graphics, and logos, is the property of ITGS Global unless otherwise stated.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">Limitation of Liability</h2><p>ITGS shall not be liable for indirect, incidental, or consequential damages arising from use of this website or our services.</p></section>
          <section><h2 className="text-xl font-bold text-midnight mb-3">Contact</h2><p>Questions about these terms may be directed to contact@itgs.global.</p></section>
        </div>
      </div>
    </div>
  </>
);

export default TermsPage;
