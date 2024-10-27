import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        console.log("Fetching contacts..."); // Debugging log
        const response = await fetch('/api/contacts/list');

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched contacts:", data); // Debugging log

        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/contacts/download');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // Trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <Head>
        <title>Contacts List</title>
        <meta name="description" content="List of contacts" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Contacts List</h1>
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Download Contacts
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="border border-gray-300 px-4 py-2">{contact.id}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border border-gray-300 px-4 py-2">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
