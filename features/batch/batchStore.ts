import { BatchUnit } from "./batchTypes";
import { createWithEqualityFn } from "zustand/traditional";

interface BatchStore {
  events: BatchUnit[];
  anyEvents: boolean;

  addEvent: (event: string, data?: any) => void;
  getAndClearEvents: () => BatchUnit[];

  anyChanges: boolean;
  setAnyChanges: (anyChanges: boolean) => void;
}

export const useBatchStore = createWithEqualityFn<BatchStore>((set, get) => ({
  events: [],
  anyEvents: false,

  addEvent: (event, data) => {
    const timeStamp = Date.now();
    set((state) => ({
      events: [...state.events, { event, data, timeStamp }],
      anyEvents: true,
    }));
  },
  getAndClearEvents: () => {
    const events = get().events;
    set(() => ({ events: [], anyEvents: false }));
    return events;
  },

  anyChanges: false,
  setAnyChanges: (anyChanges) => {
    set(() => ({ anyChanges }));
  },
}));
