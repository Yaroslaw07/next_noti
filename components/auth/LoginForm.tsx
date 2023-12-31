import { validateEmail, validatePassword } from "@/lib/validator";
import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { FC } from "react";
import EmailInputComponent from "../form/EmailInput";
import PasswordInputComponent from "../form/PasswordInput";
import HR from "../ui/HR";

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const validateInputs = () => {
    const emailError = validateEmail(email);
    emailError ? setEmailErrorText(emailError) : setEmailErrorText("");

    const passwordError = validatePassword(password);
    passwordError
      ? setPasswordErrorText(passwordError)
      : setPasswordErrorText("");

    return emailError === "" && passwordError === "";
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateInputs()) {
      handleSubmit(e);
    }
  };

  return (
    <Stack
      component="form"
      spacing={1.5}
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
      <EmailInputComponent
        onEmailChange={handleEmailChange}
        emailErrorText={emailErrorText}
      />
      <PasswordInputComponent
        onPasswordChange={handlePasswordChange}
        passwordErrorText={passwordErrorText}
      />
      <HR />
      <Button type="submit" fullWidth variant="contained">
        Log In
      </Button>
    </Stack>
  );
};

export default LoginForm;
