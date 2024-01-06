import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Icons } from "../Icons";
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
          {status === "loading" && "No note opened"}
          {(status === "success" && note?.title) || "Undefined"}
        </Typography>
        <IconButton sx={{}}>
          <Icons.More sx={{ fontSize: "30px" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
