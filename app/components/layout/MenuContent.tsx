import { Box, List, Tooltip, Typography } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Stack } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { Link, useLocation } from "react-router";
import { GrInfo } from "react-icons/gr";
import KofiSidebarItem from "~/components/ui/kofi";
import { useEffect, useState } from "react";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon /> },
  { text: "Farms", icon: <AnalyticsRoundedIcon /> },
  { text: "Products", icon: <ShoppingCartRounded /> },
  { text: "Profile", icon: <PeopleRoundedIcon /> },
];

const secondaryListItems = [
  {
    text: null,
    icon: null,
    tooltip: true,
  },
  {
    text: "About",
    icon: <InfoRoundedIcon />,
    tooltip: null,
  },
  { text: "Privacy", icon: <HelpRoundedIcon />, tooltip: null },
  { text: "Settings", icon: <SettingsRoundedIcon />, tooltip: null },
];

export default function MenuContent({ onClose }: { onClose: () => void }) {
  const location = useLocation();
  const currentPath = location.pathname.slice(1) || "home";
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const handleDocumentClick = () => {
      setTooltipOpen(false);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleTooltipClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTooltipOpen((prev) => !prev);
  };

  return (
    <Stack
      sx={{
        flexGrow: 1,
        justifyContent: "space-between",
        px: 0,
        py: 0,
      }}
    >
      <List
        dense
        sx={{
          "& .MuiListItem-root": {
            mb: 1,

            px: 0,
          },
          "& .MuiListItemIcon-root": {
            minWidth: 32,
            color: "text.secondary",
            "&.preserve-color": {
              // Add this class for icons that should keep their color
              color: "inherit",
            },
          },
          "& .MuiListItemButton-root": {
            borderRadius: 0,
            // px: 2.5,
            "&.Mui-selected": {
              bgcolor: "primary.light",
              "&:hover": {
                bgcolor: "primary.light",
              },
            },
          },
        }}
      >
        {mainListItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link
              to={item.text === "Home" ? "/" : item.text.toLowerCase()}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
              prefetch="intent"
              onClick={onClose}
            >
              <ListItemButton
                selected={currentPath === item.text.toLowerCase()}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "1rem",
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <List
        dense
        sx={{
          "& .MuiListItem-root": {
            mb: 1,
            px: 0,
          },
          "& .MuiListItemIcon-root": {
            minWidth: 32,
          },
        }}
      >
        <KofiSidebarItem open={true} />

        {secondaryListItems.map((item, index) =>
          item.tooltip ? (
            <ListItem key={index} disablePadding>
              <Tooltip
                open={tooltipOpen}
                onClose={() => setTooltipOpen(false)}
                title={
                  <Box sx={{ p: 1 }}>
                    <List dense sx={{ p: 0, m: 0 }}>
                      <ListItem sx={{ p: 0, m: 0 }}>
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: "text.primary",
                            p: 1,
                            mb: 1,
                          }}
                        >
                          Tap lightbulbs to reveal helpful tips. Keep an eye out
                          for them to discover useful insights.
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                }
                arrow
                placement="left"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                slotProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#fff",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      p: 0,
                      maxWidth: 150,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "#fff",
                      border: "1px solid",
                      borderColor: "divider",
                    },
                  },
                }}
              >
                <ListItemButton onClick={handleTooltipClick}>
                  <ListItemIcon>
                    <GrInfo color="orange" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Tips"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ) : (
            <ListItem key={index} disablePadding>
              <Link
                to={
                  item.text === "About"
                    ? "/about"
                    : `/${item.text?.toLowerCase()}`
                }
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
                onClick={onClose}
              >
                <ListItemButton
                  selected={currentPath === item.text?.toLowerCase()}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.light",
                      "&:hover": {
                        bgcolor: "primary.light",
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        )}
      </List>
    </Stack>
  );
}
