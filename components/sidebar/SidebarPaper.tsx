import { Paper } from "@mui/material";
import { FC } from "react";

interface SidebarPaperProps {
  children: React.ReactNode;
}

const SidebarPaper:FC<SidebarPaperProps> = ({children}) => {
    return (
         <Paper
      sx={{ marginRight: "1px" }}
      component="aside"
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#ededed",
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}
    >
        {children}
        </Paper>
    )
};


export default SidebarPaper