import { Socket } from "socket.io-client";
import { createWithEqualityFn } from "zustand/traditional";
import { NOTE_EVENTS } from "../notesEvents";

interface NoteStore {
  currentNoteId: string | null;
  setCurrentNoteId: (noteId: string | null) => void;

  currentNoteTitle: string | null;
  setCurrentNoteTitle: (title: string | null) => void;

  joinNote: (socket: Socket, noteId: string) => void;
  leaveNote: (socket: Socket, noteId: string) => void;
}

const useNoteStore = createWithEqualityFn<NoteStore>()((set, get) => ({
  currentNoteId: null,

  setCurrentNoteId: (noteId: string | null) => {
    set({ currentNoteId: noteId });
  },

  currentNoteTitle: null,

  setCurrentNoteTitle: (title: string | null) => {
    set({ currentNoteTitle: title });
  },

  joinNote: (socket: Socket, noteId: string) => {
    socket.emit(NOTE_EVENTS.JOIN_NOTE_ROOM, noteId);
  },

  leaveNote: (socket: Socket, noteId: string) => {
    socket.emit(NOTE_EVENTS.LEAVE_NOTE_ROOM, noteId);
  },
}));

export default useNoteStore;
