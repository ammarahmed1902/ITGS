import React from 'react';
import Reveal from '../components/Reveal';

const BookingPage = () => (
  <div className="pt-32 pb-24 bg-starfield min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <Reveal>
          <span className="text-electric font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Direct Access</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Schedule Your <span className="text-electric">Strategy Session.</span></h1>
          <p className="text-steel max-w-2xl mx-auto text-lg font-light">
            Select a time that works for you to discuss your global technology requirements with our experts.
          </p>
        </Reveal>
      </div>
      
      <div className="card-premium p-0 overflow-hidden min-h-[700px] relative">
        <iframe 
          src="https://calendly.com/ammarzerobyte/30min?embed_domain=ais-dev-tarxpj7axqdr6ngbufwv5f-156932409613.asia-southeast1.run.app&embed_type=Inline"
          width="100%"
          height="700"
          frameBorder="0"
          title="Calendly Scheduling"
          className="w-full h-[700px]"
        ></iframe>
      </div>
    </div>
  </div>
);

export default BookingPage;
