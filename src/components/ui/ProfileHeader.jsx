
import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../config/reactQuery";
import { updateUserPhoto } from "../../api/users";

/**
 * A header component for the user profile page.
 * It displays the user's profile picture, name, and email, and allows for updating the profile photo.
 *
 * @param {object} props - The component props.
 * @param {object} props.user - The user object.
 * @returns {JSX.Element} The rendered profile header component.
 */
const ProfileHeader = ({ user }) => {
  const fileInputRef = useRef(null);

  const mutation = useMutation({
    mutationFn: updateUserPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Error updating profile photo:", error.message);
    },
  });

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <Paper sx={{ p: 3, width: "100%" }} elevation={5}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {user && (
          <Box
            sx={{ position: "relative", cursor: "pointer" }}
            onClick={handleImageClick}
          >
            <Box
              component="img"
              src={user.photo}
              alt="Profile"
              sx={{
                width: { xs: 150, sm: 200 },
                height: { xs: 150, sm: 200 },
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                filter: mutation.isPending ? "brightness(0.5)" : "none",
                transition: "filter 0.2s",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                opacity: 0,
                transition: "opacity 0.3s",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <Typography variant="caption">Change Photo</Typography>
            </Box>
            {mutation.isPending && (
              <CircularProgress
                size={40}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-20px",
                  marginLeft: "-20px",
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontSize: { xs: "1.8rem", sm: "2.125rem" } }}>
            {user?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;
