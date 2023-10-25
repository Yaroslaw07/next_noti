import NotiLayout from "@/components/noti/Layout";
import Note from "@/components/noti/Note";
import { useRouter } from "next/router";

export default function NotePage() {
  const router = useRouter();

  const id = router.query.noteId;

  return (
    <NotiLayout>
      <Note/>
    </NotiLayout>
  );
}
