import { NoteInfo } from "@/features/note-sidebar/types/noteInfoTypes";

export type ContentBlock = {
  id: string;
  type: string;
  props: any;
  order: number;
};

export type Note = NoteInfo & {
  blocks: ContentBlock[];
};
