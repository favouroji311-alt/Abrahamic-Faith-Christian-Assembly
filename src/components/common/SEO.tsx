import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const DEFAULT_TITLE = 'AFCA – Abrahamic Faith Christian Assembly | Authentic Faith';
const DEFAULT_DESC =
  'Experience authentic worship, transformative sermons, and vibrant community at Abrahamic Faith Christian Assembly (AFCA). Join our worship family today!';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1200&h=630&q=80';
const BASE_URL = 'https://afca.studio';

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  url,
  image = DEFAULT_IMAGE,
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    updateMeta('description', description);

    // 3. Open Graph Tags
    const fullUrl = url ? (url.startsWith('http') ? url : `${BASE_URL}${url}`) : window.location.href;
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:image', image, true);
    updateMeta('og:type', type, true);

    // 4. Twitter Tags
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [title, description, url, image, type]);

  return null;
}
