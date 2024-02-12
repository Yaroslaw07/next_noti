import { AppBar, Theme, Toolbar, Typography } from "@mui/material";
import { Icons } from "../../../../components/Icons";
import useNoteStore from "../../stores/notesStore";
import useThemeStore from "@/lib/stores/themeStore";

const getToolbarSx = (theme: Theme) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "10px",
    paddingRight: "6px",
    minHeight: "40px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "16px",
      paddingRight: "6px",
      minHeight: "50px",
    },
  };
};

const Header = () => {
  const { currentNoteId, currentNoteTitle } = useNoteStore();
  const { getCurrentTheme } = useThemeStore();
  const currentTheme = getCurrentTheme();

  return (
    <AppBar component="nav" position="static" sx={{ height: "40px" }}>
      <Toolbar sx={getToolbarSx(currentTheme)}>
        <Typography
          variant="subtitle1"
          sx={{ paddingTop: "0px", fontSize: "1.15rem", fontWeight: "500" }}
        >
          {currentNoteId === null && "No note open"}
          {currentNoteId !== null && currentNoteTitle == ""
            ? "Untitled"
            : currentNoteTitle}
        </Typography>
        <Icons.More
          sx={{
            fontSize: "34px",
            marginTop: "-10px",
            color: currentTheme.palette.primary.light,
            background: currentTheme.palette.additional?.dark,
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
