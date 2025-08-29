import { Typography } from "@mui/material";
import React from "react";

/**
 * A typography component for displaying a stylized phrase.
 *
 * @param {object} props - The component props.
 * @param {string} props.phrase - The phrase to display.
 * @returns {JSX.Element} The rendered phrase component.
 */
const Phrase = ({ phrase }) => {
  return (
    <Typography
      variant="h4"
      color="inherit"
      sx={{
        textAlign: "center",
        fontWeight: "700",
      }}
      style={{ fontFamily: "MyFont" }}
      fontSize={{ xs: "20px", sm: "28px", md: "28px", lg: "32px", xl: "36px" }}
    >
      {phrase}
    </Typography>
  );
};

export default Phrase;
