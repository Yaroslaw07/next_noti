import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface EmailInputProps {
  control: Control<any>;
  error: string | undefined;
}

const EmailInputComponent: React.FC<EmailInputProps> = ({ control, error }) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          size="small"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};

export default EmailInputComponent;
