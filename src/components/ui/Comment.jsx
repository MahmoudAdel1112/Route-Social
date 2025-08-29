import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import CommentDetails from "./CommentDetails";
import { useAuth } from "../../contexts/AuthContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import { useUpdateComment } from "../../hooks/useUpdateComment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema } from "../../validation/createCommentSchema";
import { TextField, Button } from "@mui/material";

/**
 * Renders a single comment, including the commenter's details, the comment content,
 * and options to edit or delete the comment if the authenticated user is the owner.
 *
 * @param {object} props - The component props.
 * @param {object} props.comment - The comment object to render.
 * @returns {JSX.Element} The rendered comment component.
 */
const Comment = ({ comment }) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateComment, isLoading: isUpdating } = useUpdateComment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  const isOwner = user?._id === comment?.commentCreator?._id;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteComment(comment._id);
    handleMenuClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const onUpdate = (data) => {
    updateComment({ commentId: comment._id, content: data.content });
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        position: "relative",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {comment && (
          <CommentDetails
            user={comment.commentCreator}
            createdAt={comment.createdAt}
          />
        )}
        <Box>
          {isEditing ? (
            <Box
              component="form"
              onSubmit={handleSubmit(onUpdate)}
              sx={{ width: "100%" }}
            >
              <TextField
                label="Edit a comment..."
                fullWidth
                variant="outlined"
                {...register("content")}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUpdating}
                sx={{ mt: 1 }}
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 1, ml: 1 }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Typography sx={{ fontSize: "18px" }} variant="inherit">
              {comment.content}
            </Typography>
          )}
        </Box>
      </Box>
      {isOwner && (
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Comment;
