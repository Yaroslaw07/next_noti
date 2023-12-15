import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface uiUpdateState {
  toNotesListUpdate: boolean;
}

const initialState: uiUpdateState = {
  toNotesListUpdate: true,
};

export const uiUpdateSlice = createSlice({
  name: "noteListUpdate",
  initialState: initialState,
  reducers: {
    setNotesListUpdate: (state, action: PayloadAction<boolean>) => {
      state.toNotesListUpdate = action.payload;
    },
  },
});

export const { setNotesListUpdate } = uiUpdateSlice.actions;
export default uiUpdateSlice.reducer;
