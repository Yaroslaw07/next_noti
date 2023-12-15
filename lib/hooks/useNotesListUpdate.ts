import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { uiUpdateSlice } from "../store/reducers/uiUpdate";

export const useNotesListUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toNotesListUpdate } = useSelector(
    (state: RootState) => state.uiUpdate
  );

  const setToNotesListUpdate = (sidebarUpdateState: boolean) => {
    dispatch(uiUpdateSlice.actions.setNotesListUpdate(sidebarUpdateState));
  };

  return { toNotesListUpdate, setToNotesListUpdate };
};
