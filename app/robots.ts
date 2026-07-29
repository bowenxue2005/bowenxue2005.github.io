import type { MetadataRoute } from 'next';
import { siteUrl } from './site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Cloudflare rewrites mailto: links into /cdn-cgi/l/email-protection
        // when Email Address Obfuscation is on. Crawling that endpoint returns
        // 404, which Search Console reports as a "Not found" error. Nothing
        // under /cdn-cgi/ is indexable content, so keep crawlers out of it.
        disallow: '/cdn-cgi/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
