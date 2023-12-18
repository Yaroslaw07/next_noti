import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import SidebarWrapper from "./SidebarItemWrapper";
import { useVaults } from "@/lib/hooks/useVaults";
import { useRouter } from "next/router";
import { FC } from "react";
import { useNotesListUpdate } from "@/lib/hooks/useNotesListUpdate";

const AddModule: FC = () => {
  const router = useRouter();
  const { setToNotesListUpdate } = useNotesListUpdate();
  const { currentVault } = useVaults();

  const handleClick = async () => {
    const res = await fetch("/api/notes/newNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vaultId: currentVault?.id,
      }),
    });

    if (res.ok) {
      const body = await res.json();
      const noteId = body.note.id;
      setToNotesListUpdate(true);
      router.push(`/note/${noteId}`);
    }
  };

  return (
    <SidebarWrapper onClick={handleClick}>
      <Icons.Plus sx={{ fontSize: "24px" }} />
      <Typography variant="subtitle1">New Note</Typography>
    </SidebarWrapper>
  );
};

export default AddModule;
