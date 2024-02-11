import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Icons } from "../Icons";
import { Control, Controller } from "react-hook-form";

interface PasswordInputProps {
  control: Control<any>;
  error: string | undefined;
}

const PasswordInputComponent: React.FC<PasswordInputProps> = ({
  control,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          size="small"
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          error={!!error}
          helperText={error || ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? (
                    <Icons.HidePassword />
                  ) : (
                    <Icons.ShowPassword />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default PasswordInputComponent;
