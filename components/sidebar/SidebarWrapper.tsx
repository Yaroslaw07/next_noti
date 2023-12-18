import { Box, Paper } from "@mui/material";
import { FC } from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper: FC<SidebarWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        marginRight: "1px",
        width: "240px",
        height: "100dvh",
        padding: "0.33rem",
      }}
    >
      <Paper
        component="aside"
        sx={{
          height: "100%",
          backgroundColor: "additional.main",
          border: "2px solid #262626",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          paddingY: "8px",
          paddingX: "4px",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default SidebarWrapper;
