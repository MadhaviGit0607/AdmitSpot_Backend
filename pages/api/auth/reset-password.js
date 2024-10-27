import bcrypt from 'bcryptjs';
import { openDb } from '../../../lib/database';

export default async function handler(req, res) {
  const { email, code, newPassword } = req.body;
  const db = await openDb();

  const resetEntry = await db.get('SELECT * FROM reset_codes WHERE email = ? AND code = ?', [email, code]);

  if (resetEntry) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.run('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
    await db.run('DELETE FROM reset_codes WHERE email = ?', [email]);
    res.status(200).json({ message: 'Password reset successful!' });
  } else {
    res.status(400).json({ error: 'Invalid code or expired.' });
  }
}
