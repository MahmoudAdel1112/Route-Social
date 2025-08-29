import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { queryClient } from "../config/reactQuery";

/**
 * A custom hook for creating a new post.
 * Utilizes React Query's useMutation for handling the mutation state.
 * @returns {object} The mutation object from React Query, which includes properties like `mutate`, `isLoading`, etc.
 */
export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch the posts query to show the new post
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
