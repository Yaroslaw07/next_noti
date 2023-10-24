import { authOptions } from "@/lib/auth/next-auth";
import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const vaultId = req.body.vaultId;

  if (req.method === "POST") {
    try {
      const result = await db.note.create({
        data: {
          title: "Undefined",
          content: "",
          vault: { connect: { id: vaultId } },
        },
      });

      return res.status(200).json({ message: "Success", note: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
