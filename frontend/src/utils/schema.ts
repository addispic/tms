import { z } from "zod";

// form field schema
export const FormFieldSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z]/, { message: "username must start with letter" })
    .trim(),
  email: z.string().email({ message: "invalid email address" }).trim(),
  password: z
    .string()
    .min(3, { message: "password is too short" })
    .regex(/[a-zA-Z]/, { message: "password must include at least 1 letter" })
    .regex(/[\d]/, { message: "password must contain at least 1 digit" })
    .regex(/[^a-zA-Z\d]/, {
      message: "must contain at least 1 special character",
    })
    .trim(),
});