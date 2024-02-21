import { Icons } from "@/components/Icons";
import { FC } from "react";
import SidebarItem from "./base/SidebarItem";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/router";
import { useNotesInfo } from "@/features/note-infos/hooks/useNotesInfo";

const NewNoteModule: FC = () => {
  const router = useRouter();

  const { addNote } = useNotesInfo();
  const { openToast } = useToast();

  const handleClick = async () => {
    const { ok, data, message } = await addNote();

    if (!ok) {
      openToast(message, "error");
    } else {
      router.push(`/notes/${data.id}`);
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
