// pages/api/contacts/batch.js
import { openDb } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { contacts, userId } = req.body; // contacts is an array of contact objects
  const db = await openDb();

  const insertPromises = contacts.map(contact => {
    const { name, email, phone, address, timezone } = contact;
    return db.run(
      'INSERT INTO contacts (name, email, phone, address, timezone, userId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, timezone, userId, new Date().toISOString()]
    );
  });

  await Promise.all(insertPromises);

  res.status(201).json({ message: 'Contacts added successfully!' });
}
