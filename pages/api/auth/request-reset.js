import { openDb } from '../../../lib/database';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { email } = req.body;
  const db = await openDb();

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes

  await db.run('INSERT INTO reset_codes (email, code, expiry) VALUES (?, ?, ?)', [
    email, resetCode, expiry,
  ]);

  await sendResetCode(email, resetCode);
  res.status(200).json({ message: 'Reset code sent!' });
}

async function sendResetCode(email, code) {
  const transporter = nodemailer.createTransport({ /* Configure SMTP */ });

  await transporter.sendMail({
    from: 'no-reply@contactapp.com',
    to: email,
    subject: 'Password Reset Code',
    text: `Your reset code is: ${code}`,
  });
}
