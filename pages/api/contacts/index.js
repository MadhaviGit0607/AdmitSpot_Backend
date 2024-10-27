import { openDb } from '../../../lib/database.js';

export default async function handler(req, res) {
  // Handle GET request
  if (req.method === 'GET') {
    try {
      const db = await openDb();
      const contacts = await db.all('SELECT * FROM contacts');
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contacts.' });
    }
  }
  // Handle POST request
  else if (req.method === 'POST') {
    try {
      const { name, email, phone, address } = req.body; // Ensure these fields are sent in the request body
      const db = await openDb();
      const result = await db.run(
        'INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)', 
        [name, email, phone, address] // Include address in the database insertion
      );
      
      // Return the newly created contact
      res.status(201).json({
        id: result.lastID,
        name,
        email,
        phone,
        address, // Include the address in the response
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create contact.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
