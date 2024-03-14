import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Block } from "../../types/blockTypes";
import { useFocusedStore } from "@/features/notes/stores/currentFocusStore";
import { useEditModeStore } from "@/features/notes/stores/editModeStore";
import { useBlocksActions } from "../../hooks/useBlockActions";
import { useBlocks } from "../../hooks/useBlocks";
import TextArea from "@/components/ui/TextArea";

export const headerStyle1: React.CSSProperties = {
  fontSize: "2.2rem",
  fontWeight: "500",
  color: "#333",
};

export const headerStyle2: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: "500",
  color: "#333",
};

export const headerStyle3: React.CSSProperties = {
  fontSize: "1.8rem",
  fontWeight: "500",
  color: "#333",
};

interface HeaderBlockProps {
  block: Block;
  style?: React.CSSProperties;
}

const HeaderBlock: FC<HeaderBlockProps> = ({ block, style }) => {
  const { focusedBlockId, setFocusedBlockId } = useFocusedStore();
  const { editMode, setEditMode } = useEditModeStore();

  const {
    addBlock,
    updateBlockProps: updateBlock,
    deleteBlock,
  } = useBlocksActions({
    id: block.id,
    order: block.order,
  });

  const { getNextBlockId, getPrevBlockId } = useBlocks();

  const [text, setText] = useState("");
  const { id, props, order } = block;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(props.text || "");
  }, [props]);

  const handleEnter = () => {
    const newBlock = addBlock();
    setFocusedBlockId(newBlock.id);
  };

  const handleBackspace = () => {
    deleteBlock();
    setFocusedBlockId(getPrevBlockId(order)?.id || "title");
  };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateBlock({ props: { text: event.target.value } });
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    !editMode && setEditMode(true);

    const isEnterPressed = event.key === "Enter";
    const isBackspacePressed = event.key === "Backspace";
    const isArrowUpPressed = event.key === "ArrowUp";
    const isArrowDownPressed = event.key === "ArrowDown";

    if (isEnterPressed) {
      handleEnter();
      event.preventDefault();
    }

    if (isBackspacePressed && text === "") {
      handleBackspace();
      event.preventDefault();
    }

    if (isArrowUpPressed && textAreaRef.current?.selectionStart === 0) {
      setFocusedBlockId(getPrevBlockId(order)?.id || "title");
    }

    if (
      isArrowDownPressed &&
      textAreaRef.current?.selectionStart === textAreaRef.current?.value.length
    ) {
      const nextBlockId = getNextBlockId(order)?.id;
      nextBlockId && setFocusedBlockId(nextBlockId);
    }
  };

  const isFocused = focusedBlockId === id;

  return (
    <TextArea
      ref={textAreaRef}
      value={text}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      isFocused={isFocused}
      onFocus={() => setFocusedBlockId(id)}
      onBlur={() => setFocusedBlockId(null)}
      style={{ fontSize: "2rem", fontWeight: "bold" }}
    />
  );
};

export default HeaderBlock;
