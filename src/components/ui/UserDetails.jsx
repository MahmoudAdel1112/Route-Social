import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import defaultImage from "../../assets/images/default-profile.png";
import { useDeletePost } from "../../hooks/useDeletePost";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import CreatePostForm from "./CreatePostForm";

/**
 * Displays user details for a post, including the user's name, profile image, and post creation time.
 * Provides options to edit or delete the post if the authenticated user is the owner.
 *
 * @param {object} props - The component props.
 * @param {object} props.post - The post object containing user and creation details.
 * @returns {JSX.Element} The rendered user details component.
 */
const UserDetails = ({ post }) => {
  const { user, createdAt, _id: postId } = post;
  const { user: userAuth } = useAuth();
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();
  const { mutate: updatePost, isLoading: isUpdating } = useUpdatePost();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  if (!post) {
    return <CircularProgress />;
  }

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: () => {
        setOpenDeleteDialog(false);
      },
    });
  };

  const handleUpdatePost = (formData) => {
    updatePost(
      { postId, postData: formData },
      {
        onSuccess: () => {
          setOpenEditModal(false);
        },
      }
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box>
          <img
            src={defaultImage}
            width={"50px"}
            alt={`${user.name}'s profile`}
            loading="lazy"
          />
        </Box>
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </Typography>
        </Box>
        {userAuth?._id === user._id && (
          <Box sx={{ ml: "auto" }}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              aria-label="Account options"
              sx={{
                fontSize: "40px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ...
              </span>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
              <MenuItem onClick={handleOpenDeleteDialog}>Delete</MenuItem>
            </Menu>
          </Box>
        )}
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CreatePostForm
          onSubmit={handleUpdatePost}
          isLoading={isUpdating}
          postToEdit={post}
        />
      </Modal>
    </>
  );
};

export default UserDetails;
