import { useSocketStore } from "@/features/socket/socketStore";
import { CURRENT_NOTE_SOCKET_EVENTS } from "../notesEvents";
import { shallow } from "zustand/shallow";
import { useCurrentVault } from "@/features/current-vault/hooks/useCurrentVault";
import { notesService } from "../services/notesService";

export const useNotes = () => {
  const socket = useSocketStore((state) => state.socket, shallow);

  const joinNoteRoomHandler = (noteId: string) => {
    socket?.emit(CURRENT_NOTE_SOCKET_EVENTS.JOIN_NOTE_ROOM, noteId);
  };

  const leaveNoteRoomHandler = (noteId: string) => {
    socket?.emit(CURRENT_NOTE_SOCKET_EVENTS.LEAVE_NOTE_ROOM, noteId);
  };

  const { currentVault } = useCurrentVault();

  const getNoteById = async (noteId: string) => {
    return await notesService.getNote(currentVault!.id, noteId);
  };

  return {
    joinNoteRoom: joinNoteRoomHandler,
    leaveNoteRoom: leaveNoteRoomHandler,

    getNoteById,
  };
};
