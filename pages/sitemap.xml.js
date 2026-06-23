export async function getServerSideProps({ res }) {
  const base = process.env.NEXT_PUBLIC_URL || 'https://jamfor-elavtal-2026.vercel.app';
  const pages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/om-oss', priority: '0.7', changefreq: 'monthly' },
    { path: '/kontakt', priority: '0.6', changefreq: 'monthly' },
    { path: '/integritetspolicy', priority: '0.4', changefreq: 'yearly' },
  ];
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    pages.map(p => '<url><loc>' + base + p.path + '</loc><lastmod>2026-06-23</lastmod><changefreq>' + p.changefreq + '</changefreq><priority>' + p.priority + '</priority></url>').join('') +
    '</urlset>';
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.write(xml); res.end();
  return { props: {} };
}
export default function Sitemap() { return null; }