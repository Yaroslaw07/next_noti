import {
  Paper,
} from "@mui/material";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <Paper sx={{marginRight:"2px"}}
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
