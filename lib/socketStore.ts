import { getAccessToken } from "@/features/auth/accessToken";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import connectSocket from "./api/connectSocket";
import { createWithEqualityFn } from "zustand/traditional";

export interface SocketStore {
  socket: Socket | null;
  initializeSocket: () => Promise<Socket | undefined>;
  closeSocket: () => void;
}

export const useSocketStore = createWithEqualityFn<SocketStore>((set, get) => ({
  socket: null,

  initializeSocket: async () => {
    const accessToken = await getAccessToken();
    const socket = connectSocket("", {
      extraHeaders: {
        token: accessToken,
      },
    });
    set({ socket });
    return socket;
  },

  closeSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
    }
  },
}));
