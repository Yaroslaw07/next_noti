import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("here");

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const vaultId = req.query.vaultId as string;

  if (!vaultId) {
    return res.status(400).json({ message: "Missing vaultId" });
  }

  try {
    const result = await db.note.findMany({
      where: {
        vaultId: vaultId,
      },
    });

    return res.status(200).json({ message: "Success", notes: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
