import { FC } from "react";
import TextBlock from "./block-types/TextBlock";
import { useBlocks } from "../hooks/useBlocks";
import { Stack } from "@mui/material";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import BlockWrapper from "./BlockWrapper";

const Blocks: FC = () => {
  const { currentNoteId } = useCurrentNote();
  const { blocks } = useBlocks();

  if (!currentNoteId) return null;

  return (
    <Stack direction={"column"} gap={"2px"}>
      {blocks &&
        blocks
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            return (
              <BlockWrapper key={block.id} id={block.id} type={block.type}>
                <TextBlock key={block.id} block={block}></TextBlock>
              </BlockWrapper>
            );
          })}
    </Stack>
  );
};

export default Blocks;
