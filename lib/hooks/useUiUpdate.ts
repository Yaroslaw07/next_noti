import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { uiUpdateSlice } from "../store/reducers/uiUpdate";

export const useUiUpdate = () => {
  const dispatch = useAppDispatch();
  const { toNotesListUpdate } = useSelector(
    (state: RootState) => state.uiUpdate
  );

  const setToNotesListUpdate = (sidebarUpdateState: boolean) => {
    dispatch(uiUpdateSlice.actions.setNotesListUpdate(sidebarUpdateState));
  };

  return { toNotesListUpdate, setToNotesListUpdate };
};
