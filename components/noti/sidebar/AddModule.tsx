import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import SidebarModule from "./SidebarModule";
import useVaults from "@/hooks/useVaults";
import { useRouter } from "next/router";
import { FC } from "react";

interface SidebarProps {
  onNewNoteAdded: () => void;
}


const AddModule:FC<SidebarProps> = ({onNewNoteAdded}) => {

  const router = useRouter();
  const { currentVault} = useVaults();

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

      onNewNoteAdded();
      router.push(`/note/${noteId}`);
    }
  }


  return (
<SidebarModule onClick={handleClick}>
      <Icons.NewNote size={20} />
      <Typography
        variant="subtitle1"
      >
        New Note
      </Typography>
    </SidebarModule>
  );
};

export default AddModule;