import { createWithEqualityFn } from "zustand/traditional";

interface editModeStore {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

export const useEditModeStore = createWithEqualityFn<editModeStore>(
  (set, get) => ({
    editMode: false,
    setEditMode: (editMode) => {
      set(() => ({ editMode }));
    },
  })
);
