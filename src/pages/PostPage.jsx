import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts";
import Post from "../components/ui/Post";
import { Box } from "@mui/material";
import PostSkeleton from "../components/ui/PostSkeleton";

const PostPage = () => {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (isError) {
    return <div>Error fetching post</div>;
  }

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <Post data={post} />
    </Box>
  );
};

export default PostPage;
