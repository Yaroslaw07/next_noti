import { useRouter } from "next/router";
import { use } from "react";

export default function NotePage() {
    const router = useRouter();

    const id = router.query.noteId;

    return <div>
        <h1>Note {id}</h1>
    </div>


}