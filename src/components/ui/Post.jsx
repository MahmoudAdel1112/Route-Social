import { Box, Typography, Modal, Paper } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserDetails from "./UserDetails";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

/**
 * Renders a single social media post with user information, content, and an image.
 * Provides functionality to view the image in a modal and access account options
 * for the post's author.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The post data object.
 * @param {object} props.data.user - The user object associated with the post.
 * @param {string} props.data.user.photo - The URL of the user's profile photo.
 * @param {string} props.data.user.name - The name of the user.
 * @param {string} props.data.user._id - The ID of the user.
 * @param {string} props.data.createdAt - The timestamp when the post was created (ISO string).
 * @param {string} props.data.body - The main text content of the post.
 * @param {string} props.data.image - The URL of the post's image.
 * @param {boolean} [props.homeScreen] - Indicates if the post is displayed on the home screen (influences comment display).
 * @returns {JSX.Element} The rendered post component.
 */
const Post = ({ data, homeScreen }) => {
  // State for the image modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const postContent = (
    <Paper
      component="article" // Accessibility: Semantically mark as an article
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
        overfloWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      {data && <UserDetails post={data} />}
      <Box>
        <Typography variant="body1" mt={2} mb={1}>
          {data.body}
        </Typography>
      </Box>
      {data.image && (
        <Box sx={{ width: "100%", marginInline: "auto" }}>
          <img
            src={data.image}
            alt={`Post by ${data.user.name}`}
            width={"100%"}
            height={"auto"}
            style={{ borderRadius: "15px", cursor: "pointer" }}
            onClick={handleOpenModal}
            loading="lazy"
          />
        </Box>
      )}
      <Box marginTop={1.5}>
        <Typography variant="h6" sx={{ fontSize: "20px" }}>
          Comments
        </Typography>
        <Box>
          <CreateComment post={data._id} />
        </Box>
        {homeScreen
          ? // show only the first comment
            data?.comments?.length > 0 && <Comment comment={data.comments[0]} />
          : // show all comments
            data?.comments?.map((comment, i) => (
              <Comment
                key={comment._id || comment.id || i}
                comment={comment}
              />
            ))}
      </Box>
    </Paper>
  );

  return (
    <>
      {homeScreen ? (
        <Link
          to={`/post/${data._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {postContent}
        </Link>
      ) : (
        postContent
      )}

      {/* Image Modal */}
      {data.image && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="image-modal-title"
          aria-describedby="image-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ outline: "none" }}>
            <img
              src={data.image}
              alt={`Post by ${data.user.name}`}
              style={{
                maxHeight: "90vh",
                maxWidth: "90vw",
                borderRadius: "8px",
              }}
              loading="lazy"
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Post;
