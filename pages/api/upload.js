// pages/api/contacts/upload.js
import { openDb } from '../../../lib/database';
import multer from 'multer';
import { parse } from 'csv-parser';
import * as XLSX from 'xlsx';

const upload = multer({ dest: 'uploads/' }); // Temp storage for uploaded files

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, async err => {
      if (err) return res.status(500).json({ error: 'File upload failed' });

      const filePath = req.file.path;
      const contacts = [];

      // Check file extension and parse accordingly
      if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        contacts.push(...data);
      } else {
        // Assuming it's a CSV file
        fs.createReadStream(filePath)
          .pipe(parse({ headers: true }))
          .on('data', row => contacts.push(row))
          .on('end', async () => {
            await saveContacts(contacts, req.user.id); // Validate and save contacts
            res.status(200).json({ message: 'Contacts uploaded successfully!' });
          });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Function to save contacts after validation
async function saveContacts(contacts, userId) {
  const db = await openDb();

  for (const contact of contacts) {
    const { name, email, phone, address, timezone } = contact;

    // Perform validation here
    // Check for existing email constraint, etc.

    await db.run(
      'INSERT INTO contacts (name, email, phone, address, timezone, userId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, timezone, userId, new Date().toISOString()]
    );
  }
}
