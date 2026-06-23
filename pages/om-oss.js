import Head from 'next/head';
import Link from 'next/link';
export default function OmOss() {
  const pc = '#FFC300';
  return (
    <>
      <Head>
        <title>Om oss — JamforElavtal2026</title>
        <meta name="description" content="Lär dig om vår redaktionspolicy, hur vi granskar leverantörer och hur vår affiliatemarknadsföring fungerar." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      </Head>
      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>JamforElavtal2026</Link>
        <Link href="/" style={{ fontSize:14, color:'#64748b', textDecoration:'none' }}>← Tillbaka till jämförelsen</Link>
      </nav>
      <main style={{ maxWidth:760, margin:'0 auto', padding:'56px 20px', lineHeight:1.8, color:'#374151', fontFamily:'Inter,sans-serif' }}>
        <h1 style={{ fontSize:38, fontWeight:800, marginBottom:8, color:'#0f172a' }}>Om JamforElavtal2026</h1>
        <p style={{ fontSize:17, color:'#64748b', marginBottom:40 }}>Vi är en oberoende jämförelsetjänst som hjälper svenska konsumenter hitta de bästa alternativen inom el.</p>
        <h2 style={{ fontSize:22, fontWeight:700, marginBottom:12, color:'#0f172a' }}>Vad gör vi?</h2>
        <p style={{ marginBottom:20, fontSize:15 }}>JamforElavtal2026 är en SEO-driven jämförelsesajt som samlar och presenterar information om leverantörer inom el. Vi rangordnar och betygsätter baserat på pris, villkor, kundservice och användarrecensioner. Vår trafikkälla är organisk söktrafik via Google och Bing.</p>
        <h2 style={{ fontSize:22, fontWeight:700, marginBottom:12, marginTop:40, color:'#0f172a' }}>Redaktionspolicy</h2>
        <p style={{ marginBottom:16, fontSize:15 }}>Alla jämförelser och betyg baseras på noggrann research och analys av pris, villkor, kundservice och användarrecensioner. Vår redaktion är oberoende — kommersiella hänsyn påverkar aldrig rankingen. Vi uppdaterar vår data regelbundet för att säkerställa att informationen stämmer.</p>
        <h2 style={{ fontSize:22, fontWeight:700, marginBottom:12, marginTop:40, color:'#0f172a' }}>Affiliateinformation</h2>
        <p style={{ marginBottom:16, fontSize:15 }}>Vi samarbetar med leverantörer via Adtraction Sverige. Vi kan ta emot provision när du väljer en tjänst via våra länkar. Provisionen påverkar aldrig priset för dig och påverkar inte våra oberoende betyg. Kanaltyp: webbplats med organisk söktrafik (SEO).</p>
        <h2 style={{ fontSize:22, fontWeight:700, marginBottom:12, marginTop:40, color:'#0f172a' }}>Kontakt</h2>
        <p style={{ fontSize:15 }}>Frågor om vår redaktionspolicy eller innehåll? <Link href="/kontakt" style={{ color:pc, fontWeight:600 }}>Kontakta oss här</Link>.</p>
      </main>
    </>
  );
}