import { useScrollTrigger, Zoom, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

/**
 * A button that appears when the user scrolls down and, when clicked, smoothly scrolls the page back to the top.
 *
 * @param {object} props - The component props.
 * @param {Window} [props.window] - An optional window object to attach the scroll listener to. Defaults to the global window object.
 * @returns {JSX.Element} The rendered scroll-to-top button.
 */
function ScrollTopButton({ window }) {
  // Show the button only when the user scrolls past 100px
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true, // respond instantly
    threshold: 100, // px to scroll before showing
  });

  const handleClick = () => {
    const anchor = (window || document).documentElement;
    anchor.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          top: "90%", // vertical center of screen
          right: 32, // distance from right edge
          transform: "translateY(-50%)", // truly center it
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}

export default ScrollTopButton;
