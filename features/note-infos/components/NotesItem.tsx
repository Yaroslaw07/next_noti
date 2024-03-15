import { Icons } from "@/components/Icons";
import { Box, IconButton, Typography } from "@mui/material";
import { FC, memo, useState } from "react";
import SidebarModule from "../../current-vault/components/layout/sidebar/base/SidebarModule";
import { NoteInfo } from "../types/noteInfoTypes";
import { useRouter } from "next/router";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import NotesItemMenu from "./NotesItemMenu";

interface NotesItemProps {
  note: NoteInfo;
}

const NotesItem: FC<NotesItemProps> = ({ note }) => {
  const router = useRouter();
  const { currentNoteTitle, currentNoteId } = useCurrentNote();
  const active = currentNoteId === note.id;

  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleOptionsClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsHovered(false);
    setAnchorEl(null);
  };

  const currentTitle: string = active
    ? !currentNoteTitle || currentNoteTitle === ""
      ? "Undefined"
      : currentNoteTitle.trim()
    : note.title.trim();

  return (
    <>
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
            width: isHovered || note.isPinned ? "calc(100% - 40px)" : "100%",
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

        {(note.isPinned || isHovered) && (
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
            onClick={handleOptionsClick}
          >
            {note.isPinned && !isHovered ? (
              <Icons.Pinned
                sx={{
                  color: "text.secondary",
                  fontSize: "20px",
                  marginRight: "-8px",
                }}
              />
            ) : (
              isHovered && (
                <Icons.More
                  sx={{
                    fontSize: "30px",
                    marginRight: "-12px",
                    color: "text.secondary",
                  }}
                />
              )
            )}
          </IconButton>
        )}
        <NotesItemMenu
          isOpen={open}
          anchorEl={anchorEl}
          handleClose={handleOptionsClose}
          note={note}
        />
      </SidebarModule>
    </>
  );
};

export default memo(NotesItem);
