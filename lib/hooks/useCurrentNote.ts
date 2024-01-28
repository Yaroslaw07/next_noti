import useNoteStore from "../../features/notes/store/notesStore";

const useCurrentNote = () => {
  const { setCurrentNoteId } = useNoteStore();

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
