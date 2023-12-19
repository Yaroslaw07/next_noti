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
        <Icons.Empty sx={{ fontSize: "180px" }} />
        <Typography variant="h3" sx={{ fontWeight: "600" }}>
          No note open
        </Typography>
      </Stack>
    </Container>
  );
};

export default NoNote;
