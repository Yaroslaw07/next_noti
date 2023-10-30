import db from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const noteId = req.query.noteId as string;

    if (!noteId) {
        return res.status(400).json({ message: "Missing noteId" })
    }

    try {
        const result = await db.note.findFirst({
            where: {
                id: noteId
            }
        })
        
        return res.status(200).json({ message: "Success", note: result })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}