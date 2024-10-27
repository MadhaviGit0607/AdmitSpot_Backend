// pages/api/contacts/export.js
import { openDb } from '../../../lib/database.js';
import * as XLSX from 'xlsx';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await openDb();
      const contacts = await db.all('SELECT * FROM contacts');

      // Create a new workbook and a worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(contacts);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

      // Create a buffer and write the file to it
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      // Set response headers to indicate a file download
      res.setHeader('Content-Disposition', 'attachment; filename=contacts.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Send the file buffer as the response
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate Excel file.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
