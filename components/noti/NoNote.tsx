import { Container, Stack, Typography } from "@mui/material";
import { Icons } from "../Icons";


const NoNote = () => {
    return (
      <Container component="main" sx={{ height: "90%" }}>
        <Stack
          spacing={1}
          minHeight={"100%"}
          alignItems="center"
          justifyContent="center"
          textAlign={"center"}
          component="section"
        >
          <Icons.NoNoteOpen size={180} />
          <Typography variant="h3" sx={{ fontWeight: "600" }}>
            No note open
          </Typography>
        </Stack>
      </Container>
    );
}

export default NoNote;