import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/posts";
import { toast } from "react-toastify";

/**
 * A custom hook for updating a post.
 * Utilizes React Query's useMutation for handling the mutation state.
 * @returns {object} The mutation object from React Query, which includes properties like `mutate`, `isLoading`, etc.
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, postData }) => updatePost(postId, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};