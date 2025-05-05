import { z } from "zod";

export const createIssueSchema = z.object({
  description: z.string().min(1).max(250),
  title: z.string().min(1).max(250),
});

export const updateIssueSchema = z.object({
  assigneeUserID: z.string().min(1).max(30).optional().nullable(),
  description: z.string().min(1).max(250).optional(),
  title: z.string().min(1).max(250).optional(),
});
