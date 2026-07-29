import type { MetadataRoute } from 'next';
import { siteUrl } from './site';

// Required under `output: 'export'`, which the GitHub Pages workflow injects.
export const dynamic = 'force-static';

// No lastModified: the only value available at build time is the build clock,
// which would change on every deploy even when the page content did not.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/cv`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
