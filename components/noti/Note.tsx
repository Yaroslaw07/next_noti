import { Box, Container, Input, Stack, Typography } from "@mui/material";
import TextArea from "../ui/TextArea";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useCallback, useEffect, useState } from "react";
import Backdrop from "../ui/Backdrop";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { updateTitle } from "@/lib/reducers/currentNote";
import { Socket, io } from "socket.io-client";


let socket: Socket;

const Note = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { note, status } = useCurrentNote();
  const [title, setTitle] = useState(note?.title || "");
  

  useEffect(() => {
    setTitle(note?.title! || "");
  }, [note]);

  const socketInitializer = useCallback(async () => {

    if (note === undefined) return;

    await fetch("/api/socket");

    socket = io({
      path: "/api/socket.io",
    });

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("updateTitle", (newTitle) => {
      console.log("New message in client", newTitle);
      setTitle(newTitle);
    });
  },[]);

  useEffect(() => {
    socketInitializer();
  },[socketInitializer]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const newTitle = event.target.value;
    dispatch(updateTitle({ title: newTitle }));
    socket?.emit("updateTitle", newTitle);
    console.log(title);
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
        <TextArea></TextArea>
      </Container>
    </Box>
  );
};

export default Note;
