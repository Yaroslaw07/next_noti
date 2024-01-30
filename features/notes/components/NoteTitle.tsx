import { TextField, debounce } from "@mui/material";
import useNoteStore from "../store/notesStore";
import { useCurrentNote } from "../hooks/useCurrentNote";
import {
  ChangeEvent,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { autoSaveTime } from "@/constants";
import { useToast } from "@/hooks/useToast";
import { useVaults } from "@/features/vaults/hooks/useVaults";

const NoteTitle = () => {
  const { currentNoteId, currentNoteTitle, setCurrentNoteTitle, socket } =
    useNoteStore();
  const { saveTitle } = useCurrentNote();

  const { openToast } = useToast();

  const currentTitle = useRef<string | null>(null);
  const hasChanges = useRef<boolean>(false);

  const handleSave = async () => {
    if (
      hasChanges.current &&
      currentTitle.current !== null &&
      currentNoteTitle !== ""
    ) {
      hasChanges.current = false;
      const resp = await saveTitle(currentNoteId!, currentTitle.current);

      if (resp.ok == false) {
        openToast(resp.message, "error");
      }
    }
  };

  const debounced = useCallback(
    debounce(() => {
      handleSave();
    }, autoSaveTime),
    [currentNoteId]
  );

  const onBlur = () => {
    if (hasChanges.current) {
      handleSave();
    }
  };

  useEffect(() => {
    if (socket === null) return;

    socket.on("noteTitle-updated", (payload) => {
      setCurrentNoteTitle(payload.title);
      currentTitle.current = payload.title;
      hasChanges.current = false;
    });

    return () => {
      socket.off("noteTitle-updated");
    };
  }, [socket]);

  useEffect(() => {
    if (currentNoteId === null) return;

    return () => {
      if (hasChanges.current) {
        handleSave();
      }
    };
  }, [currentNoteId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentNoteTitle(e.target.value);
    currentTitle.current = e.target.value;
    hasChanges.current = true;
    debounced();
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
      onBlur={onBlur}
    />
  );
};

export default NoteTitle;
