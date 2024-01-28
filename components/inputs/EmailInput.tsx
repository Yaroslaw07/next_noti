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
      size="small"
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      // inputProps={{
      //   style: {
      //     // height: "2rem",
      //     fontSize: "1.5rem",
      //   },
      // }}
      error={!!emailErrorText}
      helperText={emailErrorText}
      onChange={handleEmailChange}
    />
  );
};

export default EmailInputComponent;
