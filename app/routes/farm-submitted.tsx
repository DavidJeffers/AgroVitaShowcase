import { Typography } from "@mui/material";
import { Box } from "@mui/material";

export default function FarmSubmitted() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        px: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4">Farm Submitted</Typography>
      <Typography variant="body1">
        Thank you for submitting your farm. We will review your submission and
        get back to you as soon as possible.
      </Typography>
    </Box>
  );
}
