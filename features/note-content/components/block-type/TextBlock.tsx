import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import TextArea from "../../../../components/ui/TextArea";
import { useFocusedBlockStore } from "@/features/notes/stores/focusedBlockStore";
import { ContentBlock } from "../../types/blockTypes";
import { useBlocksActions } from "../../hooks/useBlockActions";
import { useBlocks } from "../../hooks/useBlocks";

interface TextBlocksProps {
  block: ContentBlock;
}

const TextBlock: FC<TextBlocksProps> = ({ block }) => {
  const { focusedBlockId, setFocusedBlockId } = useFocusedBlockStore();
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
    addBlock();
    console.log(getNextBlockId(order)?.id);
    setFocusedBlockId(getNextBlockId(order)?.id || null);
  };

  const handleBackspace = () => {
    deleteBlock();
    setFocusedBlockId(getPrevBlockId(order)?.id || null);
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
      setFocusedBlockId(getPrevBlockId(order)?.id || null);
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
      onClick={() => {
        setFocusedBlockId(id);
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
