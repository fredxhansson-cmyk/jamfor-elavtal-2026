import Head from 'next/head';
import Link from 'next/link';
export default function Integritetspolicy() {
  const pc = '#FFC300';
  return (
    <>
      <Head>
        <title>Integritetspolicy — JamforElavtal2026</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
      </Head>
      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px', height:60, display:'flex', alignItems:'center', fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>JamforElavtal2026</Link>
      </nav>
      <main style={{ maxWidth:760, margin:'0 auto', padding:'52px 20px', lineHeight:1.82, color:'#374151', fontFamily:'Inter,sans-serif' }}>
        <h1 style={{ fontSize:32, fontWeight:800, marginBottom:8, color:'#0f172a' }}>Integritetspolicy</h1>
        <p style={{ color:'#64748b', marginBottom:36, fontSize:14 }}>Senast uppdaterad: 23 juni 2026</p>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:10, color:'#0f172a' }}>Personuppgifter</h2>
        <p style={{ marginBottom:20, fontSize:15 }}>Vi samlar inte in personuppgifter utan ditt samtycke. Vi använder cookies för att förbättra upplevelsen och spåra affiliate-klick via Adtraction.</p>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:10, marginTop:32, color:'#0f172a' }}>Cookies</h2>
        <p style={{ marginBottom:20, fontSize:15 }}>Vi använder nödvändiga cookies för att sajten ska fungera samt analytiska cookies (Google Analytics). Affiliate-cookies placeras av Adtraction när du klickar på produktlänkar. Du kan när som helst radera cookies i dina webbläsarinställningar.</p>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:10, marginTop:32, color:'#0f172a' }}>Dina rättigheter</h2>
        <p style={{ marginBottom:20, fontSize:15 }}>Enligt GDPR har du rätt att begära ut, rätta eller radera personuppgifter vi eventuellt behandlar. Kontakta oss så hjälper vi dig.</p>
        <h2 style={{ fontSize:20, fontWeight:700, marginBottom:10, marginTop:32, color:'#0f172a' }}>Kontakt</h2>
        <p style={{ fontSize:15 }}>Frågor? <Link href="/kontakt" style={{ color:pc }}>Kontakta oss</Link>.</p>
      </main>
    </>
  );
}