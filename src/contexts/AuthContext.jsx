/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../constants";
import { queryClient } from "../config/reactQuery";

// Create the Auth Context
export const AuthContext = createContext(null);

// Define the function to fetch user data
const fetchUser = async (token) => {
  if (!token) {
    return null;
  }
  try {
    const response = await axios.get(`${BASE_URL}/users/profile-data`, {
      headers: { token },
    });
    return response.data.user;
  } catch (error) {
    // Throw error to be handled by React Query
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Use React Query to fetch and cache user data
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(token),
    enabled: !!token, // Only run the query if a token exists
    refetchOnWindowFocus: false, // Optional: disable refetching on window focus
    retry: 1, // Optional: retry once on failure
    onError: () => {
      // If fetching user fails (e.g., invalid token), clear the token
      setToken(null);
      localStorage.removeItem("token");
    },
  });

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/signin`,
        credentials
      );
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      // After setting the token, the useQuery will automatically trigger.
      // For a faster UI update, you can pre-fetch or set data immediately.
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Login failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    // Remove the user query from the cache to ensure a clean state
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  const authContextValue = {
    user: user || null,
    token,
    isAuthenticated: isSuccess && !isError,
    login,
    logout,
    loading: isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
