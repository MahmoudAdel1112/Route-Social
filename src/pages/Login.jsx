import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  AlertTitle,
  Link as MuiLink,
} from "@mui/material";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import image from "../assets/images/undraw_sign-in_uva0.svg";
import { loginSchema } from "../validation/loginSchema";
import Phrase from "../components/Phrase";

const Login = () => {
  const [apiError, setApiError] = useState(null);
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const navigator = useNavigate();

  const onSubmit = async (data) => {
    setApiError(null);
    const result = await login(data);

    if (result.success) {
      toast.success("Login successful!");
      navigator("/home");
    } else {
      setApiError(
        result.error || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <>
      <title>Login | Route Social</title>
      <meta
        name="description"
        content="Log in to your Route Social account to access your feed, connect with friends, and share what's on your mind."
      />
      <Grid
        container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* ✅ Left Side: Image */}
        <Grid
          size={{ md: 6, xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            order: { xs: 1, md: 1 },
            //   backgroundColor: (theme) =>
            //     theme.palette.mode === "dark" ? "#000" : "#ffffff",
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "300px", sm: "400px", md: "500px", lg: "600px" },
              width: "100%",
              p: 2,
            }}
          >
            <img
              src={image}
              alt="Login Illustration"
              style={{ height: "auto", width: "100%" }}
            />
            <Phrase phrase={"Welcome back — let’s pick up the conversation."} />
          </Box>
        </Grid>

        {/* ✅ Right Side: Login Form */}
        <Grid
          size={{ md: 6, xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            order: { xs: 2, md: 2 },
          }}
          p={3}
        >
          <Container maxWidth="sm">
            <Typography variant="h5" component="h1" gutterBottom mb={3}>
              Login
            </Typography>

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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isValid}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <MuiLink
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
              >
                Forgot password?
              </MuiLink>
              <MuiLink component={RouterLink} to="/signup" variant="body2">
                Don&apos;t have an account? Sign Up
              </MuiLink>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
