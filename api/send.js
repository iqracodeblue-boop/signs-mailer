const nodemailer = require('nodemailer');

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  const senderEmail = process.env.EMAIL; 
  const senderPassword = process.env.PASSWORD;

  if (!senderEmail || !senderPassword) {
    return res.status(500).json({ error: 'Vercel par EMAIL aur PASSWORD Environment Variables set nahi hain!' });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: senderEmail,
        pass: senderPassword
      }
    });

    let mailOptions = {
      from: senderEmail,
      to: senderEmail, 
      subject: subject || 'New Lead Received',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: 'success', message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Vercel Mailer Error:', error);
    return res.status(500).json({ error: error.toString() });
  }
};
