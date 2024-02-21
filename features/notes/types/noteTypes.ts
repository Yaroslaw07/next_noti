import { NoteInfo } from "@/features/note-infos/types/noteInfoTypes";

export type ContentBlock = {
  id: string;
  type: string;
  props: any;
  order: number;
};

export type Note = NoteInfo & {
  blocks: ContentBlock[];
};
