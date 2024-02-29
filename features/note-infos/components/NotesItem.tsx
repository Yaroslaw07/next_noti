import { Icons } from "@/components/Icons";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { FC, useState } from "react";
import SidebarModule from "../../current-vault/components/layout/sidebar/base/SidebarModule";
import { NoteInfo } from "../types/noteInfoTypes";
import { useRouter } from "next/router";
import { useToast } from "@/lib/hooks/useToast";
import { useNotesInfo } from "../hooks/useNotesInfo";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";

interface NotesItemProps {
  note: NoteInfo;
  active: boolean;
  title?: string;
}

const NotesItem: FC<NotesItemProps> = ({ note, active, title }) => {
  const { openToast } = useToast();

  const router = useRouter();
  const { removeNote, updateNotePin } = useNotesInfo();
  const { currentNotePinned, setCurrentNotePinned } = useCurrentNote();

  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsHovered(false);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const response = await removeNote(note.id);

    if (response.ok === false) {
      openToast(response.message, "error");
    } else if (active) {
      router.replace("/notes");
    }
  };

  const handlePin = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (active)
      setCurrentNotePinned(
        event.currentTarget.textContent === "Pin" ? true : false
      );
  };

  const currentTitle: string = active
    ? !title || title === ""
      ? "Undefined"
      : title.trim()
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
            width:
              isHovered || note.pinned || (active && currentNotePinned)
                ? "calc(100% - 40px)"
                : "100%",
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

        {(note.pinned || currentNotePinned || isHovered) && (
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
            onClick={handleClick}
          >
            {note.pinned || (active && currentNotePinned && !isHovered) ? (
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
        <Menu
          open={open}
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
            {!note.pinned ? <Icons.Pinned /> : <Icons.ToPin />}
            <Typography>{note.pinned ? "Unpin" : "Pin"}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ display: "flex", gap: "4px" }}
            onClick={() => handleDelete()}
          >
            {<Icons.Delete />}
            <Typography>{"Delete"}</Typography>
          </MenuItem>
        </Menu>
      </SidebarModule>
    </>
  );
};

export default NotesItem;
