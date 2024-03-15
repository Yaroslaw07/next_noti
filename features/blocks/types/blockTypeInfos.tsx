import HR from "@/components/ui/HR";
import TextBlock from "../components/block-types/TextBlock";
import { BlockType, BlockTypeInfo } from "./blockTypes";
import HeaderBlock, {
  headerStyle1,
  headerStyle2,
  headerStyle3,
} from "../components/block-types/HeaderBlock";
import DividerBlock from "../components/block-types/DividerBlock";

export const blockTypeInfos: { [key in BlockType]: BlockTypeInfo } = {
  [BlockType.DIVIDER]: {
    type: BlockType.DIVIDER,
    title: "Divider",
    component: DividerBlock,
  },
  [BlockType.HEADER_1]: {
    type: BlockType.HEADER_1,
    title: "Header 1",
    component: (props) => <HeaderBlock style={headerStyle1} {...props} />,
  },
  [BlockType.HEADER_2]: {
    type: BlockType.HEADER_2,
    title: "Header 2",
    component: (props) => <HeaderBlock style={headerStyle2} {...props} />,
  },
  [BlockType.HEADER_3]: {
    type: BlockType.HEADER_3,
    title: "Header 3",
    component: (props) => <HeaderBlock style={headerStyle3} {...props} />,
  },
  [BlockType.TEXT]: {
    type: BlockType.TEXT,
    title: "Text",
    component: TextBlock,
  },
};
