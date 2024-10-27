// lib/database.js
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const openDb = async () => {
  return open({
    filename: './database.sqlite', // Ensure this path is correct
    driver: sqlite3.Database,
  });
};

export { openDb }; // Make sure you're exporting openDb like this
