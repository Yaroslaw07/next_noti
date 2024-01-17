export type NoteInfo = {
  id: string;
  title: string;
  createdAt: Date;
};

export type ContentBlock = {
  id: string;
  type: string;
  props: any;
  order: number;
};

export type Note = NoteInfo & {
  blocks: ContentBlock[];
};
