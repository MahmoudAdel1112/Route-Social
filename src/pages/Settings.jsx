import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";

// Zod schema for validation
const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

// The mutation function that will be called by React Query
const changePassword = async (passwordData) => {
  // We need the token to authorize this request
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const { data } = await axios.patch(
    `${BASE_URL}/users/change-password`, // Assuming this is your endpoint
    passwordData,
    {
      headers: { token },
    }
  );
  return data;
};

const Settings = () => {
  const { loading } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      setSnackbarOpen(true);
      reset(); // Clear the form fields
    },
    onError: (error) => {
      // The error object from axios is nested in error.response.data
      console.error("Error changing password:", error);
    },
  });

  const onSubmit = (data) => {
    const { oldPassword, newPassword } = data;

    // Map oldPassword → password (as backend expects)
    mutation.mutate({
      password: oldPassword,
      newPassword,
    });
  };

  if (loading) {
    return (
      <>
        <div>Loading</div>
      </>
    );
  }

  return (
    <>
      <title>Settings | Route Social</title>
      <meta
        name="description"
        content="Manage your account settings, privacy, and preferences on Route Social. Take control of your experience."
      />
      <Container sx={{ mt: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h6">Change Password</Typography>

          <TextField
            label="Current Password"
            type="password"
            {...register("oldPassword")}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
          />
          <TextField
            label="New Password"
            type="password"
            {...register("newPassword")}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          {mutation.isError && (
            <Alert severity="error">
              {mutation.error.response?.data?.message || mutation.error.message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending || !isValid}
            sx={{ mt: 2 }}
          >
            {mutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "Change Password"
            )}
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Password changed successfully!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Settings;
