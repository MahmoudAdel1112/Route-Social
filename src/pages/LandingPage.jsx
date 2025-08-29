import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginPana from "../assets/images/undraw_online-community_3o0l.svg";

const LandingPage = () => {
  return (
    <>
      <title>Welcome to Route Social | Connect and Share</title>
      <meta
        name="description"
        content="Join Route Social, a vibrant community to connect with friends, share your moments, and discover new content. Sign up today!"
      />
      <Container
        maxWidth="md"
        sx={{ textAlign: "center", py: { xs: 4, md: 3 } }}
      >
        <Box
          component="img"
          src={LoginPana}
          alt="Welcome"
          sx={{
            maxWidth: { xs: "300px", md: "400px" },
            height: "auto",
          }}
        />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: "2.5rem", md: "3.75rem" },
          }}
        >
          Welcome to Route Social
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Connect with friends, share your thoughts, and be part of a growing
          community.
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="outlined"
            color="primary"
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;
