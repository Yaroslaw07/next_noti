import { Icons } from "@/components/Icons";
import { FC } from "react";
import SidebarItem from "./base/SidebarItem";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/router";
import { useNotesInfo } from "@/features/note-infos/hooks/useNotesInfo";
import { v4 as uuidv4 } from "uuid";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";

const NewNoteModule: FC = () => {
  const router = useRouter();

  const { addNewNote } = useNotesInfo();
  const { openToast } = useToast();
  const { currentNoteId, setCurrentNoteId } = useCurrentNote();

  const handleClick = async () => {
    const newNoteId = uuidv4();

    const lastId = currentNoteId;
    setCurrentNoteId(null);

    const response = await addNewNote(newNoteId);

    if (response.ok) {
      router.push(`/notes/${response.data.id}`);
    } else {
      setCurrentNoteId(lastId);
      openToast("Failed to create a new note", "error");
    }
  };

  return (
    <SidebarItem
      onClick={handleClick}
      Icon={Icons.newNote}
      title={"New Note"}
    ></SidebarItem>
  );
};

export default NewNoteModule;
