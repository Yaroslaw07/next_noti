import { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "@/lib/auth/jwt";
import { v4 as uuid } from "uuid";
import { createUser, findUser } from "@/services/user";
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

    if (findUser(email)) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser: User = {
      id: uuid(),
      email: email,
      password: hashedPassword,
    };

    createUser(newUser);

    const token = generateToken(newUser);

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
