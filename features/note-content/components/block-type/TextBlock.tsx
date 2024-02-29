import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import TextArea from "../../../../components/ui/TextArea";
import { debounce } from "lodash";
import { CONSTANTS } from "@/constants";
import { useFocusedBlockStore } from "@/features/notes/stores/focusedBlockStore";
import { ContentBlock } from "../../types/blockTypes";
import { useBlocks } from "../../hooks/useBlocks";

interface TextBlocksProps {
  block: ContentBlock;

  // getNextBlockId: (order: number) => string | null;
  // getPrevBlockId: (order: number) => string | null;
}

const TextBlock: FC<TextBlocksProps> = ({
  block,
  // getNextBlockId,
  // getPrevBlockId,
}) => {
  const { focusedBlockId, setFocusedBlockId } = useFocusedBlockStore();

  const [text, setText] = useState("");
  const { id, props } = block;

  const textUpdated = useRef<string | null>(null);
  const hasChanges = useRef<boolean>(false);

  useEffect(() => {
    setText(props.text || "");

    hasChanges.current = false;
    textUpdated.current = null;
  }, [props]);

  // const handleSave = async () => {
  //   if (
  //     hasChanges.current &&
  //     textUpdated.current !== null &&
  //     !isSetToDelete.current
  //   ) {
  //     hasChanges.current = false;
  //     updateBlockProps(id, { text: textUpdated.current });
  //   }
  // };

  const isFocused: boolean = focusedBlockId === id;

  // const handleEnter = () => {
  //   createBlock(order + 1);
  // };

  // const handleFocus = () => {
  //   setFocusedBlockId(id);
  // };

  // const handleBackspace = () => {
  //   isSetToDelete.current = true;
  //   deleteBlock(id);
  // };

  // const moveToPrevious = () => {
  //   handleSave();
  //   setFocusedBlockId(getPrevBlockId(order));
  // };

  // const moveToNext = () => {
  //   handleSave();
  //   setFocusedBlockId(getNextBlockId(order));
  // };

  // const onBlur = () => {
  //   handleSave();
  // };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    textUpdated.current = event.target.value;
    hasChanges.current = true;
  };

  return (
    <TextArea
      value={text}
      onChange={handleOnChange}
      // onBlur={onBlur}
      isFocused={isFocused}
      style={{ fontSize: "18px" }}
      // handleEnter={handleEnter}
      // handleBackspace={handleBackspace}
      // onFocus={handleFocus}
      // isFocused={isFocused}
      // moveToNext={moveToNext}
      // moveToPrevious={moveToPrevious}
    />
  );
};

export default TextBlock;
