import { Icons } from "@/components/Icons";
import { NoteInfo } from "@/features/note-infos/types/noteInfoTypes";
import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FC } from "react";

interface SearchItemProps {
  note: NoteInfo;
  handleClose: () => void;
}

const SearchItem: FC<SearchItemProps> = ({ note, handleClose }) => {
  const router = useRouter();

  const { resolvedTheme } = useTheme();
  const theme = getCurrentTheme(resolvedTheme);

  const handleClick = () => {
    router.push(`/notes/${note.id}`);
    handleClose();
  };

  return (
    <Card
      variant="outlined"
      onClick={handleClick}
      sx={{
        backgroundColor: "secondary.main",
        borderWidth: "0.5px",
        borderColor: "text.secondary",
        display: "flex",
        justifyContent: "space-between",
        height: "50px",
        boxShadow: "0 1px 0px 1px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: `${theme.palette.additional?.main} !important`,
          cursor: "pointer",
        },
      }}
    >
      <CardContent sx={{ paddingTop: "3%" }}>
        <Typography component="h4" sx={{ fontSize: "1rem", fontWeight: "400" }}>
          {note.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton disableRipple>
          {note.isPinned ? (
            <Icons.Pinned color={"primary"} sx={{ fontSize: "22px" }} />
          ) : (
            <Icons.ToPin color={"primary"} sx={{ fontSize: "22px" }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SearchItem;
