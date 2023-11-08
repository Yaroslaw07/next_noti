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

    const io = new Server(res.socket.server,{
        path:"/api/socket.io",
        addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      () => console.log(`Socket ${socket.id} connected.`);

      socket.on("updateTitle", async (title) => {
        () => console.log(`Socket ${socket.id} sent updateTitle event.`)
        try {
          // Update the title in the database using Prisma
          const updatedTitle = await db.note.update({
            where: { id: "cead310d-b4d4-40d6-bb0b-866acdc23bb4" },
            data: { title: title },
          });

          // Broadcast the updated title to all connected clients
          io.emit("titleUpdated", updatedTitle);
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
