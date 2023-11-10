import { Icons } from "@/components/Icons";
import Link from "@/components/ui/Link";
import { useNotesListUpdate } from "@/lib/hooks/useNotesListUpdate";
import { NoteInfo } from "@/types/noteInfo";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FC } from "react";

interface NotesItemProps {
  note: NoteInfo;
  active: boolean;
  title?: string;
}

const NotesItem: FC<NotesItemProps> = ({ note, active, title }) => {
  const { setToNotesListUpdate } = useNotesListUpdate();

  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const response = await fetch(`/api/notes/${note.id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    setToNotesListUpdate(true);
  };

  return (
    <Link href={`/note/${note.id}`} sx={{ textDecoration: "none" }}>
      <ListItem
        sx={{
          position: "relative",
          gap: "8px",

          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",

          paddingY: "2px",
          paddingLeft: "10px",

          height: "40px",

          "&:hover": {
            backgroundColor: "#d6d6d6",
          },
          "&:hover .remove-button": {
            display: "block",
          },
          ...(active && {
            backgroundColor: "#e0e0e0",
          }),
        }}
      >
        <Icons.ClearNote size={26} />
        <ListItemText>{active ? title : note.title}</ListItemText>

        <IconButton
          className="remove-button"
          onClick={onDelete}
          sx={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            display: "none",
          }}
        >
          <Icons.DeleteNote size={18} />
        </IconButton>
      </ListItem>
    </Link>
  );
};

export default NotesItem;
