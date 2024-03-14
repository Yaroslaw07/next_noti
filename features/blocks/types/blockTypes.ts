import { FC } from "react";

export enum BlockType {
  DIVIDER = "divider",
  HEADER_1 = "header1",
  HEADER_2 = "header2",
  HEADER_3 = "header3",
  TEXT = "text",
}

export interface BlockTypeInfo {
  type: BlockType;
  title: string;
  component: FC<any>;
}

export type Block = {
  id: string;
  type: string;
  props: any;
  order: number;
  updatedAt: number;
  createdAt: number;
};
