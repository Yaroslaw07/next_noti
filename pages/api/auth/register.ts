import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { userId, username, vaultName } = req.body;

  if (!userId || !username || !vaultName) {
    res.status(400).json({ message: "Missing fields" });
  }

  const user = await db.user.update({
    where: { id: userId },
    data: { name: username, isRegistered: true },
  });

  const firstVault = await db.vault.create({
    data: { name: vaultName, owner: { connect: { id: userId } } },
  });

  if (!user || !firstVault) {
    res.status(500).json({ message: "Something went wrong" });
  }

  res.status(200).json({ message: "Success" });
}
