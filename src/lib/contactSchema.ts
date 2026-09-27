import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  brief: z.string().trim().min(10, "Tell me a bit more about the project").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
