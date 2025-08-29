import { Link } from "react-router-dom";
import notFoundImage from "../assets/images/undraw_page-not-found_6wni.svg";
import { Box, Button, Container, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <>
      <title>404: Page Not Found | Route Social</title>
      <meta
        name="description"
        content="Oops! The page you are looking for does not exist. Let's get you back on track."
      />
      <Container maxWidth="sm">
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            minHeight: "80vh",
          }}
        >
          <Box
            component="img"
            src={notFoundImage}
            alt="Page not found"
            sx={{
              maxWidth: { xs: "250px", sm: "350px" },
              height: "auto",
              mb: 4,
            }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page you’re looking for doesn’t exist or has been moved.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Go to Homepage
          </Button>
        </Box>
      </Container>
    </>
  );
}
