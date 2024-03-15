import { Block } from "@/features/blocks/types/blockTypes";
import { NoteInfo } from "@/features/note-infos/types/noteInfoTypes";

export type Note = NoteInfo & {
  blocks: Block[];
};
