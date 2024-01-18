import { RootState, useAppDispatch } from "@/lib/store/store";
import { useSelector } from "react-redux";
import {
  setCurrentNote,
  setCurrentNoteContent,
  setCurrentNoteTitle,
  setIsChangedFromAutosave,
  updateContent,
  updateTitle,
} from "../store/reducers/currentNote";
import { ContentBlock, Note } from "@/types/note";
import { saveCurrentNote } from "../store/actions/notes";

const useCurrentNote = () => {
  const {
    note,
    loadStatus: status,
    isChangedFromAutosave,
    isTitleChanged,
  } = useSelector((state: RootState) => state.currentNote);

  const dispatch = useAppDispatch();

  const updateTitleHandler = (title: string) => {
    dispatch(updateTitle({ title }));
  };

  const updateContentHandler = (id: string, props: any) => {
    console.log(id, props);
    dispatch(updateContent({ id, props }));
  };

  const setCurrentNoteHandler = (note: Note) => {
    dispatch(setCurrentNote(note));
  };

  const setCurrentNoteTitleHandler = (title: string) => {
    dispatch(setCurrentNoteTitle({ title }));
  };

  const setCurrentNoteContentHandler = (blocks: ContentBlock[]) => {
    dispatch(setCurrentNoteContent({ blocks }));
  };

  const saveCurrentNoteHandler = async () => {
    if (isChangedFromAutosave) {
      try {
        await dispatch(saveCurrentNote()).unwrap();

        dispatch(setIsChangedFromAutosave(false));

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
    } else {
      return {
        ok: true,
        message: "Note not changed",
      };
    }
  };

  return {
    note,
    status,
    isChangedFromAutosave,
    isTitleChanged,
    updateTitle: updateTitleHandler,
    updateContent: updateContentHandler,
    saveCurrentNote: saveCurrentNoteHandler,
    setCurrentNote: setCurrentNoteHandler,
    setCurrentNoteTitle: setCurrentNoteTitleHandler,
    setCurrentNoteContent: setCurrentNoteContentHandler,
  };
};

export default useCurrentNote;
