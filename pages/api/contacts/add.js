// pages/api/contacts/add.js
import { openDb } from '../../../lib/database';
import { contactSchema } from '../../../lib/validation';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await contactSchema.validate(req.body);

    const { name, email, phone, address, timezone, userId } = req.body;
    const db = await openDb();

    // Check for existing contact with the same email
    const existingContact = await db.get('SELECT * FROM contacts WHERE email = ? AND userId = ?', [email, userId]);
    if (existingContact) {
      return res.status(400).json({ error: 'Contact with this email already exists' });
    }

    await db.run(
      'INSERT INTO contacts (name, email, phone, address, timezone, userId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, timezone, userId, new Date().toISOString()]
    );

    res.status(201).json({ message: 'Contact added successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
}
