import { useEffect } from 'react';
import { SITE } from '../config/site';

interface PageMetaProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  noIndex?: boolean;
}

const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const PageMeta = ({
  title,
  description = SITE.description,
  path = '',
  type = 'website',
  image,
  noIndex = false,
}: PageMetaProps) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.title;
    const url = `${SITE.url}${path}`;
    const ogImage = image || `${SITE.url}/favicon-512x512.png`;

    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, type, image, noIndex]);

  return null;
};

export default PageMeta;
