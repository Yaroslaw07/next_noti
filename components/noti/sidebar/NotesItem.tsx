import { Icons } from "@/components/Icons";
import Link from "@/components/ui/Link";
import { NoteInfo } from "@/types/types";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { FC } from "react";

interface NotesItemProps {
  note: NoteInfo;
}

const NotesItem: FC<NotesItemProps> = ({ note }) => {
  return (
    <Link href={`/note/${note.id}`} sx={{ textDecoration: "none" }}>
      <ListItemButton sx={{ gap: "3px", paddingY:"2px"}}>
        <Icons.ClearNote size={26} />
        <ListItemText>{note.title}</ListItemText>
      </ListItemButton>
    </Link>
  );
};

export default NotesItem;
