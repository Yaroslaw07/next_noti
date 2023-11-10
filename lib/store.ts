import { configureStore } from "@reduxjs/toolkit";
import vaultReducer from "./reducers/vaults";
import currentNoteReducer from "./reducers/currentNote";
import uiUpdate from "./reducers/uiUpdate";

const store = configureStore({
  reducer: {
    ui: uiUpdate,
    vault: vaultReducer,
    currentNote: currentNoteReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
