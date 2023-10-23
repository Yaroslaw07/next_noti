
import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import SidebarModule from "./SidebarModule";
import useVaults from "@/hooks/useVaults";
import { useEffect } from "react";
import { notes } from "@/types/types";
import { useRouter } from "next/router";

const AddModule = () => {

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
      router.push(`/note/${noteId}`);
      console.log({ body , noteId});
    }
  }

  useEffect(
    () => console.log(notes)
  ,[notes])


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