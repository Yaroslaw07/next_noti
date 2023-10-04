import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY!;

type UserJwt = {
  id: string;
  email: string;
  username: string;
  isRegistered: boolean;
}

export function generateToken(user: UserJwt): string {
  return jwt.sign(user, JWT_SECRET);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}