import { Icons } from "@/components/Icons";
import { Menu, MenuItem, Typography } from "@mui/material";
import { FC } from "react";
import { useNotesInfo } from "../hooks/useNotesInfo";
import { NoteInfo } from "../types/noteInfoTypes";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import { useRouter } from "next/router";

interface NotesItemMenuProps {
  isOpen: boolean;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  note: NoteInfo;
}

const NotesItemMenu: FC<NotesItemMenuProps> = ({
  isOpen,
  note,
  anchorEl,
  handleClose,
}) => {
  const router = useRouter();

  const { removeNote, updateNotePin } = useNotesInfo();
  const { setCurrentNotePinned, currentNoteId } = useCurrentNote();

  const active = note.id === currentNoteId;

  const handlePin = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (active) {
      setCurrentNotePinned(!note.isPinned);
    }
    {
      await updateNotePin(note.id, !note.isPinned);
    }
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    await removeNote(note.id);

    if (active) router.push("/notes");
  };

  return (
    <Menu
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        marginLeft: "10px",
        "& .MuiMenu-paper": {
          backgroundColor: "additional.main",
        },
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        disablePadding: true,
      }}
    >
      <MenuItem sx={{ display: "flex", gap: "4px" }} onClick={handlePin}>
        {!note.isPinned ? <Icons.Pinned /> : <Icons.ToPin />}
        <Typography>{note.isPinned ? "Unpin" : "Pin"}</Typography>
      </MenuItem>
      <MenuItem
        sx={{ display: "flex", gap: "4px" }}
        onClick={(e) => handleDelete(e)}
      >
        {<Icons.Delete />}
        <Typography>{"Delete"}</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NotesItemMenu;
