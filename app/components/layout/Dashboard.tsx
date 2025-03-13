import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import AppNavbar from "./AppNavbar";
import SideMenu from "./SideMenu";
import AppTheme from "../../theme/AppTheme";
import { useLocation } from "react-router";
import { User } from "@supabase/supabase-js";
import { Tables } from "database.types";

export default function Dashboard({
  children,
  disableCustomTheme,
  user,
  profile,
}: {
  children?: React.ReactNode;
  disableCustomTheme?: boolean;
  user: User | null;
  profile: Tables<"profiles"> | null;
}) {
  const location = useLocation();
  const hideLayout = ["/sign-in", "/sign-up", "/confirm-email"].includes(
    location.pathname
  );

  const hideHeader = ["/learn"].includes(location.pathname);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        {/* Conditionally render SideMenu */}
        {!hideLayout && (
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SideMenu
              onToggleDrawer={toggleDrawer}
              open={drawerOpen}
              user={user ? user : null}
              profile={profile ? profile : null}
            />
          </Box>
        )}

        {/* Conditionally render AppNavbar */}
        {!hideLayout && !hideHeader && <AppNavbar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            minHeight: "100vh",
          }}
        >
          {/* {!hideLayout && !hideHeader && <Header user={user ? user : null} />} */}
          {children}
        </Box>
      </Box>
    </AppTheme>
  );
}
