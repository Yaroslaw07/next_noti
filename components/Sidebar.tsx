import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
} from "@mui/material";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <Paper
      component="aside"
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#ededed",
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
      }}
    >
      Sidebar Content
    </Paper>
  );
};

export default Sidebar;
