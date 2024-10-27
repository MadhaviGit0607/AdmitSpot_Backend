import Head from 'next/head';

export default function Home() {
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

  return (
    <>
      <Head>
        <title>Contact Management App</title>
        <meta name="description" content="Manage your contacts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Contact Management App</h1>
        
        <div>
          <button onClick={() => console.log('Login clicked')}>Login</button>
          <button onClick={() => console.log('Register clicked')}>Register</button>
        </div>

        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Download Contacts
        </button>

      </main>
    </>
  );
}
