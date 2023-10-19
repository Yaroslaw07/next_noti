import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icons } from "../Icons";

const MyToolbar = styled(Toolbar)({
  // Define styles for your custom toolbar
  // For example, removing padding at a certain breakpoint
  [`@media (min-width: 600px)`]: {
    paddingLeft: "10px",
    paddingRight: "6px",
    maxHeight: "40px",
  },
  [`@media (min-width: 0px)`]: {
    paddingLeft: "10px",
    paddingRight: "6px",
    minHeight: "40px",
  },
  display: "flex",
  justifyContent: "space-between",
});

const Header = () => {

  return (
    <AppBar component="nav" position="static" sx={{ height: "10%" }}>
      <MyToolbar >
        <Typography variant="subtitle1" sx={{ paddingTop: "0px"}}>
          No note open
        </Typography>
        <IconButton  sx={{}}>
          <Icons.More size={30} />
        </IconButton>
      </MyToolbar>
    </AppBar>
  );
};

export default Header;
