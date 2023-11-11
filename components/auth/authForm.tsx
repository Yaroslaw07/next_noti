import { isEmailValid, isStrongPassword } from "@/lib/auth/validate";
import { useToast } from "@/lib/hooks/useToast";
import { Box, Button, TextField, buttonBaseClasses } from "@mui/material";
import React from "react";
import { FC } from "react";

interface AuthFormProps {
  buttonText: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  AnotherAuthLink: React.FC;
}

const AuthForm: FC<AuthFormProps> = ({
  buttonText,
  handleSubmit,
  AnotherAuthLink,
}) => {
  const [emailErrorText, setEmailErrorText] = React.useState("");
  const [passwordErrorText, setPasswordErrorText] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (email === "") {
      setEmailErrorText("Email can't be empty");
      setPasswordErrorText("");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailErrorText("Not valid email provide");
      setPasswordErrorText("");
      return;
    }

    if (password === "") {
      setEmailErrorText("");
      setPasswordErrorText("Password can't be empty");
      return;
    }

    if (!isStrongPassword(password)) {
      setEmailErrorText("");
      setPasswordErrorText(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    setEmailErrorText("");
    setPasswordErrorText("");

    emailErrorText === "" && passwordErrorText === "" ? handleSubmit(e) : null;
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
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
        error={!!emailErrorText}
        helperText={emailErrorText}
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
        error={!!passwordErrorText}
        helperText={passwordErrorText}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
        {buttonText}
      </Button>
      <AnotherAuthLink />
    </Box>
  );
};

export default AuthForm;
