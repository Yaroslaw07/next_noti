import { ContentBlock } from "@/features/note-content/types/blockTypes";
import { NoteInfo } from "@/features/note-infos/types/noteInfoTypes";

export type Note = NoteInfo & {
  blocks: ContentBlock[];
};
