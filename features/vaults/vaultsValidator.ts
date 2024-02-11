import { z } from "zod";

export const vaultSchema = z.object({
  name: z.string().min(3).max(20),
});
