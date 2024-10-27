import { openDb } from '../../../lib/database';
import * as XLSX from 'xlsx';

export default async function handler(req, res) {
  // Assuming no authentication is needed as per your request
  if (req.method === 'GET') {
    try {
      const db = await openDb();
      const contacts = await db.all('SELECT * FROM contacts');

      // Generate Excel file
      const worksheet = XLSX.utils.json_to_sheet(contacts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

      // Set the response headers to force download
      res.setHeader('Content-Disposition', 'attachment; filename=contacts.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Write to buffer
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      // Send the buffer as the response
      res.status(200).send(buffer);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      res.status(500).json({ error: 'Failed to generate Excel file' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
