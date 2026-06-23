import { Resend } from 'resend';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, message } = req.body;
  if (!name||!email||!message) return res.status(400).json({ error: 'Alla fält måste fyllas i.' });
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || 'kontakt@example.com';
  if (!apiKey) {
    console.log('[CONTACT]', { name, email, message });
    return res.json({ ok: true });
  }
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Kontaktformulär <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: 'Meddelande från ' + name + ' — JamforElavtal2026',
      html: '<p><b>Namn:</b> ' + name + '</p><p><b>E-post:</b> ' + email + '</p><p><b>Meddelande:</b></p><p>' + message.replace(/\n/g,'<br>') + '</p>',
    });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: 'Kunde inte skicka meddelandet.' }); }
}