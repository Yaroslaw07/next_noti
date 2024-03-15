import { Box, Skeleton } from "@mui/material";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { ChangeEvent, useEffect } from "react";
import { useFocusedStore } from "../stores/currentFocusStore";
import TextArea from "@/components/ui/TextArea";
import { useBlocks } from "@/features/blocks/hooks/useBlocks";

const NoteTitle = () => {
  const {
    currentNoteTitle,
    setCurrentNoteTitle,
    addBlockAfterTitle,
    currentNoteId,
  } = useCurrentNote();
  const { focusedBlockId, setFocusedBlockId } = useFocusedStore();
  const { getNextBlockId } = useBlocks();

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
      addBlockAfterTitle();
      e.preventDefault();
    }

    if (e.key === "ArrowDown") {
      const nextBlockId = getNextBlockId(-1);
      if (nextBlockId) {
        setFocusedBlockId(nextBlockId.id);
      }
      e.preventDefault();
    }
  };

  return currentNoteTitle == null || currentNoteId === null ? (
    <Skeleton variant="text" width={"100%"} height={"80px"} />
  ) : (
    <Box maxHeight={"100%"}>
      <TextArea
        id="note-title-input"
        placeholder="Undefined"
        style={{
          fontSize: "2.4rem",
          fontWeight: "500",
        }}
        value={currentNoteTitle || ""}
        spellCheck={false}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={() => {
          setFocusedBlockId("title");
        }}
        isFocused={focusedBlockId === "title"}
      />
    </Box>
  );
};

export default NoteTitle;
