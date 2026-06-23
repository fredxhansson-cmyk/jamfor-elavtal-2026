import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
export default function Kontakt() {
  const pc = '#FFC300';
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');
  const [err, setErr] = useState('');
  const send = async () => {
    if (!form.name||!form.email||!form.message) { setErr('Fyll i alla fält.'); setStatus('error'); return; }
    setStatus('sending'); setErr('');
    try {
      const r = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Serverfel');
      setStatus('sent');
    } catch(e) { setErr(e.message); setStatus('error'); }
  };
  const inp = { width:'100%', padding:'11px 14px', border:'1px solid #e2e8f0', borderRadius:8, fontSize:14, fontFamily:'Inter,sans-serif', outline:'none', boxSizing:'border-box' };
  return (
    <>
      <Head>
        <title>Kontakt — JamforElavtal2026</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      </Head>
      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>JamforElavtal2026</Link>
        <Link href="/" style={{ fontSize:14, color:'#64748b', textDecoration:'none' }}>← Tillbaka</Link>
      </nav>
      <main style={{ maxWidth:540, margin:'64px auto', padding:'0 20px', fontFamily:'Inter,sans-serif' }}>
        <h1 style={{ fontSize:34, fontWeight:800, marginBottom:6, color:'#0f172a' }}>Kontakta oss</h1>
        <p style={{ color:'#64748b', marginBottom:36, fontSize:15 }}>Vi svarar inom 1–2 arbetsdagar.</p>
        {status==='sent' ? (
          <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:14, padding:36, textAlign:'center' }}>
            <div style={{ fontSize:44, marginBottom:14 }}>✅</div>
            <p style={{ fontWeight:700, color:'#15803d', fontSize:17 }}>Tack! Vi hör av oss snart.</p>
          </div>
        ) : (
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:28 }}>
            <div style={{ marginBottom:18 }}><label style={{ display:'block', fontWeight:600, marginBottom:7, fontSize:14 }}>Namn</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Ditt namn" style={inp}/></div>
            <div style={{ marginBottom:18 }}><label style={{ display:'block', fontWeight:600, marginBottom:7, fontSize:14 }}>E-post</label><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="din@epost.se" style={inp}/></div>
            <div style={{ marginBottom:24 }}><label style={{ display:'block', fontWeight:600, marginBottom:7, fontSize:14 }}>Meddelande</label><textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={5} style={{...inp,resize:'vertical'}} placeholder="Hur kan vi hjälpa?"/></div>
            {status==='error'&&<div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#dc2626' }}>⚠️ {err}</div>}
            <button onClick={send} disabled={status==='sending'} style={{ background:status==='sending'?'#94a3b8':pc, color:'#fff', padding:'13px 0', borderRadius:10, fontWeight:700, fontSize:15, border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', width:'100%' }}>
              {status==='sending' ? '⏳ Skickar...' : 'Skicka meddelande →'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}