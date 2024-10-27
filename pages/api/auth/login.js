import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { openDb } from '../../../lib/database';

const SECRET_KEY = 'your-secret-key';

export default async function handler(req, res) {
  const { email, password } = req.body;
  const db = await openDb();

  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(400).json({ error: 'Invalid email or password' });
  }
}
