import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Note() {

    const user = useSession();

    return (
      <>
        <Head>
          <title>Your Noti</title>
          <meta name="description" content="Welcome page of Noti" />
        </Head>
        <div></div>
      </>
    );
}