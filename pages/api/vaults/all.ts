import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.method === "GET") {
    try {
      const userId = session.user.id;

      if (!userId || userId !== req.body.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await db.user.findUnique({
        where: { id: userId },
        include: { vaults: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const vaults = user.vaults;

      return res.status(200).json({ vaults });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  
  return res.status(405).json({ message: "Method not allowed" });
}
