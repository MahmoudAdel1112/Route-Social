import { useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  Button,
  Modal,
} from "@mui/material";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import { useUserPosts } from "../../hooks/useUserPosts";
import { useCreatePost } from "../../hooks/useCreatePost";
import { toast } from "react-toastify";

/**
 * Displays a list of posts by a specific user and provides functionality to create new posts.
 *
 * @param {object} props - The component props.
 * @param {string} props.userId - The ID of the user whose posts are to be displayed.
 * @returns {JSX.Element} The rendered user posts component.
 */
const UserPosts = ({ userId }) => {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const { data: posts, isLoading: isLoadingPosts } = useUserPosts(userId);
  const { mutate: createPost, isLoading: isCreatingPost } = useCreatePost();

  const handleOpenCreatePost = () => setOpenCreatePost(true);
  const handleCloseCreatePost = () => setOpenCreatePost(false);

  const handleCreatePost = (formData) => {
    createPost(formData, {
      onSuccess: () => {
        toast.success("Post created successfully!");
        handleCloseCreatePost();
      },
      onError: (error) => {
        toast.error(`Error creating post: ${error.message}`);
      },
    });
  };

  return (
    <>
      <Modal
        open={openCreatePost}
        onClose={handleCloseCreatePost}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CreatePostForm
          onSubmit={handleCreatePost}
          isLoading={isCreatingPost}
        />
      </Modal>
      <Paper elevation={3} sx={{ pt: 4, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5">My Posts</Typography>
          <Button onClick={handleOpenCreatePost} variant="contained">
            Create a new post
          </Button>
        </Box>
        {isLoadingPosts ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          posts?.map((post) => <Post key={post._id} data={post} />)
        )}
      </Paper>
    </>
  );
};

export default UserPosts;
