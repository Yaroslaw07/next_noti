import TextBlock from "../components/block-types/TextBlock";
import { BlockType, BlockTypeInfo } from "./blockTypes";

export const blockTypeInfo: { [key in BlockType]: BlockTypeInfo } = {
  [BlockType.DIVIDER]: {
    type: BlockType.DIVIDER,
    title: "Divider",
    component: TextBlock,
  },
  [BlockType.HEADER_1]: {
    type: BlockType.HEADER_1,
    title: "Header 1",
    component: TextBlock,
  },
  [BlockType.HEADER_2]: {
    type: BlockType.HEADER_2,
    title: "Header 2",
    component: TextBlock,
  },
  [BlockType.HEADER_3]: {
    type: BlockType.HEADER_3,
    title: "Header 3",
    component: TextBlock,
  },
  [BlockType.TEXT]: {
    type: BlockType.TEXT,
    title: "Text",
    component: TextBlock,
  },
};
