import { useMutation } from "@tanstack/react-query";
import { createComment } from "../api/comments";
import { queryClient } from "../config/reactQuery";
import { toast } from "react-toastify";

/**
 * A custom hook for creating a new comment.
 * Utilizes React Query's useMutation for handling the mutation state.
 * @returns {object} The mutation object from React Query, which includes properties like `mutate`, `isLoading`, etc.
 */
export const useCreateComment = () => {
  return useMutation({
    mutationFn: ({ content, post }) => createComment(content, post),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Comment created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
