import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/signupSchema";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import LognUpImage from "../assets/images/undraw_secure-login_m11a.svg";
import { Link as MuiLink } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { toast } from "react-toastify";
import Phrase from "../components/Phrase";

const Signup = () => {
  const [apiError, setApiError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // Validate on change to get instant feedback
  });

  const navigator = useNavigate();
  const onSubmit = async (data) => {
    setApiError(null); // Reset error on new submission
    try {
      // The 'data' object here is the validated form data from react-hook-form
      console.log("Form data to be sent:", data);

      const response = await axios.post(`${BASE_URL}/users/signup`, data);

      // Start of error handling logic
      if (response.data.message === "success") {
        console.log("Signup successful:", response.data);
        toast.success("Signup successful! Please log in.");
        navigator("/login");
      } else {
        setApiError(response.data.message || "An unexpected error occurred.");
      }
      // End of error handling logic
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
      setApiError(
        error.response?.data?.message ||
          "An unexpected network error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <title>Sign Up | Route Social</title>
      <meta
        name="description"
        content="Create your account on Route Social to start connecting with friends and sharing your life. It's quick and easy."
      />
      <Grid
        container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
        }}
      >
        <Grid
          size={{ md: 5, xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            order: {
              xs: 2,
              md: 1,
            },
          }}
          mt={5}
        >
          <Container maxWidth="sm">
            <Typography variant="h5" component="h1" gutterBottom mb={3}>
              Sign Up
            </Typography>
            {/* Display API Error Alert */}
            {apiError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>Error</AlertTitle>
                {apiError}
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="rePassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.rePassword}
                        helperText={errors.rePassword?.message}
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // label="Date of Birth"
                        type="date"
                        variant="outlined"
                        fullWidth
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth?.message}
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel size="small">Gender</InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select {...field} label="Gender" size="small">
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors.gender?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    n
                    fullWidth
                    disabled={!isValid}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "7px",
                mt: 3,
              }}
            >
              <MuiLink
                variant="body2"
                underline="hover"
                component={Link}
                to={"/forgot-password"}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MailIcon fontSize="small" />
                  Fogot password
                </div>
              </MuiLink>

              <MuiLink
                variant="body2"
                underline="hover"
                component={Link}
                to={"/login"}
              >
                Already a user, Sign in
              </MuiLink>
            </Box>
          </Container>
        </Grid>
        <Grid
          size={{ md: 7, xs: 12 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: { md: "100%" },
            order: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "300px", sm: "400px", md: "500px", lg: "600px" },
              display: "felx",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={LognUpImage}
              alt="Signup"
              style={{ height: "auto", width: "90%" }}
            />

            <Phrase
              phrase={"Join the community — share your world with others."}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
