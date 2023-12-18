import { Box } from "@mui/material";
import { FC } from "react";
import VaultSidebar from "./VaultModule";
import HR from "@/components/ui/HR";
import SettingsModule from "./SettingsModule";
import AddModule from "./AddModule";
import NotesList from "./NotesList";
import SidebarWrapper from "./SidebarWrapper";

const Sidebar: FC = () => {
  return (
    <SidebarWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          flexWrap: "nowrap",
          height: "100%",
        }}
      >
        <VaultSidebar />
        <HR />
        <SettingsModule />
        <AddModule />
        <HR />
        <NotesList />
      </Box>
    </SidebarWrapper>
  );
};

export default Sidebar;
