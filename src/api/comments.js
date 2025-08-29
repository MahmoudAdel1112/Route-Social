import axios from "axios";
import { BASE_URL } from "../constants";

const token = localStorage.getItem("token");

/**
 * Creates a new comment on a post.
 *
 * @param {string} content The text content of the comment.
 * @param {string} post The ID of the post to comment on.
 * @returns {Promise<object>} A promise that resolves to the newly created comment object.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function createComment(content, post) {
  try {
    const response = await axios.post(
      `${BASE_URL}/comments`,
      { content, post },
      {
        headers: { token },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating comment:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create comment");
  }
}

/**
 * Updates an existing comment.
 *
 * @param {object} params - The parameters for updating a comment.
 * @param {string} params.commentId The ID of the comment to update.
 * @param {string} params.content The new content of the comment.
 * @returns {Promise<object>} A promise that resolves to the updated comment object.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function updateComment({ commentId, content }) {
  try {
    const response = await axios.put(
      `${BASE_URL}/comments/${commentId}`,
      { content },
      {
        headers: { token },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating comment:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to update comment");
  }
}

/**
 * Deletes a comment.
 *
 * @param {string} commentId The ID of the comment to delete.
 * @returns {Promise<object>} A promise that resolves to the result of the delete operation.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function deleteComment(commentId) {
  try {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting comment:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to delete comment");
  }
}
