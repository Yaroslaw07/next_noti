import { Box, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";
import VaultModule from "./VaultModule";
import HR from "@/components/ui/HR";
import SettingsModule from "./SettingsModule";
import AddModule from "./AddModule";
import NotesList from "./NotesList";
import SidebarPaper from "./SidebarPaper";
import { SidebarUpdateProvider } from "@/lib/contexts/sidebarUpdateContext";

const Sidebar: FC = () => {

  return (
    <SidebarUpdateProvider>
      <SidebarPaper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flexWrap: "nowrap",
            height: "100%",
          }}
        >
          <VaultModule />
          <HR />
          <SettingsModule />
          <AddModule />
          <HR />
          <NotesList />
        </Box>
      </SidebarPaper>
    </SidebarUpdateProvider>
  );
};

export default Sidebar;
