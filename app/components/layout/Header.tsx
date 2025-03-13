import { Stack } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuButton from "../ui/buttons/MenuButton";
import ColorModeIconDropdown from "../../theme/ColorModeIconDropdown";
import { Box, Button } from "@mui/material";
import { Link } from "react-router";
import { User } from "@supabase/supabase-js";

export default function Header({ user }: { user: User | null }) {
  return (
    <Box
      sx={{
        display: "static",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        gap: 2,
      }}
    >
      {/* Left-aligned AgroVita text */}
      <Box sx={{ flexGrow: 1 }}></Box>

      {/* Right-aligned section */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          width: "auto",
          flexWrap: "nowrap",
          justifyContent: "flex-end",
        }}
      >
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />

        {/* Sign In and Sign Up Buttons: conditionally render if no user */}

        {!user ? (
          <>
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="text"
                sx={{
                  color: "#1976D2",
                  fontWeight: "500",
                  textTransform: "none",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  "&:hover": {
                    backgroundColor: "#E3F2FD",
                  },
                }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="outlined"
                sx={{
                  borderColor: "#1976D2",
                  color: "#1976D2",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.5, sm: 0.8 },
                  borderRadius: "20px",
                  fontWeight: "500",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  whiteSpace: "nowrap",
                  minWidth: "fit-content",
                  "&:hover": {
                    backgroundColor: "#E3F2FD",
                    borderColor: "#1565C0",
                    color: "#1565C0",
                  },
                }}
              >
                Sign Up
              </Button>
            </Link>
          </>
        ) : null}
      </Stack>
    </Box>
  );
}
