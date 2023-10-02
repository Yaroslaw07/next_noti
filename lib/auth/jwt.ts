import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key"; 

export function generateToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}