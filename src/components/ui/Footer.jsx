import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        borderTop: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Illustrations by{" "}
          <Link
            href="https://undraw.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            unDraw
          </Link>
          {" | Developed by "}
          <Link
            href="https://github.com/MahmoudAdel1112"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mahmoud Adel
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
