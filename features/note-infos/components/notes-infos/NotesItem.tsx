import { Icons } from "@/components/Icons";
import { Box, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import SidebarModule from "../../../current-vault/components/layout/sidebar/base/SidebarModule";
import { NoteInfo } from "../../types/noteInfoTypes";
import { useRouter } from "next/router";
import { useToast } from "@/lib/hooks/useToast";
import { useNotesInfo } from "../../hooks/useNotesInfo";

interface NotesItemProps {
  note: NoteInfo;
  active: boolean;
  title?: string;
}

const NotesItem: FC<NotesItemProps> = ({ note, active, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { openToast } = useToast();

  const router = useRouter();
  const { removeNote, updateNotePin } = useNotesInfo();

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const response = await removeNote(note.id);

    if (response.ok === false) {
      openToast(response.message, "error");
    } else if (active) {
      router.replace("/notes");
    }
  };

  const handlePin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const response = await updateNotePin(note.id, !note.pinned);

    if (!response.ok) {
      openToast(response.message, "error");
    }
  };

  const currentTitle: string = active
    ? !title || title === ""
      ? "Undefined"
      : title.trim()
    : note.title.trim();

  return (
    <SidebarModule
      sx={{
        borderTopRightRadius: "8px",
        height: "40px",
        width: "100%",

        flexShrink: 0,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        paddingLeft: "10px",

        "&:hover .remove-button": {
          display: "block",
        },
        ...(active && {
          backgroundColor: "additional.dark",
        }),
      }}
      onClick={() => router.push(`/notes/${note.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          display: "flex",

          gap: "8px",
          alignItems: "center",
          width: "calc(100% - 40px)",
        }}
      >
        <Icons.Note sx={{ color: "text.secondary" }} />
        <Typography
          sx={{
            color: "text.secondary",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {currentTitle}
        </Typography>
      </Box>

      <Box display={"flex"}>
        {/* <IconButton
          className="remove-button"
          onClick={handleDelete}
          sx={{
            paddingTop: "10px",
            display: "none",
          }}
        >
          <Icons.Delete sx={{ fontSize: "20px" }} />
        </IconButton> */}
        <IconButton
          sx={{
            display: "block",
            marginX: "0px",
            paddingTop: "10px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          disableFocusRipple
          disableRipple
          onClick={handlePin}
        >
          {note.pinned && (
            <Icons.Pinned
              sx={{
                color: "text.secondary",
                fontSize: "20px",
                marginRight: "-8px",
              }}
            />
          )}
        </IconButton>
      </Box>
    </SidebarModule>
  );
};

export default NotesItem;
