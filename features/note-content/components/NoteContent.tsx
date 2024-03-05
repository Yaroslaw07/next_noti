import { FC } from "react";
import TextBlock from "./block-type/TextBlock";
import { useBlocks } from "../hooks/useBlocks";
import { Stack } from "@mui/material";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";

const NoteContent: FC = () => {
  const { currentNoteId } = useCurrentNote();
  const { blocks } = useBlocks();

  if (!currentNoteId) return null;

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
