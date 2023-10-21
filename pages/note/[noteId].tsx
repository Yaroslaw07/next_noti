import NotiLayout from "@/components/noti/Layout";
import { useRouter } from "next/router";

export default function NotePage() {
  const router = useRouter();

  const id = router.query.noteId;

  return (
    <NotiLayout>
      <h1>Note {id}</h1>
    </NotiLayout>
  );
}
