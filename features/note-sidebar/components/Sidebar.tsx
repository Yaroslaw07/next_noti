import { Stack } from "@mui/material";
import { FC } from "react";
import VaultSidebar from "./modules/VaultModule";
import HR from "@/components/ui/HR";
import NotesList from "./notes/NotesList";
import SidebarWrapper from "./SidebarWrapper";
import SidebarModules from "./modules/SidebarModules";

const Sidebar: FC = () => {
  return (
    <SidebarWrapper>
      <Stack
        spacing={0.4}
        alignItems={"center"}
        sx={{
          height: "100%",
        }}
      >
        <VaultSidebar />
        <HR />
        <SidebarModules />
        <HR />
        <NotesList />
      </Stack>
    </SidebarWrapper>
  );
};

export default Sidebar;
