import { Icons } from "@/components/Icons";
import Link from "@/components/ui/Link";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useUiUpdate } from "@/lib/hooks/useUiUpdate";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import SidebarModule from "../SidebarModule";
import { useNotesInfo } from "@/lib/hooks/useNotesInfo";
import { NoteInfo } from "@/types/note";

interface NotesItemProps {
  note: NoteInfo;
  active: boolean;
  title?: string;
}

const NotesItem: FC<NotesItemProps> = ({ note, active, title }) => {
  const router = useRouter();

  const { removeNote, handleRedirect } = useNotesInfo();
  const { note: currentNote } = useCurrentNote();

  const { setToNotesListUpdate } = useUiUpdate();

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const response = await removeNote(note.id);

    if (response !== undefined) {
      if (currentNote && currentNote!.id === note.id) {
        router.replace("/notes/");
      }
      setToNotesListUpdate(true);
    } else {
      console.log("Error deleting note");
    }
  };

  return (
    <SidebarModule
      sx={{
        borderTopRightRadius: "8px",
        height: "40px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "4px",

        paddingLeft: "10px",

        "&:hover .remove-button": {
          display: "block",
        },
        ...(active && {
          backgroundColor: "additional.dark",
        }),
      }}
      onClick={() => handleRedirect(`/notes/${note.id}`)}
    >
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Icons.Note sx={{ color: "text.secondary" }} />
        <Typography sx={{ color: "text.secondary" }}>
          {active ? (title === "" ? "Undefined" : title) : note.title}
        </Typography>
      </Box>

      <IconButton
        className="remove-button"
        onClick={handleDelete}
        sx={{
          paddingTop: "10px",
          display: "none",
        }}
      >
        <Icons.Delete sx={{ fontSize: "20px" }} />
      </IconButton>
    </SidebarModule>
  );
};

export default NotesItem;
