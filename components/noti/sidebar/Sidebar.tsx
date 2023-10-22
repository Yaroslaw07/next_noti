import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import VaultModule from "./VaultModule";
import HR from "@/components/ui/HR";
import SettingsModule from "./SettingsModule";
import AddModule from "./AddModules";
import NotesList from "./NotesList";
import SidebarPaper from "./SidebarPaper";

const Sidebar: FC = () => {
  return (
    <SidebarPaper>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <VaultModule />
        <HR />
        <AddModule />
        <NotesList />
      </Box>
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <SettingsModule />
        <HR />
        <Typography sx={{ textAlign: "center", fontSize: "0.8rem" }}>
          Noti v0.1.0
        </Typography>
      </Box>
    </SidebarPaper>
  );
};

export default Sidebar;
