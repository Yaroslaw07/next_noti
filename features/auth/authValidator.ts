import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3).max(20),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const signupSchema = userSchema.merge(
  loginSchema.pick({ email: true, password: true })
);
