// pages/api/contacts/update.js
import { openDb } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, name, email, phone, address, timezone } = req.body;
  const db = await openDb();

  await db.run(
    'UPDATE contacts SET name = ?, email = ?, phone = ?, address = ?, timezone = ? WHERE id = ?',
    [name, email, phone, address, timezone, id]
  );

  res.status(200).json({ message: 'Contact updated successfully!' });
}
