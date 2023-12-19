import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import SidebarWrapper from "./SidebarItem";
import { useVaults } from "@/lib/hooks/useVaults";
import { useRouter } from "next/router";
import { FC } from "react";
import { useNotesListUpdate } from "@/lib/hooks/useNotesListUpdate";

const NewNoteModule: FC = () => {
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
    <SidebarWrapper
      onClick={handleClick}
      Icon={Icons.newNote}
      title={"New Note"}
    ></SidebarWrapper>
  );
};

export default NewNoteModule;
