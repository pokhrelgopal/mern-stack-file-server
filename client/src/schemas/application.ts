import { z } from "zod";

const createApplicationSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
});

const updateApplicationSchema = z.object({
  name: z.string().optional(),
});

type CreateApplicationData = z.infer<typeof createApplicationSchema>;
type UpdateApplicationData = z.infer<typeof updateApplicationSchema>;

export { createApplicationSchema, updateApplicationSchema };
export { type CreateApplicationData, type UpdateApplicationData };
