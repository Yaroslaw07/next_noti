import { useSocketStore } from "@/features/socket/socketStore";
import { FC, useEffect, useRef } from "react";
import { useBatchStore } from "../batchStore";
import { CURRENT_NOTE_SOCKET_EVENTS } from "@/features/notes/notesEvents";

interface BatchLayoutProps {
  noteId: string;
  children: React.ReactNode;
}

const BatchLayout: FC<BatchLayoutProps> = ({ noteId, children }) => {
  const { socket } = useSocketStore();
  const { anyEvents: anyChanges, getAndClearEvents } = useBatchStore();

  const unsavedChanges = useRef(false);

  useEffect(() => {
    unsavedChanges.current = anyChanges;
  }, [anyChanges]);

  useEffect(() => {
    if (socket !== null && anyChanges) {
      const batchUpdates = getAndClearEvents();

      const timeStamp = Date.now();

      console.log(batchUpdates, timeStamp);

      socket.emit(CURRENT_NOTE_SOCKET_EVENTS.TO_BATCH_UPDATE_NOTE, {
        batchUpdates,
        timeStamp,
      });
    }
  }, [noteId, socket, anyChanges]);

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
