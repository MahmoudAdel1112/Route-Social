import { useAuth } from "../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import ProfileHeader from "../components/ui/ProfileHeader";
import UserPosts from "../components/ui/UserPosts";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* TODO: Make title and description dynamic with user's data */}
      <title>Your Profile | Route Social</title>
      <meta
        name="description"
        content="View and manage your profile, posts, and connections on Route Social. Customize your presence in the community."
      />
      <ProfileHeader user={user} />
      <UserPosts userId={user?._id} />
    </>
  );
};

export default Profile;
