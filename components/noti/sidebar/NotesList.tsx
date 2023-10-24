import { List, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import SidebarModule from "./SidebarModule";
import Link from "@/components/ui/Link";
import useVaults from "@/hooks/useVaults";
import { NoteInfo } from "@/types/types";
import { useEffect, useState } from "react";

const fetchNotes = async (currentVaultId: string) => {
  // const notes = await fetch("/api/notes/?vaultId=currentVaultId", {
  //   method: "GET",
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  return [
    { id: "dasda", title: "Hello" },
    { id: "da5", title: "Hello2" },
  ];
};

const NotesList = () => {
  const { currentVault } = useVaults();
  const [notes, setNotes] = useState<NoteInfo[]>([]);

  useEffect(() => {
    if (currentVault) {
      fetchNotes(currentVault.id)
        .then((data) => {
          console.log(data); // Optionally log the data
          setNotes(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentVault]);

  return (
    <>
      <Link href="/note" sx={{ textDecoration: "none", paddingBottom: "0px" }}>
        <SidebarModule
          sx={{
            gap: "6px",
            fontSize: "1.2rem",
            paddingLeft: "8px",
          }}
        >
          <Icons.Logo size={30} />
          <Typography variant="h5" sx={{ color: "primary.dark" }}>
            My notes
          </Typography>
        </SidebarModule>
      </Link>

      <List sx={{ paddingY: "0px" }}>
        {notes.map((note) => (
          <NotesItem key={note.id} note={note} />
        ))}
      </List>
    </>
  );
};

export default NotesList;
