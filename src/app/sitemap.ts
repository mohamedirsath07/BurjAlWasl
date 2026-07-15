import { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';
import { insightsData } from '@/data/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://studiox.ae';

  // Core routes
  const routes = ['', '/work', '/services', '/agency', '/insights', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Dynamic portfolio routes
  const portfolioRoutes = portfolioData.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic insight routes
  const insightRoutes = insightsData.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...portfolioRoutes, ...insightRoutes];
}
