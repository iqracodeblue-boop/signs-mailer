const { Resend } = require('resend');

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, subject, message } = req.body;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Vercel par RESEND_API_KEY set nahi hai!' });
  }

  const resend = new Resend(apiKey);

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Ye Resend ki free testing email hai
      to: 'iqra.codeblue@gmail.com', // Yahan apni wo email dalein jispe lead aani chahiye
      subject: subject || 'New Lead Received from Website',
      html: `
        <h2>New Lead Received!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    console.error('Resend Mailer Error:', error);
    return res.status(500).json({ error: error.toString() });
  }
};
