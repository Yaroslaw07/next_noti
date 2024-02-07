import { FC, useCallback, useEffect, useRef, useState } from "react";
import TextArea from "../../../../components/ui/TextArea";
import { debounce } from "lodash";
import { autoSaveTime } from "@/constants";
import { useBlockEvents } from "../../hooks/useBlockEvents";
import { ContentBlock } from "@/features/notes/types/noteTypes";
import { useFocusedBlockStore } from "@/features/notes/store/focusedBlockStore";

interface TextBlocksProps {
  block: ContentBlock;
  getNextBlockId: (order: number) => string | null;
  getPrevBlockId: (order: number) => string | null;
}

const TextBlock: FC<TextBlocksProps> = ({
  block,
  getNextBlockId,
  getPrevBlockId,
}) => {
  const { updateBlockProps, createBlock, deleteBlock } = useBlockEvents();
  const { focusedBlockId, setFocusedBlockId } = useFocusedBlockStore();

  const [text, setText] = useState("");
  const { id, order, props } = block;

  const textUpdated = useRef<string | null>(null);
  const hasChanges = useRef<boolean>(false);
  const isSetToDelete = useRef(false);

  useEffect(() => {
    setText(props.text || "");

    hasChanges.current = false;
    textUpdated.current = null;
  }, [props]);

  const handleSave = async () => {
    if (
      hasChanges.current &&
      textUpdated.current !== null &&
      !isSetToDelete.current
    ) {
      hasChanges.current = false;
      updateBlockProps(id, { text: textUpdated.current });
    }
  };

  const isFocused: boolean = focusedBlockId === id;

  const handleEnter = () => {
    createBlock(order + 1);
  };

  const handleFocus = () => {
    setFocusedBlockId(id);
  };

  const handleBackspace = () => {
    isSetToDelete.current = true;
    deleteBlock(id);
  };

  const moveToPrevious = () => {
    handleSave();
    setFocusedBlockId(getPrevBlockId(order));
  };

  const moveToNext = () => {
    handleSave();
    setFocusedBlockId(getNextBlockId(order));
  };

  const debounced = useCallback(
    debounce(() => {
      handleSave();
    }, autoSaveTime),
    []
  );

  const onBlur = () => {
    handleSave();
  };

  const handleOnChange = (content: string) => {
    setText(content);
    textUpdated.current = content;
    hasChanges.current = true;
    debounced();
  };

  return (
    <TextArea
      value={text}
      onChange={handleOnChange}
      onBlur={onBlur}
      handleEnter={handleEnter}
      handleBackspace={handleBackspace}
      onFocus={handleFocus}
      isFocused={isFocused}
      moveToNext={moveToNext}
      moveToPrevious={moveToPrevious}
    />
  );
};

export default TextBlock;
