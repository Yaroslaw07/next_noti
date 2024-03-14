import { shallow } from "zustand/shallow";
import useCurrentVaultStore from "../../current-vault/stores/currentVaultStore";
import notesInfoService from "../services/noteInfoService";
import { useNoteInfosStore } from "../store/noteInfosStore";

export const useNotesInfo = () => {
  const { currentVault } = useCurrentVaultStore();
  const { notes, setNotes, addNote, removeNote, updateNote } =
    useNoteInfosStore((state) => state, shallow);

  const loadNotesHandler = async () => {
    const response = await notesInfoService.getNotes(currentVault!.id);
    if (response.ok) {
      setNotes(response.data.notes);
    }
  };

  const addNoteHandler = async (id: string) => {
    const response = await notesInfoService.addNote(currentVault!.id, id);

    if (response.ok) {
      addNote(response.data);
    }

    return response;
  };

  const removeNoteHandler = async (noteId: string) => {
    removeNote(noteId);

    return await notesInfoService.removeNote(currentVault!.id, noteId);
  };

  const updateNotePinHandler = async (noteId: string, isPinned: boolean) => {
    updateNote({ id: noteId, isPinned: isPinned });

    return await notesInfoService.updateNotePin(
      currentVault!.id,
      noteId,
      isPinned
    );
  };

  return {
    notes,
    setNotes,
    loadNotes: loadNotesHandler,
    addNewNote: addNoteHandler,
    removeNote: removeNoteHandler,
    updateNotePin: updateNotePinHandler,
  };
};
