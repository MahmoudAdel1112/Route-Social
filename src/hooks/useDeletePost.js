import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/posts";
import { toast } from "react-toastify";

/**
 * A custom hook for deleting a post.
 * Utilizes React Query's useMutation for handling the mutation state.
 * @returns {object} The mutation object from React Query, which includes properties like `mutate`, `isLoading`, etc.
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
