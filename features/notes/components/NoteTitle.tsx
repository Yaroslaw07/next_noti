import { Skeleton, debounce } from "@mui/material";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useBlocks } from "@/features/note-content/hooks/useBlockEvents";
import { useSocketStore } from "@/features/socket/socketStore";
import { useFocusedBlockStore } from "../stores/focusedBlockStore";
import TextArea from "@/components/ui/TextArea";

const NoteTitle = () => {
  const { currentNoteTitle, setCurrentNoteTitle } = useCurrentNote();
  const { createBlock } = useBlocks();
  const { focusedBlockId, setFocusedBlockId } = useFocusedBlockStore();

  const currentTitle = useRef<string | null>(null);

  useEffect(() => {
    const titleInput = document.getElementById("note-title-input");

    if (focusedBlockId === "title" && titleInput) {
      titleInput.focus();
    }
  }, [focusedBlockId]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNoteTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      //createBlock(0);
      e.preventDefault();
    }
  };

  return currentNoteTitle == null ? (
    <Skeleton variant="text" width={"100%"} height={"80px"} />
  ) : (
    <TextArea
      id="note-title-input"
      placeholder="Undefined"
      style={{ fontSize: "40px", fontWeight: "500", height: "70px" }}
      value={currentNoteTitle || ""}
      spellCheck={false}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onClick={() => {
        setFocusedBlockId("title");
      }}
      isFocused={focusedBlockId === "title"}
    />
  );
};

export default NoteTitle;
