import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import connectSocket from "../api/socket";

interface VaultStore {
  socket: Socket | null;
  initializeSocket: (accessToken: string) => Promise<Socket | undefined>;
  closeSocket: () => void;
}

const useVaultStore = create<VaultStore>()((set, get) => ({
  socket: null,

  initializeSocket: async (accessToken: string) => {
    try {
      const socket = connectSocket("vaults", {
        extraHeaders: {
          token: accessToken,
        },
      });
      set({ socket });
      return socket;
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  },

  closeSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useVaultStore;
