import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// ❗️ IMPORTANT: Replace with your actual domain
const domain = 'https://your-domain.com';

const pages = [
  '/',
  '/home',
  '/signup',
  '/login',
  '/profile',
  '/settings',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      const urlPath = page.startsWith('/') ? page : `/${page}`;
      // Basic priority setting: homepage is highest, others are lower.
      const priority = page === '/' ? '1.00' : '0.80';
      const lastmod = new Date().toISOString().split('T')[0];

      return `
  <url>
    <loc>${`${domain}${urlPath}`}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

try {
  fs.writeFileSync(sitemapPath, sitemap.trim());
  console.log(`Sitemap generated successfully at ${sitemapPath}`);
} catch (error) {
  console.error('Error generating sitemap:', error);
}
