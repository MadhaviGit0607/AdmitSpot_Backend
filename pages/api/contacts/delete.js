// pages/api/contacts/delete.js
import { openDb } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.body;
  const db = await openDb();

  await db.run('UPDATE contacts SET deletedAt = ? WHERE id = ?', [new Date().toISOString(), id]);

  res.status(200).json({ message: 'Contact deleted (soft delete) successfully!' });
}
