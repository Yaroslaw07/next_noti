import { TextField, debounce } from "@mui/material";
import useNoteStore from "../store/notesStore";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { has } from "lodash";
import { autoSaveTime } from "@/constants";

const NoteTitle = () => {
  const { currentNoteId, currentNoteTitle, setCurrentNoteTitle } =
    useNoteStore();
  const { saveTitle } = useCurrentNote();

  const currentTitle = useRef<string | null>(null);
  const hasChanges = useRef<boolean>(false);

  const handleSave = () => {
    if (hasChanges.current && currentTitle.current !== null) {
      hasChanges.current = false;
      saveTitle(currentNoteId!, currentTitle.current);
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
