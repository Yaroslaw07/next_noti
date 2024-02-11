import { Button, Stack } from "@mui/material";
import React from "react";
import { FC } from "react";
import EmailInputComponent from "../../../components/inputs/EmailInput";
import PasswordInputComponent from "../../../components/inputs/PasswordInput";
import HR from "../../../components/ui/HR";
import { LoginCredentials } from "../types/authTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../authValidator";

interface LoginFormProps {
  handleSubmit: (data: LoginCredentials) => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleSubmit }) => {
  const {
    handleSubmit: onSubmit,
    formState: { errors },
    control,
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Stack
      component="form"
      spacing={1.5}
      noValidate
      onSubmit={onSubmit(handleSubmit)}
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <EmailInputComponent control={control} error={errors.email?.message} />
      <PasswordInputComponent
        control={control}
        error={errors.password?.message}
      />
      <HR />
      <Button type="submit" fullWidth variant="contained">
        Log In
      </Button>
    </Stack>
  );
};

export default LoginForm;
