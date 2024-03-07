import { Skeleton } from "@mui/material";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { ChangeEvent, useEffect } from "react";
import { useFocusedBlockStore } from "../stores/focusedBlockStore";
import TextArea from "@/components/ui/TextArea";
import { useBlocks } from "@/features/note-content/hooks/useBlocks";

const NoteTitle = () => {
  const { currentNoteTitle, setCurrentNoteTitle, addBlockAfterTitle } =
    useCurrentNote();
  const { focusedBlockId, setFocusedBlockId } = useFocusedBlockStore();
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

  return currentNoteTitle == null ? (
    <Skeleton variant="text" width={"100%"} height={"80px"} />
  ) : (
    <TextArea
      id="note-title-input"
      placeholder="Undefined"
      style={{ fontSize: "32px", fontWeight: "500" }}
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
