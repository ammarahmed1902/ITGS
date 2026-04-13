import React from 'react';

export interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  overview: string;
  process: { step: string; desc: string }[];
  features: string[];
  results: string;
  tools: string[];
}
