import { formatDistanceToNow } from "date-fns";
import { Box, Typography } from "@mui/material";
import defaultImage from "../../assets/images/default-profile.png";

/**
 * Displays the details of a comment, including the author's name, profile image, and the time it was posted.
 *
 * @param {object} props - The component props.
 * @param {object} props.user - The user object of the commenter.
 * @param {string} props.createdAt - The timestamp of when the comment was created.
 * @returns {JSX.Element} The rendered comment details component.
 */
export default function CommentDetails({ user, createdAt }) {
  return (
    <>
      {user && createdAt && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <img
              // The Api always returns undefined as a commenter photo, This is the default profile photo
              src={defaultImage}
              width={"50px"}
              alt={`${user?.name}'s profile`}
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
        </Box>
      )}
    </>
  );
}
