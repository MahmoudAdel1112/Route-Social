import { useRouteError, Link } from "react-router-dom";
import errorImg from "../assets/images/undraw_fixing-bugs_13mt.svg";
import { Box, Button, Container, Typography } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <title>Error | Route Social</title>
      <meta
        name="description"
        content="Sorry, an unexpected error has occurred. Please try again later."
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
            src={errorImg}
            alt="An error occurred"
            sx={{
              maxWidth: { xs: "250px", sm: "350px" },
              height: "auto",
              mb: 4,
            }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            We’re sorry, but an unexpected error has occurred.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 4 }}>
            <i>{error.statusText || error.message}</i>
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Go to Homepage
          </Button>
        </Box>
      </Container>
    </>
  );
}
