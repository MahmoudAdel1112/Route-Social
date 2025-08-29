import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

/**
 * A component that protects routes from unauthenticated access.
 * It redirects unauthenticated users to the login page.
 *
 * @param {object} props - The component props.
 * @param {JSX.Element} props.children - The child elements to render if the user is authenticated.
 * @returns {JSX.Element} The rendered child elements or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !loading && !toastShownRef.current) {
      toast.error("You must be logged in to access this page.");
      toastShownRef.current = true;
    }
    // Reset toastShownRef when isAuthenticated changes to allow toast on subsequent unauthenticated attempts
    if (isAuthenticated) {
      toastShownRef.current = false;
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Container>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back to their original
    // destination after they log in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
