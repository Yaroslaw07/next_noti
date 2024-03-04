export type ContentBlock = {
  id: string;
  type: string;
  props: any;
  order: number;
  updatedAt: number;
  createdAt: number;
};

type TextProps = {
  text: string;
};
