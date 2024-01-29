import { create } from "zustand";
import { Socket } from "socket.io-client";
import connectSocket from "../../../lib/api/connectSocket";
import { Vault } from "../types/vaultsTypes";

interface VaultStore {
  currentVault: Vault | null;

  setCurrentVault: (vault: Vault) => void;
  exitVault: () => void;

  socket: Socket | null;

  initializeSocket: (accessToken: string) => Promise<Socket | undefined>;
  closeSocket: () => void;
}

const useVaultStore = create<VaultStore>((set, get) => ({
  currentVault: null,

  setCurrentVault: (vault: Vault) => {
    set({ currentVault: vault });
  },

  exitVault: () => {
    set({ currentVault: null });
  },

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
