import { FC } from "react";
import { useBlocks } from "../hooks/useBlocks";
import { Stack } from "@mui/material";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import BlockWrapper from "./BlockWrapper";
import { blockTypeInfos } from "../types/blockTypeInfos";
import { BlockType } from "../types/blockTypes";

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
            if (Object.values(BlockType).includes(block.type as BlockType)) {
              const blockTypeInfo = blockTypeInfos[block.type as BlockType];

              return (
                <BlockWrapper key={block.id} id={block.id} type={block.type}>
                  <blockTypeInfo.component
                    key={block.id}
                    block={block}
                  ></blockTypeInfo.component>
                </BlockWrapper>
              );
            } else {
              return null;
            }
          })}
    </Stack>
  );
};

export default Blocks;
