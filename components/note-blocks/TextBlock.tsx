import { FC, useState } from "react";
import TextArea from "../ui/TextArea";

interface TextBlocksProps {
  props: TextProps;
  onChange: (block: string) => void;
  createNewBlock?: (props: string) => void;
  deleteBlock?: () => void;
}

const TextBlock: FC<TextBlocksProps> = ({
  props,
  onChange,
  createNewBlock,
  deleteBlock,
}) => {
  const [text, setText] = useState(props.text || "");

  const handleOnChange = (content: string) => {
    setText(content);
    onChange(content);
  };

  // const handleOnFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleOnBlur = () => {
  //   setIsFocused(false);
  // };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isEnterPressed = event.key === "Enter";
    const isBackspacePressed = event.key === "Backspace";

    if (isEnterPressed) {
      event.preventDefault();
      createNewBlock && createNewBlock("text");
    }

    if (isBackspacePressed && text.length === 0) {
      event.preventDefault();
      deleteBlock && deleteBlock();
    }
  };

  return <TextArea value={text} onChange={handleOnChange} />;
};

export default TextBlock;
