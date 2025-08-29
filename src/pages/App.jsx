import { Box, Container, Typography, Fab } from "@mui/material";
import Post from "../components/ui/Post";
import PostSkeleton from "../components/ui/PostSkeleton";
import { usePosts } from "../hooks/usePosts";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRef, useEffect } from "react";
import CreatePostForm from "../components/ui/CreatePostForm";
import { useCreatePost } from "../hooks/useCreatePost";
import { toast } from "react-toastify";

const handleClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function App() {
  const { data: posts, isLoading, isError, error } = usePosts();
  const scrollTopRef = useRef();
  const { mutate: createPost, isLoading: isCreatingPost } = useCreatePost();

  const handleCreatePost = (formData) => {
    createPost(formData, {
      onSuccess: () => {
        toast.success("Post created successfully!");
      },
      onError: (error) => {
        toast.error(`Error creating post: ${error.message}`);
      },
    });
  };

  useEffect(() => {
    const ScrollRefButton = scrollTopRef.current;
    if (ScrollRefButton) {
      ScrollRefButton.addEventListener("click", handleClick);
    }

    return () => {
      if (ScrollRefButton) {
        ScrollRefButton.removeEventListener("click", handleClick);
      }
    };
  });

  // Step 3: Implement Error Handling
  if (isError) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Error loading posts: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <title>Home Feed | Route Social</title>
      <meta
        name="description"
        content="Explore your feed to see the latest posts from people you follow. Stay connected with your community on Route Social."
      />
      <meta name="keywords" content="Social Media, Route Academy, Project" />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <CreatePostForm
            onSubmit={handleCreatePost}
            isLoading={isCreatingPost}
          />
        </Box>
        {/* Step 4: Implement Loading State (Skeletons) */}
        {isLoading ? (
          <Box>
            {[...Array(3)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </Box>
        ) : (
          /* Step 5: Display Posts (Success State) */
          <Box>
            {posts.length === 0 ? (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textAlign: "center", mt: 4 }}
              >
                No posts found. Be the first to create one!
              </Typography>
            ) : (
              posts.map((post) => (
                <Post key={post.id || post._id} data={post} homeScreen />
              ))
            )}
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
