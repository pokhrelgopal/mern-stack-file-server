import { z } from "zod";

const createFileSchema = z.object({
  name: z.string(),
  path: z.string(),
  size: z.number(),
  url: z.string(),
  type: z.string(),
  applicationId: z.string(),
});

type CreateFileData = z.infer<typeof createFileSchema>;

export { createFileSchema, CreateFileData };
