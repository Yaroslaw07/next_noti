import { createWithEqualityFn } from "zustand/traditional";

interface TrackingChangesStore {
  changedBlockIds: Set<string>;

  addChangedBlockId: (id: string) => void;
  removeChangedBlockId: (id: string) => void;
  hasChangedBlockId: (id: string) => boolean;
  isEmpty: () => boolean;
}

export const useTrackingChangesStore =
  createWithEqualityFn<TrackingChangesStore>((set, get) => ({
    changedBlockIds: new Set<string>(),

    addChangedBlockId: (id) => {
      set((state) => {
        state.changedBlockIds.add(id);
        return { changedBlockIds: state.changedBlockIds };
      });
    },
    removeChangedBlockId: (id) => {
      set((state) => {
        state.changedBlockIds.delete(id);
        return { changedBlockIds: state.changedBlockIds };
      });
    },
    hasChangedBlockId: (id) => {
      return get().changedBlockIds.has(id);
    },
    isEmpty: () => {
      return get().changedBlockIds.size === 0;
    },
  }));
