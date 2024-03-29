import { Stack } from "@mui/material";
import { FC } from "react";
import VaultSidebar from "./modules/VaultModule";
import HR from "@/components/ui/HR";
import NotesList from "../../../../note-infos/components/NotesList";
import SidebarWrapper from "./base/SidebarWrapper";
import SidebarModules from "./modules/SidebarModules";

const Sidebar: FC = () => {
  return (
    <SidebarWrapper>
      <Stack
        spacing={0.2}
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
