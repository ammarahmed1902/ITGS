import {
  BrainCircuit,
  Code2,
  Headphones,
  LayoutTemplate,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Smartphone,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { servicePath } from '../../lib/siteNavigation';

export type ServiceCardTone = 'royal' | 'sky' | 'cyan';

export type ServiceCardItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  ctaLabel?: string;
  tone?: ServiceCardTone;
  onNavigate?: (id: string) => void;
};

type CatalogItem = Omit<ServiceCardItem, 'href' | 'onNavigate'>;

export const SERVICE_CARD_CATALOG: Record<string, CatalogItem> = {
  'web-development': {
    id: 'web-development', title: 'Web Development', icon: Code2, tone: 'royal',
    description: 'Fast, scalable websites and web applications engineered around usability, maintainability, and clear business goals.',
  },
  'mobile-development': {
    id: 'mobile-development', title: 'Mobile App Development', icon: Smartphone, tone: 'sky',
    description: 'High-quality mobile products designed for intuitive everyday use, strong performance, and room to evolve.',
  },
  'ui-ux-design': {
    id: 'ui-ux-design', title: 'UI/UX Design', icon: LayoutTemplate, tone: 'cyan',
    description: 'Research-informed digital experiences designed to improve usability, information clarity, interaction quality, and customer confidence.',
  },
  'graphic-design': {
    id: 'graphic-design', title: 'Graphic Design', icon: Palette, tone: 'royal',
    description: 'Consistent visual identity and communication assets created to make the business clearer, recognizable, and credible.',
  },
  'digital-marketing': {
    id: 'digital-marketing', title: 'Digital Marketing', icon: Megaphone, tone: 'sky',
    description: 'Coordinated digital campaigns designed around a defined audience, useful engagement, qualified traffic, and measurable learning.',
  },
  seo: {
    id: 'seo', title: 'Search Engine Optimization', icon: Search, tone: 'cyan',
    description: 'Technical and content-focused search work designed to improve organic visibility, useful discovery paths, and qualified traffic.',
  },
  'lead-generation': {
    id: 'lead-generation', title: 'Lead Generation', icon: Target, tone: 'royal',
    description: 'Focused acquisition systems designed to attract, qualify, and route relevant prospects into real business conversations.',
  },
  'e-commerce': {
    id: 'e-commerce', title: 'E-commerce Solutions', icon: ShoppingBag, tone: 'sky',
    description: 'Connected commerce experiences and operations designed around easier purchasing, dependable management, and sustainable growth.',
  },
  'virtual-assistance': {
    id: 'virtual-assistance', title: 'Virtual Assistance', icon: Headphones, tone: 'cyan',
    description: 'Structured administrative and operational support organized around clear workflows, responsibilities, communication, and appropriate access.',
  },
};

/** Example for the next service registration. Add its route before merging it into the live catalog. */
export const FUTURE_SERVICE_CARD_EXAMPLES: Record<string, CatalogItem> = {
  'ai-solutions': {
    id: 'ai-solutions', title: 'AI Solutions', icon: BrainCircuit, tone: 'royal',
    description: 'Responsible AI-enabled systems designed to improve workflows, support decisions, and create useful new digital capabilities.',
  },
};

export function serviceCardItem(
  id: string,
  options: Partial<Omit<ServiceCardItem, 'id' | 'href'>> & { onNavigate?: (id: string) => void } = {},
): ServiceCardItem {
  const base = SERVICE_CARD_CATALOG[id];
  if (!base) throw new Error(`Unknown service card: ${id}`);
  return { ...base, ...options, id, href: servicePath(id) };
}

export const serviceCardItems = (ids: string[], onNavigate?: (id: string) => void) =>
  ids.map((id) => serviceCardItem(id, { onNavigate }));
