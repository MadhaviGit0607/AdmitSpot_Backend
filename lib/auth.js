import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';


// Generate JWT Token
export function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// Verify JWT Token
export function verifyToken(token) {
  if (!token) return null; // Return null if no token is provided

  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}