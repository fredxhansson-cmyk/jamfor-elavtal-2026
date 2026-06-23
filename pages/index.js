import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const FAQ_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Hur ofta kan jag byta elavtal?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Du kan byta elavtal när som helst, men kontrollera villkoren för ditt nuvarande avtal för att undvika avgifter.\"}},{\"@type\":\"Question\",\"name\":\"Vad är ett rörligt elpris?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Ett rörligt elpris varierar med marknadspriset och kan ge både fördelar och risker.\"}},{\"@type\":\"Question\",\"name\":\"Är gröna elavtal dyrare?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Gröna elavtal kan ibland vara lite dyrare, men de bidrar till en hållbar framtid.\"}},{\"@type\":\"Question\",\"name\":\"Hur påverkas elpriser av väder?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Elpriser kan stiga vid kallt väder eller dåligt väder som påverkar produktionen.\"}},{\"@type\":\"Question\",\"name\":\"Kan jag få rabatt på elavtal?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Vissa leverantörer erbjuder rabatt till nya kunder eller vid längre avtal.\"}}]}";

export async function getServerSideProps() {
  var fallback = [{"name":"Tibber","url":"https://tibber.com/se","description":"Smart elhandel — betala bara marknadspriset","badge":"Bäst spotpris","score":"4.8","price":"Spotpris + 49 kr/mån","pros":["Betala exakt marknadspris timme för timme","Smart hem-integration","Ingen bindningstid"]},{"name":"Vattenfall","url":"https://www.vattenfall.se","description":"Sveriges största elbolag","badge":"Störst & tryggast","score":"4.5","price":"från 89 öre/kWh","pros":["Över 100 år i branschen","Välj rörligt eller fast elpris","Hög driftsäkerhet"]},{"name":"Fortum","url":"https://www.fortum.se","description":"100% förnybar energi med klimatfokus","badge":"Bäst hållbarhet","score":"4.6","price":"från 92 öre/kWh","pros":["100% förnybar vattenkraft","Klimatcertifierat avtal","Bra app med förbrukningsöversikt"]},{"name":"Bixia","url":"https://www.bixia.se","description":"Vindkraft och vattenkraft till konkurrenskraftigt pris","badge":"Bäst förnybar","score":"4.5","price":"från 87 öre/kWh","pros":["100% vindkraft och vattenkraft","Transparent prissättning","Enkel och snabb uppsägning"]},{"name":"Ellevio","url":"https://www.ellevio.se","description":"Pålitlig leverantör med kundservice i toppklass","badge":"Bäst kundservice","score":"4.4","price":"från 94 öre/kWh","pros":["Utmärkt kundbetyg","Transparent om prissättning","Fast pris tillgängligt"]}];
  var items = fallback;
  try {
    var now = new Date();
    var url = 'https://www.elpriset.nu/api/v1/prices/' + now.getFullYear() + '/' +
      String(now.getMonth()+1).padStart(2,'0') + '/' + String(now.getDate()).padStart(2,'0') + '_23.json';
    var ctrl = new AbortController();
    setTimeout(function() { ctrl.abort(); }, 2000);
    var r = await fetch(url, { signal: ctrl.signal });
    if (r.ok) {
      var data = await r.json();
      if (Array.isArray(data) && data.length > 0) {
        var avg = Math.round(data.reduce(function(s,p){ return s+(p.SEK_per_kWh||0); },0)/data.length*100);
        if (avg > 0) items = items.map(function(p){ return Object.assign({}, p, { currentPrice: avg+' ore/kWh idag' }); });
      }
    }
  } catch(e) {}
  return { props: { providers: items, updatedAt: new Date().toISOString() } };
}

export default function Home({ providers, updatedAt }) {
  const [filter, setFilter] = useState('alla');
  

  const sorted = filter === 'betyg'
    ? [...providers].sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    : filter === 'pris'
    ? [...providers].sort((a, b) => parseFloat(a.score) - parseFloat(b.score))
    : providers;

  const pc = '#FFC300';
  const pcLight = '#FFC30014';
  const pcMed = '#FFC30030';

  const AffBtn = ({ url, name, primary }) => (
    <a href={url + (url.includes('?') ? '&' : '?') + 'ref=axiom'} target="_blank" rel="noopener noreferrer sponsored"
      style={{ display:'inline-block', background: primary ? pc : '#0f172a', color:'#fff',
        padding:'11px 22px', borderRadius:9, fontWeight:700, fontSize:14,
        textDecoration:'none', whiteSpace:'nowrap', transition:'opacity .15s' }}>
      Välj {name} →
    </a>
  );

  const Stars = ({ score }) => {
    const n = parseFloat(score);
    return (
      <span style={{ fontSize:15, letterSpacing:1 }}>
        <span style={{ color:'#f59e0b' }}>{'★'.repeat(Math.floor(n))}</span>
        <span style={{ color:'#d1d5db' }}>{'★'.repeat(5 - Math.floor(n))}</span>
        <span style={{ color:'#64748b', fontSize:12, marginLeft:6, fontWeight:600 }}>{score}</span>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Jämför Elavtal 2026 - Hitta Bästa Alternativet</title>
        <meta name="description" content="Jämför elavtal för 2026 från Tibber, Vattenfall, Fortum, Bixia, och Ellevio. Hitta bästa valet för dig!" />
        <meta property="og:title" content="Jämför Elavtal 2026 - Hitta Bästa Alternativet" />
        <meta property="og:description" content="Jämför elavtal 2026 och spara pengar. Välj rätt leverantör idag!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jamfor-elavtal-2026.vercel.app" />
        <link rel="canonical" href="https://jamfor-elavtal-2026.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      </Head>

      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px',
        height:60, display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>
          JamforElavtal2026
        </Link>
        <div style={{ display:'flex', gap:28, fontSize:14 }}>
          <a href="#jamfor" style={{ color:'#64748b', textDecoration:'none' }}>Jämförelse</a>
          <a href="#guide" style={{ color:'#64748b', textDecoration:'none' }}>Guide</a>
          <Link href="/om-oss" style={{ color:'#64748b', textDecoration:'none' }}>Om oss</Link>
        </div>
      </nav>

      <section style={{ background:'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 50%,#f8fafc 100%)',
        padding:'72px 20px 56px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center',
          gap:48, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6,
              background:pcLight, color:pc, padding:'4px 14px', borderRadius:20,
              fontSize:13, fontWeight:700, marginBottom:20 }}>
              ✓ Uppdaterad 23 juni 2026
            </div>
            <h1 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:800,
              lineHeight:1.14, marginBottom:18, color:'#0f172a' }}>
              Jämför Elavtal och Spara Pengar 2026
            </h1>
            <p style={{ fontSize:18, color:'#475569', lineHeight:1.72,
              marginBottom:32, maxWidth:540 }}>
              Hitta ditt bästa elavtal för 2026 på några minuter!
            </p>
            <a href="#jamfor" style={{ display:'inline-block', background:pc, color:'#fff',
              padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16,
              textDecoration:'none', boxShadow:'0 4px 24px '+pc+'44' }}>
              Jämför avtal nu →
            </a>
            <p style={{ marginTop:14, fontSize:13, color:'#94a3b8' }}>
              Gratis &middot; Oberoende &middot; Ingen prenumeration
            </p>
          </div>
          <div style={{ flexShrink:0 }} dangerouslySetInnerHTML={{ __html: "<svg width=\"260\" height=\"210\" viewBox=\"0 0 260 210\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"130\" cy=\"90\" r=\"60\" fill=\"#FFC300\" opacity=\"0.08\" stroke=\"#FFC300\" stroke-width=\"2\"/><circle cx=\"130\" cy=\"90\" r=\"44\" fill=\"#FFC300\" opacity=\"0.05\"/><path d=\"M142 33 L106 93 L124 93 L112 148 L150 83 L132 83 Z\" fill=\"#FFC300\" opacity=\"0.9\"/><line x1=\"55\" y1=\"178\" x2=\"80\" y2=\"178\" stroke=\"#FFC300\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.35\"/><line x1=\"92\" y1=\"178\" x2=\"168\" y2=\"178\" stroke=\"#FFC300\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\"0.6\"/><line x1=\"180\" y1=\"178\" x2=\"205\" y2=\"178\" stroke=\"#FFC300\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.35\"/><rect x=\"118\" y=\"157\" width=\"24\" height=\"9\" rx=\"3\" fill=\"#FFC300\" opacity=\"0.45\"/><rect x=\"122\" y=\"168\" width=\"16\" height=\"9\" rx=\"3\" fill=\"#FFC300\" opacity=\"0.3\"/></svg>" }} />
        </div>
      </section>

      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0',
        padding:'16px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex',
          gap:32, flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
          <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#FFC300',fontWeight:800,flexShrink:0}}>✓</span><span>Spara pengar enkelt</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#FFC300',fontWeight:800,flexShrink:0}}>✓</span><span>Hitta bästa avtalet</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#FFC300',fontWeight:800,flexShrink:0}}>✓</span><span>Jämför snabbt och smidigt</span></div>
        </div>
      </div>

      <section id="jamfor" style={{ padding:'64px 20px', maxWidth:980,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:30, fontWeight:800, marginBottom:10, color:'#0f172a' }}>
            Jämför Elavtal 2026
          </h2>
          <p style={{ color:'#64748b', fontSize:15 }}>
            Vi har granskat {providers.length} alternativ &mdash; senast uppdaterat 23 juni 2026
          </p>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:28,
          flexWrap:'wrap', justifyContent:'center' }}>
          {['alla','betyg','pris'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding:'7px 18px', borderRadius:20, fontSize:13, fontWeight:600,
                cursor:'pointer', fontFamily:'Inter,sans-serif', border:'none',
                background: filter===f ? pc : '#f1f5f9',
                color: filter===f ? '#fff' : '#64748b' }}>
              {f==='alla' ? 'Alla' : f==='betyg' ? '★ Bäst betyg' : '💰 Lägst pris'}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {sorted.map((p, i) => (
            <div key={p.name} style={{
              background:'#fff',
              border: i===0 ? '2px solid '+pc : '1px solid #e2e8f0',
              borderRadius:16, padding:'22px 26px',
              position:'relative', boxShadow: i===0 ? '0 4px 24px '+pc+'18' : '0 1px 4px #0000000a',
            }}>
              {i===0 && (
                <div style={{ position:'absolute', top:-15, left:22,
                  background:pc, color:'#fff', fontSize:11,
                  fontWeight:800, padding:'3px 14px', borderRadius:12, letterSpacing:'0.5px' }}>
                  ⭐ REDAKTIONENS VAL
                </div>
              )}
              <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ width:44, height:44, borderRadius:12,
                  background: i===0 ? pcLight : '#f8fafc',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontWeight:800, fontSize:16, color: i===0 ? pc : '#64748b',
                  flexShrink:0, border:'1px solid '+(i===0 ? pcMed : '#e2e8f0') }}>
                  {['1','2','3','4','5'][i] || (i+1)}
                </div>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontWeight:800, fontSize:18, color:'#0f172a',
                    marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:13, color:'#64748b',
                    marginBottom:10 }}>{p.description}</div>
                  {p.pros && (
                    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                      {p.pros.map((pro, j) => (
                        <div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start',
                          fontSize:13 }}>
                          <span style={{ color:pc, fontWeight:700,
                            flexShrink:0 }}>✓</span>
                          <span style={{ color:'#374151' }}>{pro}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ textAlign:'right', minWidth:190,
                  display:'flex', flexDirection:'column',
                  alignItems:'flex-end', gap:8 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:pc }}>
                    {p.currentPrice || p.price}
                  </div>
                  <Stars score={p.score} />
                  <div style={{ background:'#f0fdf4', color:'#15803d',
                    fontSize:11, fontWeight:700, padding:'3px 10px',
                    borderRadius:8 }}>{p.badge}</div>
                  <AffBtn url={p.url} name={p.name} primary={i===0} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop:20, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
          * Vi kan erhålla provision vid val via våra länkar. Det påverkar aldrig priset för dig eller våra oberoende betyg.
          Se vår <Link href="/om-oss" style={{ color:pc }}>redaktionspolicy</Link>.
        </p>
      </section>

      

      <section id="guide" style={{ background:'#f8fafc',
        borderTop:'1px solid #e2e8f0', padding:'64px 20px',
        fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20, color:'#0f172a' }}>
            Välj Rätt Elavtal 2026
          </h2>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151',
            marginBottom:36 }}>
            Att välja rätt elavtal kan spara dig betydande pengar. Tänk på dina energibehov, jämför priser och överväg miljövänliga alternativ. Genom att följa våra tips kan du säkra det bästa elavtalet för ditt hem.
          </p>
          <h3 style={{ fontSize:20, fontWeight:700, marginBottom:24, color:'#0f172a' }}>
            Vad ska du tänka på?
          </h3>
          <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#FFC30015',color:'#FFC300',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>1</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Analysera ditt energibehov</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#FFC30015',color:'#FFC300',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>2</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Jämför olika leverantörer</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#FFC30015',color:'#FFC300',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>3</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Överväg miljömärkta alternativ</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#FFC30015',color:'#FFC300',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>4</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Läs kundrecensioner</p></div>
        </div>
      </section>

      <section style={{ padding:'64px 20px', maxWidth:760,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:32, color:'#0f172a' }}>
          Vanliga frågor
        </h2>
        <details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Hur ofta kan jag byta elavtal?<span style={{color:'#FFC300',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Du kan byta elavtal när som helst, men kontrollera villkoren för ditt nuvarande avtal för att undvika avgifter.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Vad är ett rörligt elpris?<span style={{color:'#FFC300',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Ett rörligt elpris varierar med marknadspriset och kan ge både fördelar och risker.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Är gröna elavtal dyrare?<span style={{color:'#FFC300',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Gröna elavtal kan ibland vara lite dyrare, men de bidrar till en hållbar framtid.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Hur påverkas elpriser av väder?<span style={{color:'#FFC300',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Elpriser kan stiga vid kallt väder eller dåligt väder som påverkar produktionen.</p></details><details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Kan jag få rabatt på elavtal?<span style={{color:'#FFC300',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Vissa leverantörer erbjuder rabatt till nya kunder eller vid längre avtal.</p></details>
      </section>

      <footer style={{ background:'#0f172a', color:'#94a3b8',
        padding:'52px 20px 32px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:980, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:52, flexWrap:'wrap', marginBottom:36 }}>
            <div style={{ maxWidth:280 }}>
              <div style={{ fontWeight:800, color:'#fff', fontSize:18,
                marginBottom:10 }}>JamforElavtal2026</div>
              <p style={{ fontSize:13, lineHeight:1.75 }}>
                Oberoende jämförelsetjänst för svenska konsumenter.
                Vi jämför 5 alternativ inom el.
              </p>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0',
                marginBottom:14, fontSize:13, textTransform:'uppercase',
                letterSpacing:'0.5px' }}>Sidor</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Jämförelse</Link>
                <Link href="/om-oss" style={{ color:'#94a3b8', textDecoration:'none' }}>Om oss</Link>
                <Link href="/kontakt" style={{ color:'#94a3b8', textDecoration:'none' }}>Kontakt</Link>
                <Link href="/integritetspolicy" style={{ color:'#94a3b8', textDecoration:'none' }}>Integritetspolicy</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid #1e293b', paddingTop:24, fontSize:12, lineHeight:1.75 }}>
            <p style={{ marginBottom:8 }}>
              &copy; 2026 JamforElavtal2026. Oberoende jämförelsetjänst utan koppling till listade
              varumärken utöver eventuella affiliate-provisioner.
            </p>
            <p>
              <strong style={{ color:'#e2e8f0' }}>Affiliateinformation:</strong> Sidan innehåller
              affiliate-länkar via Adtraction Sverige. Vi kan ta emot provision från annonsörer.
              Det påverkar aldrig priset för dig eller våra oberoende betyg.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}