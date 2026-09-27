import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  subject: z.string().trim().min(2, "Enter a subject").max(200),
  brief: z.string().trim().min(10, "Tell me a bit more about the project").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
