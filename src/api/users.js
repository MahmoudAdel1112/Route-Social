
import axios from "axios";
import { BASE_URL } from "../constants";

const token = localStorage.getItem("token");

/**
 * Updates the user's profile photo.
 *
 * @param {File} file The image file to upload.
 * @returns {Promise<object>} A promise that resolves to the updated user object.
 * @throws {Error} Throws an error if the API call fails.
 */
export const updateUserPhoto = async (file) => {
  const formData = new FormData();
  formData.append("photo", file);

  try {
    const response = await axios.put(
      `${BASE_URL}/users/upload-photo`,
      formData,
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile photo"
    );
  }
};
