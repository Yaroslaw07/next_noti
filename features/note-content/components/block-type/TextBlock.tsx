import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import TextArea from "../../../../components/ui/TextArea";
import { useFocusedStore } from "@/features/notes/stores/currentFocusStore";
import { ContentBlock } from "../../types/blockTypes";
import { useBlocksActions } from "../../hooks/useBlockActions";
import { useBlocks } from "../../hooks/useBlocks";

interface TextBlocksProps {
  block: ContentBlock;
}

const TextBlock: FC<TextBlocksProps> = ({ block }) => {
  const { focusedBlockId, setFocusedBlockId } = useFocusedStore();
  const { addBlock, updateBlock, deleteBlock } = useBlocksActions({
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
      style={{ fontSize: "1.1rem" }}
      placeholder={isFocused ? "Start typing..." : ""}
    />
  );
};

export default TextBlock;
