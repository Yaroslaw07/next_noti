import { useSocketStore } from "@/features/socket/socketStore";
import { FC, useEffect, useRef } from "react";
import { useBatchStore } from "../batchStore";
import { CURRENT_NOTE_SOCKET_EVENTS } from "@/features/notes/notesEvents";
import { v4 as uuidv4 } from "uuid";
import { BATCH_EVENTS } from "../batchEvents";
import { useBlocksStore } from "@/features/note-content/store/blocksStore";
import useCurrentNoteStore from "@/features/notes/stores/currentNoteStore";
import { BatchUnit } from "../batchTypes";
import { useNoteInfosStore } from "@/features/note-infos/store/noteInfosStore";
import { useTrackingChangesStore } from "@/features/notes/stores/trackingChangesStore";

interface BatchLayoutProps {
  noteId: string;
  children: React.ReactNode;
}

const BatchLayout: FC<BatchLayoutProps> = ({ noteId, children }) => {
  const { socket } = useSocketStore();
  const { anyEvents: anyChanges, getAndClearEvents } = useBatchStore();
  const { hasChangedBlockId } = useTrackingChangesStore();

  const { addBlock, deleteBlock, updateBlock } = useBlocksStore();
  const { setCurrentNoteTitle, setCurrentNotePinned } = useCurrentNoteStore();
  const { updateNote } = useNoteInfosStore();

  const unsavedChanges = useRef(false);
  const lastUpdateId = useRef("");

  useEffect(() => {
    unsavedChanges.current = anyChanges;
  }, [anyChanges]);

  useEffect(() => {
    if (socket !== null && anyChanges) {
      const batchUpdates = getAndClearEvents();

      const id = uuidv4();

      socket.emit(CURRENT_NOTE_SOCKET_EVENTS.TO_BATCH_UPDATE_NOTE, {
        batchUpdates,
        id,
      });

      lastUpdateId.current = id;
    }
  }, [noteId, socket, anyChanges]);

  useEffect(() => {
    socket?.on(
      CURRENT_NOTE_SOCKET_EVENTS.UPDATED_BATCH_NOTE,
      ({ id, batchUpdates }: { id: string; batchUpdates: BatchUnit[] }) => {
        if (id === lastUpdateId.current) {
          lastUpdateId.current = "";
          return;
        }

        lastUpdateId.current = id;
        for (const update of batchUpdates) {
          switch (update.event) {
            case BATCH_EVENTS.NOTE_BLOCK_CREATED_BATCH:
              addBlock(update.data);
              break;

            case BATCH_EVENTS.NOTE_BLOCK_UPDATED_BATCH:
              if (hasChangedBlockId(update.data.id)) {
                return;
              }

              updateBlock(update.data.id, update.data);
              break;

            case BATCH_EVENTS.NOTE_BLOCK_DELETED_BATCH:
              deleteBlock(update.data.id);
              break;

            case BATCH_EVENTS.NOTE_INFO_UPDATED_BATCH:
              const { title, isPinned } = update.data;
              title &&
                !hasChangedBlockId("title") &&
                setCurrentNoteTitle(title);
              if (isPinned !== undefined) {
                updateNote({ id: noteId, isPinned });
                setCurrentNotePinned(isPinned);
              }
              break;
          }
        }
      }
    );

    return () => {
      socket?.off(CURRENT_NOTE_SOCKET_EVENTS.UPDATED_BATCH_NOTE);
    };
  }, [socket]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges.current) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
};

export default BatchLayout;
