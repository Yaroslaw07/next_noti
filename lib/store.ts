import { configureStore, createStore } from "@reduxjs/toolkit";
import vaultReducer from "./reducers/vaults";
import currentNoteReducer from "./reducers/currentNote";

const store = configureStore({
    reducer: {
        vault: vaultReducer,
        currentNote: currentNoteReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
