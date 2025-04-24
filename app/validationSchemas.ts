import { z } from "zod";

export const createIssueSchema = z.object({
  description: z.string().min(1),
  title: z.string().min(1).max(250),
});
