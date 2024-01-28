import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Icons } from "../../../../components/Icons";
import theme from "@/lib/ui/theme";
import useCurrentNote from "@/lib/hooks/useCurrentNote";

const ToolbarSx = {
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

const Header = () => {
  const { note, status } = useCurrentNote();

  return (
    <AppBar component="nav" position="static" sx={{ height: "40px" }}>
      <Toolbar sx={ToolbarSx}>
        <Typography
          variant="subtitle1"
          sx={{ paddingTop: "0px", fontSize: "1.15rem" }}
        >
          {status === "loading" && "Loading"}
          {status === "not-init" && "No note open"}
          {status === "success" && note?.title == "" ? "Untitled" : note?.title}
        </Typography>
        <IconButton sx={{}}>
          <Icons.More sx={{ fontSize: "32px", marginTop: "-8px" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
