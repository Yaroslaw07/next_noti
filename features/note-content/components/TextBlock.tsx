import { FC, useRef, useState } from "react";
import TextArea from "../../../components/ui/TextArea";

interface TextBlocksProps {
  props: TextProps;
  createNewBlock?: (props: string) => void;
  deleteBlock?: () => void;
}

const TextBlock: FC<TextBlocksProps> = ({
  props,
  createNewBlock,
  deleteBlock,
}) => {
  const [text, setText] = useState(props.text || "");
  console.log(text);

  const textUpdated = useRef<string | null>(null);
  const hasChanges = useRef<boolean>(false);

  const handleOnChange = (content: string) => {
    setText(content);
  };

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
