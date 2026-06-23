export async function getServerSideProps({ res }) {
  const base = process.env.NEXT_PUBLIC_URL || 'https://jamfor-elavtal-2026.vercel.app';
  const txt = 'User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ' + base + '/sitemap.xml\n';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.write(txt); res.end();
  return { props: {} };
}
export default function Robots() { return null; }