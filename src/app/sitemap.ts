import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { portfolioData } from '@/data/portfolio';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/portfolio', '/services', '/contact', '/consultation'].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  const portfolioRoutes = portfolioData.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...serviceRoutes, ...portfolioRoutes];
}
