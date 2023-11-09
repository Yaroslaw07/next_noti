import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Server as IOServer } from "socket.io";
import type { Socket as NetSocket } from "net";
import db from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = async (
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) => {
  if (res.socket.server.io) {
    console.log("Socket is already running.");
  } else {
    console.log("Socket is initializing...");

    const io = new Server(res.socket.server, {
      path: "/api/socket.io",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      socket.on("updateContent", async ({ newContent, noteId }) => {
        try {
          const updatedContent = await db.note.update({
            where: { id: noteId },
            data: { content: newContent },
          });
        } catch (error) {
          console.error("Error updating content:", error);
        }
      });

      socket.on("updateTitle", async ({ newTitle, noteId }) => {
        try {
          const updatedTitle = await db.note.update({
            where: { id: noteId },
            data: { title: newTitle },
          });
        } catch (error) {
          console.error("Error updating title:", error);
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default SocketHandler;
