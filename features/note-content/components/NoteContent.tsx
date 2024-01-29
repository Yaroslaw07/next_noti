import { FC } from "react";
import TextBlock from "./TextBlock";
import { ContentBlock } from "../../notes/types/noteTypes";

interface NoteContentProps {
  blocks: ContentBlock[];
}

const NoteContent: FC<NoteContentProps> = ({ blocks }) => {
  return (
    <>
      {blocks &&
        blocks
          .sort((block) => block.order)
          .map((block) => {
            const updateBlocks = (text: string) => {
              console.log("changing");
            };

            return (
              <TextBlock
                key={block.id}
                props={block.props}
                onChange={updateBlocks}
              ></TextBlock>
            );
          })}
    </>
  );
};

export default NoteContent;
