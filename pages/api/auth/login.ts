import passport from "../../../lib/auth/passport";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, verifyPassword } from "@/lib/auth/hasher";
import { findUser } from "@/services/user";
import { generateToken } from "@/lib/auth/jwt";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "POST") {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }
  
  const {email, password} = req.body;

  const user = findUser(email);

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await verifyPassword(password, user.password);

  console.log("password");

  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  // Generate a JWT token
  const token = generateToken(user);

  // Return the JWT token to the user
  res.status(200).json({ token });
};
