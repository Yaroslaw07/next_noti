import { configureStore, createStore } from "@reduxjs/toolkit";
import vaultReducer from "./reducers/vaults";

const store = configureStore({
    reducer: {
        vault: vaultReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
