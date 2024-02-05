import { Icons } from "@/components/Icons";
import { FC } from "react";
import SidebarItem from "./base/SidebarItem";
import { useNotesInfo } from "../hooks/useNotesInfo";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";

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
