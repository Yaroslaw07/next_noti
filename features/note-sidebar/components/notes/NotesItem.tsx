import { Icons } from "@/components/Icons";
import { Box, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import SidebarModule from "../SidebarModule";
import { useNotesInfo } from "../../hooks/useNotesInfo";
import { NoteInfo } from "../../types/noteInfoTypes";
import { useRouter } from "next/router";

interface NotesItemProps {
  note: NoteInfo;
  active: boolean;
  title?: string;
}

const MAX_TITLE_LENGTH = 12;
const MAX_TITLE_LENGTH_HOVER = 8;

const NotesItem: FC<NotesItemProps> = ({ note, active, title }) => {
  const [maxTitleLength, setMaxTitleLength] = useState(MAX_TITLE_LENGTH);

  const router = useRouter();
  const { removeNote } = useNotesInfo();

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const response = await removeNote(note.id);

    if (response === undefined) {
      console.log("Error deleting note");
    } else if (active) {
      router.replace("/notes");
    }
  };

  const setFullTitleLength = () => {
    setMaxTitleLength(MAX_TITLE_LENGTH);
  };

  const setHoverTitleLength = () => {
    setMaxTitleLength(MAX_TITLE_LENGTH_HOVER);
  };

  const currentTitle: string = active
    ? !title || title === ""
      ? "Undefined"
      : title
    : note.title;

  const displayTitle =
    currentTitle!.length > maxTitleLength
      ? `${currentTitle.slice(0, maxTitleLength)}...`
      : currentTitle;

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
      onClick={() => router.push(`/notes/${note.id}`)}
      onMouseEnter={setHoverTitleLength}
      onMouseLeave={setFullTitleLength}
    >
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Icons.Note sx={{ color: "text.secondary" }} />
        <Typography sx={{ color: "text.secondary" }}>{displayTitle}</Typography>
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
