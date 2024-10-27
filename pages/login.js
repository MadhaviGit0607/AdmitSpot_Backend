// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook to handle navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse response to get the token
  
        const token = data.token; // Extract the token from the response
        localStorage.setItem('token', token); // Store the token in localStorage
  
        router.push('/'); // Redirect to the home page after successful login
      } else {
        setError('Login failed. Please check your credentials.'); // Handle login error
      }
    } catch (err) {
      setError('An unexpected error occurred.'); // Catch unexpected errors
    }
  };

  async function fetchContacts() {
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      if (!token) {
        throw new Error("No token found"); // Check if token exists
      }
  
      const response = await fetch('/api/contacts/list', {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token for the request
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
