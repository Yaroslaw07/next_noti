import { createWithEqualityFn } from "zustand/traditional";
import { NoteInfo } from "../types/noteInfoTypes";

interface NoteInfosStore {
  notes: NoteInfo[] | null;
  setNotes: (notes: NoteInfo[]) => void;
  addNote: (note: NoteInfo) => void;
  removeNote: (id: string) => void;
  updateNote: (note: Partial<NoteInfo>) => void;
}

export const useNoteInfosStore = createWithEqualityFn<NoteInfosStore>(
  (set, get) => ({
    notes: null,

    setNotes: (notes: NoteInfo[]) => {
      set(() => ({ notes: notes }));
    },

    addNote: (note: NoteInfo) => {
      set((state) => ({ notes: [...(state.notes || []), note] }));
    },

    removeNote: (id: string) => {
      set((state) => ({
        notes: state.notes?.filter((note) => note.id !== id),
      }));
    },

    updateNote: (note) => {
      set((state) => ({
        notes: state.notes?.map((n) =>
          n.id === note.id ? { ...n, ...note } : n
        ),
      }));
    },
  })
);
