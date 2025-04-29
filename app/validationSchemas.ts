import { z } from "zod";

export const issueSchema = z.object({
  description: z.string().min(1),
  title: z.string().min(1).max(250),
});
