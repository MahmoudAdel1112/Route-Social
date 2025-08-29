import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

/**
 * A custom React Hook for fetching and managing post data using TanStack Query.
 *
 * @returns {Object} An object containing the query results:
 *   - `data`: An array of post objects, or `undefined` if not yet loaded.
 *   - `isLoading`: A boolean indicating if the query is currently fetching data.
 *   - `isError`: A boolean indicating if the query encountered an error.
 *   - `error`: The error object if `isError` is true.
 *   - ... (other properties provided by useQuery)
 */
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"], // Unique key for caching and invalidation
    queryFn: fetchPosts, // The function that fetches the data
    // Optional: Add more useQuery options here, e.g., staleTime, refetchOnWindowFocus
    // staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
  });
};
