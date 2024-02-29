import { FC } from "react";
import TextBlock from "./block-type/TextBlock";
import { useBlocks } from "../hooks/useBlocks";
import { Stack } from "@mui/material";

const NoteContent: FC = () => {
  // const getNextBlockIdHandler = (order: number) => {
  //   return getNextBlockId(order, blocks);
  // };

  // const getPrevBlockIdHandler = (order: number) => {
  //   return getPrevBlockId(order, blocks);
  // };

  const { blocks } = useBlocks();

  return (
    <Stack direction={"column"} gap={"8px"}>
      {blocks &&
        blocks
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            return (
              <TextBlock
                key={block.id}
                block={block}
                // getNextBlockId={() => {}}
                // getPrevBlockId={() => {}}
              ></TextBlock>
            );
          })}
    </Stack>
  );
};

export default NoteContent;
