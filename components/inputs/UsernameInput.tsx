import React from "react";
import { TextField } from "@mui/material";
import {
  Control,
  Controller,
  UseFormRegisterReturn,
  useController,
} from "react-hook-form";

interface UsernameInputProps {
  control: Control<any>;
  error?: string | undefined;
}

const UsernameInputComponent: React.FC<UsernameInputProps> = ({
  control,
  error,
}) => {
  const { field } = useController({ name: "username", control });

  return (
    <Controller
      name="username"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          size="small"
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          error={!!error}
          helperText={error || ""}
        />
      )}
    />
  );
};

export default UsernameInputComponent;
