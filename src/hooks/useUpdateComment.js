import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../api/comments";
import { queryClient } from "../config/reactQuery";
import { toast } from "react-toastify";

/**
 * A custom hook for updating a comment.
 * Utilizes React Query's useMutation for handling the mutation state.
 * @returns {object} The mutation object from React Query, which includes properties like `mutate`, `isLoading`, etc.
 */
export const useUpdateComment = () => {
  return useMutation({
    mutationFn: ({ commentId, content }) => updateComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Comment updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
