import React, { useEffect, useMemo } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/** Injects JSON-LD structured data for SEO (removed on unmount). */
const StructuredData = ({ data }: StructuredDataProps) => {
  const json = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = json;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [json]);

  return null;
};

export default StructuredData;
