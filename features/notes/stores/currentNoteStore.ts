import { createWithEqualityFn } from "zustand/traditional";

interface CurrentNoteStore {
  currentNoteId: string | null;
  setCurrentNoteId: (noteId: string | null) => void;

  currentNoteTitle: string | null;
  setCurrentNoteTitle: (title: string | null) => void;

  currentNotePinned: boolean | null;
  setCurrentNotePinned: (isPinned: boolean | null) => void;
}

const useCurrentNoteStore = createWithEqualityFn<CurrentNoteStore>()(
  (set, get) => ({
    currentNoteId: null,

    setCurrentNoteId: (noteId: string | null) => {
      set({ currentNoteId: noteId });
    },

    currentNoteTitle: null,

    setCurrentNoteTitle: (title: string | null) => {
      set({ currentNoteTitle: title });
    },

    currentNotePinned: null,

    setCurrentNotePinned: (isPinned: boolean | null) => {
      set({ currentNotePinned: isPinned });
    },
  })
);

export default useCurrentNoteStore;
