import { SignJWT, jwtVerify } from "jose";

// Secret key (convert string to Uint8Array for jose)
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

// Generate JWT (valid for 1 day)
export const generateToken = async (payload) => {
  return await new SignJWT(payload)
    
    .setExpirationTime("1d")
    .sign(SECRET);
};

// Verify JWT and return payload
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload; // contains id, role, username etc.
  } catch (error) {
    return null; // invalid/expired token
  }
};
