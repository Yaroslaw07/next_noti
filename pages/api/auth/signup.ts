import { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "@/lib/auth/jwt";
import { v4 as uuid } from "uuid";
import { CreateUser, GetUserByEmail } from "@/services/user";
import { hashPassword } from "@/lib/auth/hasher";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (GetUserByEmail(email)) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser: User = {
      id: uuid(),
      username:"",
      email: email,
      password: hashedPassword,
      isRegistered: false,
      createdAt: Date.now(),
    };

    CreateUser(newUser);
    console.log(newUser);

    const token = generateToken(newUser);

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}