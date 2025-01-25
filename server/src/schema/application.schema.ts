import { z } from "zod";

const createApplicationSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  url: z.string().url("Invalid URL format"),
  apiKey: z.string().min(1, "Key is required").max(255, "Key is too long"),
  userId: z.string().uuid("Invalid UUID format"),
});

const updateApplicationSchema = z.object({
  name: z.string().optional(),
  url: z.string().url().optional(),
  apiKey: z.string().optional(),
});

type CreateApplicationData = z.infer<typeof createApplicationSchema>;
type UpdateApplicationData = z.infer<typeof updateApplicationSchema>;

export { createApplicationSchema, updateApplicationSchema };
export { CreateApplicationData, UpdateApplicationData };
