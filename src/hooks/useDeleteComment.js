import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../api/comments";
import { queryClient } from "../config/reactQuery";
import { toast } from "react-toastify";

/**
 * A custom hook for deleting a comment.
 * Utilizes React Query's useMutation for handling the mutation state.
 * @returns {object} The mutation object from React Query, which includes properties like `mutate`, `isLoading`, etc.
 */
export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
