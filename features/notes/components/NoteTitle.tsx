import { TextField, debounce } from "@mui/material";
import useNoteStore from "../stores/notesStore";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { autoSaveTime } from "@/constants";
import { NOTE_EVENTS } from "../notesEvents";
import { useBlockEvents } from "@/features/note-content/hooks/useBlockEvents";
import { useSocketStore } from "@/features/socket/socketStore";

const NoteTitle = () => {
  const {
    currentNoteId,
    currentNoteTitle,
    setCurrentNoteTitle,
    setCurrentNotePinned,
  } = useNoteStore();
  const { saveTitle } = useCurrentNote();
  const { socket } = useSocketStore();

  const { createBlock } = useBlockEvents();

  const currentTitle = useRef<string | null>(null);
  const hasChanges = useRef<boolean>(false);

  const handleSave = async () => {
    if (
      hasChanges.current &&
      currentTitle.current !== null &&
      currentTitle.current !== ""
    ) {
      hasChanges.current = false;
      saveTitle(currentTitle.current);
    }
  };

  const debounced = useCallback(
    debounce(() => {
      handleSave();
    }, autoSaveTime),
    [currentNoteId]
  );

  const onBlur = () => {
    handleSave();
  };

  useEffect(() => {
    if (socket === null) return;

    socket.on(NOTE_EVENTS.NOTE_TITLE_UPDATED, (payload) => {
      setCurrentNoteTitle(payload.title);
      currentTitle.current = payload.title;
      hasChanges.current = false;
    });

    socket.on(NOTE_EVENTS.NOTE_PIN_UPDATED, (payload) => {
      setCurrentNotePinned(payload.pinned);
    });

    return () => {
      socket.off(NOTE_EVENTS.NOTE_TITLE_UPDATED);
      socket.off(NOTE_EVENTS.NOTE_TITLE_UPDATED);
    };
  }, [socket]);

  useEffect(() => {
    if (currentNoteId === null) return;

    return () => {
      handleSave();
    };
  }, [currentNoteId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentNoteTitle(e.target.value);
    currentTitle.current = e.target.value;
    hasChanges.current = true;
    debounced();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createBlock(0);
      e.preventDefault();
    }
  };

  return (
    <TextField
      variant="standard"
      placeholder="Undefined"
      sx={{ input: { fontSize: "40px", fontWeight: "500", height: "70px" } }}
      InputProps={{ disableUnderline: true }}
      value={currentNoteTitle || ""}
      spellCheck={false}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      autoComplete={"off"}
    />
  );
};

export default NoteTitle;
