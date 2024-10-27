// pages/api/contacts/[id].js
import { openDb } from '../../../lib/database';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    const db = await openDb();
    const contact = await db.get('SELECT * FROM contacts WHERE id = ? AND deleted_at IS NULL', [id]);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
