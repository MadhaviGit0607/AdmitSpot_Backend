import { openDb } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await openDb();
      const contacts = await db.all('SELECT * FROM contacts'); // Adjust the query based on your needs

      // Respond with the contacts data
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
