export const SITE = {
  name: 'ITGS',
  title: 'ITGS | Global Technology Authority',
  description:
    'Premium psychology-driven technology solutions for global enterprise scale. Digital marketing, SEO, web development, and more.',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://itgs.global',
  email: 'contact@itgs.global',
  supportEmail: 'support@itgs.global',
  phone: '+1 (800) ITGS-TECH',
  salesPhone: '+1 (800) ITGS-SALES',
  address: {
    line1: '100 Innovation Way',
    city: 'Silicon Valley, CA 94025',
    country: 'United States',
  },
  social: {
    website: 'https://itgs.global',
    linkedin: 'https://linkedin.com/company/itgs',
  },
  calendlyUrl:
    import.meta.env.VITE_CALENDLY_URL ||
    'https://calendly.com/ammarzerobyte/30min',
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  service: (id: string) => `/services/${id}`,
  blog: '/blog',
  blogPost: (id: string) => `/blog/${id}`,
  careers: '/careers',
  job: (id: string) => `/careers/${id}`,
  jobApply: (id: string) => `/careers/${id}/apply`,
  reviews: '/reviews',
  team: '/team',
  booking: '/booking',
  contact: '/contact',
  admin: '/admin',
  privacy: '/privacy',
  terms: '/terms',
} as const;
