import { Box, Button, TextField } from "@mui/material"
import { FC } from "react";


interface AuthFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    AnotherAuthLink: React.FC;
}

const AuthForm: FC<AuthFormProps> = ({ handleSubmit, AnotherAuthLink }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
        Sign In
      </Button>
      <AnotherAuthLink />
    </Box>
  );
};

export default AuthForm;