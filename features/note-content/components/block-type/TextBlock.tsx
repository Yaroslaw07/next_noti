import { FC, useCallback, useEffect, useRef, useState } from "react";
import TextArea from "../../../../components/ui/TextArea";
import { debounce } from "lodash";
import { autoSaveTime } from "@/constants";
import { useBlockEvents } from "../../hooks/useBlockEvents";

interface TextBlocksProps {
  blockId: string;
  props: TextProps;
  order: number;
}

const TextBlock: FC<TextBlocksProps> = ({ blockId, props, order }) => {
  const { updateBlockProps, createBlock, deleteBlock } = useBlockEvents();

  const [text, setText] = useState("");

  const textUpdated = useRef<string | null>(null);
  const hasChanges = useRef<boolean>(false);

  useEffect(() => {
    console.log("text updated", props.text);
    setText(props.text || "");

    hasChanges.current = false;
    textUpdated.current = null;
  }, [props]);

  const handleSave = async () => {
    if (hasChanges.current && textUpdated.current !== null) {
      hasChanges.current = false;
      updateBlockProps(blockId, { text: textUpdated.current });
    }
  };

  const handleEnter = () => {
    createBlock(order + 1);
  };

  const handleBackspace = () => {
    deleteBlock(blockId);
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
    />
  );
};

export default TextBlock;
