import { BlockType } from "./blockTypes";

export const blocksConversions: {
  [key in BlockType]: (props: any) => any;
} = {
  [BlockType.DIVIDER]: () => ({}),
  [BlockType.HEADER_1]: (props: any) => ({
    text: props.text || "",
  }),
  [BlockType.HEADER_2]: (props: any) => ({
    text: props.text || "",
  }),
  [BlockType.HEADER_3]: (props: any) => ({
    text: props.text || "",
  }),
  [BlockType.TEXT]: (props: any) => ({
    text: props.text || "",
  }),
};
