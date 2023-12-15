import { configureStore } from "@reduxjs/toolkit";
import currentNoteReducer from "./reducers/currentNote";
import uiUpdateReducer from "./reducers/uiUpdate";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    uiUpdate: uiUpdateReducer,
    currentNote: currentNoteReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
