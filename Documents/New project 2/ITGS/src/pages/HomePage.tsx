import React from 'react';
import Hero from '../components/home/Hero';
import ServicesPreview from '../components/home/ServicesPreview';
import ResultsSection from '../components/home/ResultsSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import PageMeta from '../components/PageMeta';
import { ROUTES } from '../config/site';

const HomePage = () => (
  <>
    <PageMeta
      title="Digital Marketing, Web Development & eCommerce Agency"
      description="Integrate Technical and General Solutions (ITGS) delivers enterprise SEO, web development, app development, and eCommerce growth. Get a free strategy call."
      path={ROUTES.home}
    />
    <Hero />
    <ServicesPreview />
    <ResultsSection />
    <WhyChooseSection />
    <TestimonialsSection />
    <CTASection />
  </>
);

export default HomePage;
