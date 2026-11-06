import type { MetadataRoute } from 'next';
import { projects } from '@/data/portfolio';
const base = process.env.NEXT_PUBLIC_SITE_URL;
export default function sitemap(): MetadataRoute.Sitemap {
  if (!base) return [];
  return [{ url: base, changeFrequency: 'monthly', priority: 1 }, ...projects.map(project => ({ url: `${base}/projetos/${project.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 }))];
}
