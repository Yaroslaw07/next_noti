import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import TextArea from "../../../../components/ui/TextArea";
import { useFocusedBlockStore } from "@/features/notes/stores/focusedBlockStore";
import { ContentBlock } from "../../types/blockTypes";
import { useBlocksActions } from "../../hooks/useBlockActions";

interface TextBlocksProps {
  block: ContentBlock;
}

const TextBlock: FC<TextBlocksProps> = ({ block }) => {
  const { focusedBlockId, setFocusedBlockId } = useFocusedBlockStore();
  const { addBlock, updateBlock, deleteBlock } = useBlocksActions({
    id: block.id,
    order: block.order,
  });

  const [text, setText] = useState("");
  const { id, props } = block;

  const textUpdated = useRef<string | null>(null);

  useEffect(() => {
    setText(props.text || "");

    textUpdated.current = null;
  }, [props]);

  const handleEnter = () => {
    addBlock();
  };

  const handleBackspace = () => {
    deleteBlock();
  };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateBlock({ props: { text: event.target.value } });
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnterPressed = event.key === "Enter";
    const isBackspacePressed = event.key === "Backspace";

    if (isEnterPressed) {
      handleEnter();
    }

    if (isBackspacePressed && text === "") {
      handleBackspace();
    }
  };

  const isFocused: boolean = focusedBlockId === id;

  return (
    <TextArea
      value={text}
      onClick={() => {
        setFocusedBlockId(id);
      }}
      onKeyDown={(e) => handleKeyDown(e)}
      onChange={handleOnChange}
      isFocused={isFocused}
      style={{ fontSize: "1.15rem" }}
    />
  );
};

export default TextBlock;
