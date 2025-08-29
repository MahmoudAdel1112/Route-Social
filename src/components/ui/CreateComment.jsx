import { Box, TextField, Button, Avatar } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema } from "../../validation/createCommentSchema";
import { useCreateComment } from "../../hooks/useCreateComment";
import { useAuth } from "../../contexts/AuthContext";
import defaultProfile from "../../assets/images/default-profile.png";

/**
 * A form for creating a new comment on a post.
 *
 * @param {object} props - The component props.
 * @param {string} props.post - The ID of the post to which the comment will be added.
 * @returns {JSX.Element} The rendered create comment form.
 */
const CreateComment = ({ post }) => {
  console.log(post);
  const { user } = useAuth();
  const { mutate: createComment, isLoading } = useCreateComment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createCommentSchema),
  });

  const onSubmit = (data) => {
    createComment({ content: data.content, post });
    reset();
  };

  return (
    <Box display="flex" alignItems="start" gap={2} mt={2}>
      <Avatar src={defaultProfile} alt={user?.name} />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%" }}
      >
        <TextField
          label="Add a comment..."
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
          disabled={isLoading}
          sx={{ mt: 1 }}
        >
          {isLoading ? "Commenting..." : "Comment"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateComment;
