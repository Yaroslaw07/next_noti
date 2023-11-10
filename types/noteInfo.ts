class NoteInfo {
  id: string;
  title: string;
  createdAt: Date;

  constructor(id: string, title: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }
}

export { NoteInfo };
