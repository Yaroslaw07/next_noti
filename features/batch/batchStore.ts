import { BatchUnit } from "./batchTypes";
import { createWithEqualityFn } from "zustand/traditional";

interface BatchStore {
  events: BatchUnit[];
  anyChanges: boolean;
  addEvent: (event: string, data: any) => void;
  getAndClearEvents: () => BatchUnit[];
}

export const useBatchStore = createWithEqualityFn<BatchStore>((set, get) => ({
  events: [],
  anyChanges: false,
  addEvent: (event, data) => {
    const timeStamp = Date.now();
    set((state) => ({
      events: [...state.events, { event, data, timeStamp }],
      anyChanges: true,
    }));
  },
  getAndClearEvents: () => {
    const events = get().events;
    set(() => ({ events: [], anyChanges: false }));
    return events;
  },
}));
