import { FC } from "react";
import TextBlock from "./block-type/TextBlock";
import { ContentBlock } from "../../notes/types/noteTypes";
import { useBlocks } from "../hooks/useBlocks";

interface NoteContentProps {
  originalBlocks: ContentBlock[];
}

const NoteContent: FC<NoteContentProps> = ({ originalBlocks }) => {
  const { blocks, getNextBlockId, getPrevBlockId } = useBlocks(originalBlocks);

  const getNextBlockIdHandler = (order: number) => {
    return getNextBlockId(order, blocks);
  };

  const getPrevBlockIdHandler = (order: number) => {
    return getPrevBlockId(order, blocks);
  };

  return (
    <>
      {blocks &&
        blocks
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            return (
              <TextBlock
                key={block.id}
                block={block}
                getNextBlockId={getNextBlockIdHandler}
                getPrevBlockId={getPrevBlockIdHandler}
              ></TextBlock>
            );
          })}
    </>
  );
};

export default NoteContent;
