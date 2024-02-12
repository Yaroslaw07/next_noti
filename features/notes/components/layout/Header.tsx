import { AppBar, Theme, Toolbar, Typography } from "@mui/material";
import { Icons } from "../../../../components/Icons";
import useNoteStore from "../../stores/notesStore";
import useThemeStore from "@/lib/stores/themeStore";

const getToolbarSx = (theme: Theme) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "50px",
    [theme.breakpoints.up("sm")]: {
      minHeight: "50px",
      paddingX: "12px",
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
            fontSize: "38px",
            marginTop: "-3px",
            borderRadius: "8px",
            color: currentTheme.palette.primary.light,
            "&:hover": {
              color: currentTheme.palette.primary.dark,
              background: currentTheme.palette.additional?.dark,
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
