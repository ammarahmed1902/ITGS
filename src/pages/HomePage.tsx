import React from 'react';
import Hero from '../components/home/Hero';
import ServicesPreview from '../components/home/ServicesPreview';
import ResultsSection from '../components/home/ResultsSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const HomePage = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  return (
    <>
      <Hero setActivePage={setActivePage} />
      <ServicesPreview setActivePage={setActivePage} />
      <ResultsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection setActivePage={setActivePage} />
    </>
  );
};

export default HomePage;
