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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2px",flexWrap:"nowrap",height:"100%"}}>
        <VaultModule />
        <HR />
        <SettingsModule />
        <AddModule />
        <HR />
        <NotesList />
      </Box>
    </SidebarPaper>
  );
};

export default Sidebar;
