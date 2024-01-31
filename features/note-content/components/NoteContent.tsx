import { FC, useRef } from "react";
import TextBlock from "./TextBlock";
import { ContentBlock } from "../../notes/types/noteTypes";

interface NoteContentProps {
  blocks: ContentBlock[];
}

const NoteContent: FC<NoteContentProps> = ({ blocks }) => {
  console.log(blocks);

  return (
    <>
      {blocks &&
        blocks
          .sort((block) => block.order)
          .map((block) => {
            return <TextBlock key={block.id} props={block.props}></TextBlock>;
          })}
    </>
  );
};

export default NoteContent;
