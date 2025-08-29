import { Box, Skeleton, Paper } from "@mui/material";

/**
 * A skeleton loader component for a post.
 * It displays a placeholder UI while the post content is loading.
 * @returns {JSX.Element} The rendered post skeleton component.
 */
const PostSkeleton = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: "700px",
        width: "100%",
        marginInline: "auto",
        paddingInline: "10px",
        paddingBlock: "15px",
        borderRadius: "15px",
        border: "1px solid",
        borderColor: "divider",
        mb: 2, // Add margin bottom to space out skeletons in a list
      }}
    >
      {/* User Info Skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width="40%" />
          <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} width="20%" />
        </Box>
      </Box>

      {/* Body Skeleton */}
      <Skeleton variant="text" sx={{ mt: 2, fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="80%" />

      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: { xs: 250, md: 400 }, // Responsive height
          mt: 1.5,
          borderRadius: "15px",
        }}
      />
    </Paper>
  );
};

export default PostSkeleton;
