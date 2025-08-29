import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(30, "Comment cannot be more than 30 characters"),
});
