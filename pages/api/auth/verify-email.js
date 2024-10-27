import { openDb } from '../../../lib/database';

export default async function handler(req, res) {
  const { email, code } = req.body;
  const db = await openDb();

  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (user && user.verified === 0) {
    await db.run('UPDATE users SET verified = 1 WHERE email = ?', [email]);
    res.status(200).json({ message: 'Email verified successfully!' });
  } else {
    res.status(400).json({ error: 'Invalid code or user already verified.' });
  }
}
