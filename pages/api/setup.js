import { openDb } from '../lib/database.js';

export default async function handler(req, res) {
  try {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      createdAt TEXT
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    timezone TEXT,
    createdAt TEXT,
    deletedAt TEXT,
    UNIQUE(email, userId)  -- Ensures email is unique for each user
    );
    CREATE TABLE IF NOT EXISTS reset_codes (
      email TEXT,
      code TEXT,
      expiry TIMESTAMP
    );
  )`);

  res.status(200).json({ message: 'Database setup completed successfully.' });
   } catch (error) {
  console.error('Error setting up the database:', error);
  res.status(500).json({ error: 'Failed to set up the database.' });
   }
  }

