import React, { useState } from "react";
import { Box, Button, Link } from "@mui/material";
import { FC } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/lib/validator";
import EmailInputComponent from "./emailInput";
import PasswordInputComponent from "./passwordInput";
import UsernameInputComponent from "./usernameInput";

interface SignupFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignupForm: FC<SignupFormProps> = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [usernameErrorText, setUsernameErrorText] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const validateInputs = () => {
    const usernameError = validateUsername(username);
    usernameError
      ? setUsernameErrorText(usernameError)
      : setUsernameErrorText("");

    const emailError = validateEmail(email);
    emailError ? setEmailErrorText(emailError) : setEmailErrorText("");

    const passwordError = validatePassword(password);
    passwordError
      ? setPasswordErrorText(passwordError)
      : setPasswordErrorText("");

    return usernameError === "" && emailError === "" && passwordError === "";
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateInputs()) {
      handleSubmit(e);
    }
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
      <UsernameInputComponent
        onUsernameChange={handleUsernameChange}
        usernameErrorText={usernameErrorText}
      />
      <EmailInputComponent
        onEmailChange={handleEmailChange}
        emailErrorText={emailErrorText}
      />
      <PasswordInputComponent
        onPasswordChange={handlePasswordChange}
        passwordErrorText={passwordErrorText}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
