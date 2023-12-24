import { RootState, useAppDispatch } from "@/lib/store/store";
import { useSelector } from "react-redux";
import {
  setCurrentNote,
  setToUpdate,
  updateContent,
  updateTitle,
} from "../store/reducers/currentNote";
import { Note } from "@/types/note";
import { saveCurrentNote } from "../store/actions/notes";

const useCurrentNote = () => {
  const {
    note,
    loadStatus: status,
    toUpdate,
  } = useSelector((state: RootState) => state.currentNote);

  const dispatch = useAppDispatch();

  const updateTitleHandler = (title: string) => {
    dispatch(updateTitle({ title }));
  };

  const updateContentHandler = (content: string) => {
    dispatch(updateContent({ content }));
  };

  const setCurrentNoteHandler = (note: Note) => {
    dispatch(setCurrentNote(note));
  };

  const saveCurrentNoteHandler = async () => {
    try {
      toUpdate && dispatch(setToUpdate(false));

      await dispatch(saveCurrentNote()).unwrap();

      return {
        ok: true,
        message: "Note saved successfully",
      };
    } catch (error) {
      return {
        ok: false,
        message: (error as string) || "Error saving note",
      };
    }
  };

  return {
    note,
    status,
    toUpdate,
    updateTitle: updateTitleHandler,
    updateContent: updateContentHandler,
    saveCurrentNote: saveCurrentNoteHandler,
    setCurrentNote: setCurrentNoteHandler,
  };
};

export default useCurrentNote;
