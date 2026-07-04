import React, { useState } from 'react';
import Reveal from '../components/Reveal';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import { SITE, ROUTES } from '../config/site';

const BookingPage = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const calendlySrc = `${SITE.calendlyUrl}?embed_type=Inline`;

  return (
    <>
      <PageMeta title="Schedule a Strategy Session" description="Book a consultation with ITGS technology experts." path={ROUTES.booking} />
      <div className="pt-32 pb-24 bg-starfield min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Direct Access"
            title={<>Schedule Your <span className="text-electric">Strategy Session</span></>}
            description="Select a time that works for you to discuss your global technology requirements with our experts."
          />
          <Reveal>
            <div className="card-premium p-0 overflow-hidden relative min-h-[500px] md:min-h-[650px]">
              {!iframeLoaded && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center bg-starfield" role="status" aria-label="Loading calendar">
                  <div className="w-10 h-10 border-4 border-electric border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {iframeError ? (
                <div className="p-12 text-center">
                  <p className="text-steel mb-6">Unable to load the scheduling calendar.</p>
                  <a href={SITE.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 inline-flex">
                    Open Calendly
                  </a>
                </div>
              ) : (
                <iframe
                  src={calendlySrc}
                  title="Schedule a meeting with ITGS"
                  className="w-full min-h-[500px] md:min-h-[650px] border-0"
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => setIframeError(true)}
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
