import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function AuthButton() {
  return (
    <Link to="/sign-in" style={{ textDecoration: "none", width: "100%" }}>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<LockOutlinedIcon />}
        sx={{
          justifyContent: "flex-start",
          px: 2,
          py: 1,
          borderColor: "divider",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <Box sx={{ textAlign: "left", ml: 1 }}>
          <Typography variant="body2" color="text.primary">
            Sign in
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Access your account
          </Typography>
        </Box>
      </Button>
    </Link>
  );
}
