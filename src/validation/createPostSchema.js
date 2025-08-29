
import { z } from "zod";

export const createPostSchema = z.object({
  body: z.string().min(1, "Post body cannot be empty"),
  image: z.any().optional(),
});
