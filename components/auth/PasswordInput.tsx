import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Icons } from "../Icons";

interface PasswordInputProps {
  onPasswordChange: (value: string) => void;
  passwordErrorText?: string;
}

const PasswordInputComponent: React.FC<PasswordInputProps> = ({
  onPasswordChange,
  passwordErrorText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPasswordChange(event.target.value);
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      error={!!passwordErrorText}
      helperText={passwordErrorText}
      onChange={handlePasswordChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Icons.HidePassword /> : <Icons.ShowPassword />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInputComponent;
