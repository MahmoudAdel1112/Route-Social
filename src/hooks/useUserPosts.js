import { useQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "../api/posts";

/**
 * A custom hook for fetching posts for a specific user.
 * @param {string} userId The ID of the user whose posts are to be fetched.
 * @returns {object} The query object from React Query, which includes properties like `data`, `isLoading`, etc.
 */
export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["posts", { userId }],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId,
  });
};
