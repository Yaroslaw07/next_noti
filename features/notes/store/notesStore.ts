import { create } from "zustand";
import { Socket } from "socket.io-client";
import connectSocket from "../../../lib/api/connectSocket";

interface NoteSocketStore {
  currentNoteId: string | null;
  setCurrentNoteId: (noteId: string | null) => void;

  currentNoteTitle: string | null;
  setCurrentNoteTitle: (title: string | null) => void;

  socket: Socket | null;
  initializeSocket: (accessToken: string) => Promise<Socket | undefined>;
  closeSocket: () => void;
}

const useNoteStore = create<NoteSocketStore>()((set, get) => ({
  currentNoteId: null,

  setCurrentNoteId: (noteId: string | null) => {
    set({ currentNoteId: noteId });
  },

  currentNoteTitle: null,
  setCurrentNoteTitle: (title: string | null) => {
    set({ currentNoteTitle: title });
  },

  enterNote: (noteId: string) => {
    set({ currentNoteId: noteId, currentNoteTitle: null });
  },

  exitNote: () => {
    set({ currentNoteId: null });
  },

  socket: null,

  initializeSocket: async (accessToken: string) => {
    try {
      const socket = connectSocket("notes", {
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

export default useNoteStore;
