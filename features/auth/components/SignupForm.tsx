import { Button, Stack } from "@mui/material";
import { FC } from "react";
import EmailInputComponent from "../../../components/inputs/EmailInput";
import PasswordInputComponent from "../../../components/inputs/PasswordInput";
import UsernameInputComponent from "../../../components/inputs/UsernameInput";
import HR from "../../../components/ui/HR";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../authValidator";
import { SignupCredentials } from "../types/authTypes";

interface SignupFormProps {
  handleSubmit: (e: SignupCredentials) => void;
}

const SignupForm: FC<SignupFormProps> = ({ handleSubmit }) => {
  const {
    handleSubmit: onSubmit,
    formState: { errors },
    control,
  } = useForm<SignupCredentials>({
    resolver: zodResolver(signupSchema),
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
      <UsernameInputComponent
        control={control}
        error={errors.username?.message}
      />
      <EmailInputComponent control={control} error={errors.email?.message} />
      <PasswordInputComponent
        control={control}
        error={errors.password?.message}
      />

      <HR />
      <Button type="submit" fullWidth variant="contained">
        Sign Up
      </Button>
    </Stack>
  );
};

export default SignupForm;
