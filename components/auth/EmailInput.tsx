import { TextField } from "@mui/material";
import { FC } from "react";

interface EmailInputProps {
  onEmailChange: (value: string) => void;
  emailErrorText?: string;
}

const EmailInputComponent: React.FC<EmailInputProps> = ({
  onEmailChange,
  emailErrorText,
}) => {
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event.target.value);
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      error={!!emailErrorText}
      helperText={emailErrorText}
      onChange={handleEmailChange}
    />
  );
};

export default EmailInputComponent;
