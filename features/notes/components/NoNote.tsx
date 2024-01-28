import { Container, Stack, Typography } from "@mui/material";
import { Icons } from "../../../components/Icons";

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
        <Icons.SelectItem sx={{ fontSize: "200px" }} />
        <Typography variant="h4" sx={{ fontWeight: "400" }}>
          {"Select a note or\n create a new one"}
        </Typography>
      </Stack>
    </Container>
  );
};

export default NoNote;
