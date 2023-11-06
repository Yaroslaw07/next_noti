import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const noteId = req.query.noteId as string;

  if (!noteId) {
    return res.status(400).json({ message: "Missing noteId" });
  }

  if (req.method === "GET") {
    try {
      const result = await db.note.findFirst({
        where: {
          id: noteId,
        },
      });

      return res.status(200).json({ message: "Success", note: result });
    } catch (error) {
      return res.status(400).json({ message: "Note not found" });
    }
  }

  if (req.method === "DELETE") {

    const result = await db.note.delete({
      where: {
        id: noteId,
      },
    });

    if (!result) {
      return res.status(400).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Success"});
  }

  return res.status(405).json({ message: "Method not allowed" });
}
