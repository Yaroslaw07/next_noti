import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import uiUpdate, { uiUpdateSlice } from "../reducers/uiUpdate";

export const useNotesListUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toNotesListUpdate } = useSelector((state: RootState) => state.ui);

  const setToNotesListUpdate = (sidebarUpdateState: boolean) => {
    dispatch(uiUpdateSlice.actions.setNotesListUpdate(sidebarUpdateState));
  };

  return { toNotesListUpdate, setToNotesListUpdate };
};
