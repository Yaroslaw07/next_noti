import React, { useState } from "react";
import { TextField } from "@mui/material";

interface UsernameInputProps {
  onUsernameChange: (value: string) => void;
  usernameErrorText?: string;
}

const UsernameInputComponent: React.FC<UsernameInputProps> = ({
  onUsernameChange,
  usernameErrorText,
}) => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    onUsernameChange(newUsername);
  };

  return (
    <TextField
      margin="normal"
      size="small"
      fullWidth
      id="username"
      label="Username"
      name="username"
      autoComplete="username"
      error={!!usernameErrorText}
      helperText={usernameErrorText}
      onChange={handleUsernameChange}
    />
  );
};

export default UsernameInputComponent;
