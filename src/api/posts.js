import axios from "axios";
import { BASE_URL } from "../constants";

const token = localStorage.getItem("token");

/**
 * Fetches a list of posts.
 *
 * @returns {Promise<Array<object>>} A promise that resolves to an array of post objects.
 * @throws {Error} Throws an error if the API call fails.
 */
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts?limit=50`, {
      headers: { token },
    });
    return response.data.posts;
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

/**
 * Creates a new post.
 *
 * @param {FormData} postData The data for the new post, including body and optional image.
 * @returns {Promise<object>} A promise that resolves to the newly created post object.
 * @throws {Error} Throws an error if the API call fails.
 */
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, postData, {
      headers: {
        token,
        "Content-Type": "form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

/**
 * Fetches all posts for a specific user.
 *
 * @param {string} userId The ID of the user whose posts are to be fetched.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of post objects.
 * @throws {Error} Throws an error if the API call fails.
 */
export const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
      headers: {
        token,
      },
    });
    return response.data.posts;
  } catch (error) {
    console.error(
      "Error fetching user posts:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch user posts"
    );
  }
};

/**
 * Updates an existing post.
 *
 * @param {string} postId The ID of the post to update.
 * @param {FormData} postData The updated data for the post.
 * @returns {Promise<object>} A promise that resolves to the updated post object.
 * @throws {Error} Throws an error if the API call fails.
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await axios.put(`${BASE_URL}/posts/${postId}`, postData, {
      headers: {
        token,
        "Content-Type": "form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

/**
 * Deletes a post.
 *
 * @param {string} postId The ID of the post to delete.
 * @returns {Promise<object>} A promise that resolves to the result of the delete operation.
 * @throws {Error} Throws an error if the API call fails.
 */
export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

/**
 * Fetches a single post by its ID.
 *
 * @param {string} postId The ID of the post to fetch.
 * @returns {Promise<object>} A promise that resolves to the post object.
 * @throws {Error} Throws an error if the API call fails.
 */
export const getPost = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
      headers: {
        token,
      },
    });
    return response.data.post;
  } catch (error) {
    console.error(
      "Error fetching post:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch post");
  }
};
