import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import TextArea from "../../../../components/ui/TextArea";
import { useFocusedStore } from "@/features/notes/stores/currentFocusStore";
import { Block } from "../../types/blockTypes";
import { useBlocksActions } from "../../hooks/useBlockActions";
import { useBlocks } from "../../hooks/useBlocks";
import { useEditModeStore } from "@/features/notes/stores/editModeStore";
import BlockChangeTypeMenu from "../menus/BlockChangeTypeMenu";

interface TextBlocksProps {
  block: Block;
}

const TextBlock: FC<TextBlocksProps> = ({ block }) => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { id, props, order, type } = block;

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
    if (event.target.value === "/") {
      setIsMenuOpen(true);
      return;
    }

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

  const isFocused: boolean = focusedBlockId === id;

  return (
    <>
      <TextArea
        ref={textAreaRef}
        value={text}
        onFocus={() => {
          setFocusedBlockId(id);
        }}
        onBlur={() => {
          setFocusedBlockId(null);
        }}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={handleOnChange}
        isFocused={isFocused}
        style={{ fontSize: "1.1rem", lineHeight: "1.4" }}
        placeholder={
          isFocused ? "Start typing or '/' for change type of block" : ""
        }
      />

      <BlockChangeTypeMenu
        id={id}
        currentType={type}
        anchorEl={textAreaRef.current}
        isOpen={isMenuOpen}
        handleClose={() => {
          setIsMenuOpen(false);
        }}
      />
    </>
  );
};

export default TextBlock;
