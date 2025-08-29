import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import Footer from "../components/ui/Footer";
import { Box } from "@mui/material";

const RootLayout = () => {
  return (
    <>
      <title>Route Social</title>
      <meta
        name="description"
        content="A social media application built with React, enabling users to connect and share content seamlessly."
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <main>
          <Outlet />
        </main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ScrollToTopButton />
        <Footer />
      </Box>
    </>
  );
};

export default RootLayout;
