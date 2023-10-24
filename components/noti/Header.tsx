import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icons } from "../Icons";
import theme from "@/lib/ui/theme";

const ToolbarSx = {
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "10px",
  paddingRight: "6px",
  minHeight: "40px",
  [theme.breakpoints.up("sm")]: {
    paddingLeft: "10px",
    paddingRight: "6px",
    minHeight: "40px",
  },
};

const Header = () => {

  return (
    <AppBar
      component="nav"
      position="static"
      sx={{ height: "40px" }}
    >
      <Toolbar sx={ToolbarSx}>
        <Typography
          variant="subtitle1"
          sx={{ paddingTop: "0px", fontSize: "1.1rem" }}
        >
          No note open
        </Typography>
        <IconButton sx={{}}>
          <Icons.More size={30} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
