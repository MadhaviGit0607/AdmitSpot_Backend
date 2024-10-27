// components/DownloadButton.js
const DownloadButton = () => {
    const downloadExcel = async () => {
      const token = 'your_jwt_token'; // Retrieve your JWT token appropriately
      const response = await fetch('/api/contacts/download', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Create a link element to download the file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contacts.xlsx'; // Default filename
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download the Excel file');
      }
    };
  
    return (
      <button onClick={downloadExcel} className="p-2 bg-blue-500 text-white rounded">
        Download Contacts as Excel
      </button>
    );
  };
  
  export default DownloadButton;
  