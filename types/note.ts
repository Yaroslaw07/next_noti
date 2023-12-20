export interface NoteInfo {
  id: string;
  title: string;
  createdAt: Date;
}

export interface Note extends NoteInfo {
  content: string;
}
