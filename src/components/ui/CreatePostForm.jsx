import { useRef, useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../../validation/createPostSchema";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

/**
 * A form for creating or editing a post.
 * It includes fields for the post body and an optional image upload.
 *
 * @param {object} props - The component props.
 * @param {Function} props.onSubmit - The function to call when the form is submitted.
 * @param {boolean} props.isLoading - A flag to indicate if the form is currently submitting.
 * @param {object} [props.postToEdit] - The post object to edit. If provided, the form will be in edit mode.
 * @returns {JSX.Element} The rendered create/edit post form.
 */
const CreatePostForm = ({ onSubmit, isLoading, postToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      body: postToEdit ? postToEdit.body : "",
    },
    resolver: zodResolver(createPostSchema),
  });

  const fileInputRef = useRef(null);
  const imageFile = watch("image");

  // State to manage the image preview
  const [imagePreview, setImagePreview] = useState(postToEdit?.image || null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else if (!postToEdit?.image) {
      setImagePreview(null);
    }
  }, [imageFile, postToEdit?.image]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setValue("image", null, { shouldValidate: true });
    setImagePreview(null);
    // Also clear the file input so the user can select a new file
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("body", data.body);

    // Only append the image field if a new image file has been selected.
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    toast.promise(onSubmit(formData), {
      loading: postToEdit ? "Saving..." : "Posting...",
      success: postToEdit ? "Post updated successfully" : "Post created successfully",
      error: (err) => err.message,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: "700px",
        width: "100%",
        marginInline: "auto",
        paddingInline: "15px",
        paddingBlock: "15px",
        borderRadius: "15px",
        border: "1px solid",
        borderColor: "divider",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h5" mb={2}>
        {postToEdit ? "Edit Post" : "Create a new post"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
        <TextField
          label="What's on your mind?"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          {...register("body")}
          error={!!errors.body}
          helperText={errors.body?.message}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {imagePreview ? (
          <Box sx={{ position: "relative", width: "fit-content", mb: 2 }}>
            <img
              src={imagePreview}
              alt="Post preview"
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "8px" }}
            />
            <IconButton
              aria-label="remove image"
              onClick={handleRemoveImage}
              size="small"
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Button variant="outlined" onClick={handleImageUploadClick}>
              Upload Image
            </Button>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading
            ? postToEdit
              ? "Saving..."
              : "Posting..."
            : postToEdit
            ? "Save Changes"
            : "Post"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePostForm;
