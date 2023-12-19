import { Box, Container, Input } from "@mui/material";
import TextArea from "../ui/TextArea";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useCallback, useEffect, useRef, useState } from "react";
import Backdrop from "../ui/Backdrop";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import { updateContent, updateTitle } from "@/lib/store/reducers/currentNote";
import { Socket, io } from "socket.io-client";
import { useNotesListUpdate } from "@/lib/hooks/useNotesListUpdate";

let socket: Socket;

const Note = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { note, status } = useCurrentNote();
  const { setToNotesListUpdate } = useNotesListUpdate();

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const toUpdateSidebar = useRef(false);

  useEffect(() => {
    setTitle(note?.title! || "");

    return () => {
      if (toUpdateSidebar) {
        setToNotesListUpdate(true);
      }
    };
  }, [note?.title]);

  useEffect(() => {
    setContent(note?.content! || "");
  }, [note?.content]);

  const socketInitializer = useCallback(async () => {
    if (status === "success") {
      await fetch("/api/socket");

      socket = io({
        path: "/api/socket.io",
      });

      socket.on("connect", () => {
        console.log("Connected", socket.id);
      });
    }
  }, [status]);

  useEffect(() => {
    socketInitializer();

    return () => {
      socket?.disconnect();
    };
  }, [socketInitializer]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    dispatch(updateTitle({ title: newTitle }));
    socket?.emit("updateTitle", { newTitle, noteId: note?.id });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    dispatch(updateContent({ content: newContent }));
    socket?.emit("updateContent", { newContent, noteId: note?.id });
  };

  if (status === "loading" && title !== "") return <Backdrop open={true} />;

  return (
    <Box sx={{ paddingX: "80px" }}>
      <Container
        component="main"
        maxWidth="md"
        sx={{ height: "90%", marginX: "auto" }}
      >
        <Box sx={{ height: "80px" }}></Box>
        <Input
          sx={{ fontWeight: "600", marginBottom: "20px", fontSize: "3rem" }}
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <TextArea value={content} onChange={handleContentChange}></TextArea>
      </Container>
    </Box>
  );
};

export default Note;