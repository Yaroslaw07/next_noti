import { getNotiLayout } from "@/components/noti/Layout";
import { useRouter } from "next/router";
import MyBackdrop from "@/components/ui/Backdrop";
import NoNote from "@/components/noti/NoNote";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setCurrentNote } from "@/lib/reducers/currentNote";
import { useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import { useAuth } from "@/lib/hooks/useAuth";

const NoNotePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { status } = useAuth();

  if (status == "unauthenticated") {
    router.replace("/login");
  }

  const dispatch = useDispatch<AppDispatch>();
  const note = null;

  useEffect(() => {
    dispatch(setCurrentNote({ note }));
  });

  return (
    <>
      <MyBackdrop open={status === "loading"} />
      <NoNote />
    </>
  );
};

NoNotePage.getLayout = (page) => {
  return getNotiLayout(page);
};

export default NoNotePage;
