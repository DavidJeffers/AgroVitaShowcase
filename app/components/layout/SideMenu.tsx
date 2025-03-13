import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { drawerClasses } from "@mui/material/Drawer";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { FaSignInAlt } from "react-icons/fa";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCart";
import { RiExpandRightFill } from "react-icons/ri";
import { CgArrowsShrinkH } from "react-icons/cg";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useLocation } from "react-router";
import { GrInfo } from "react-icons/gr";
import { User } from "@supabase/supabase-js";
import KofiSidebarItem from "~/components/ui/kofi";
import { Tables } from "~/../database.types";
import { UserRole } from "../auth/userRoles";
import PreloadLink from "./Links";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/" },
  { text: "Farms", icon: <AgricultureIcon />, path: "/farms" },
  { text: "Products", icon: <ShoppingCartRounded />, path: "/products" },
  { text: "Profile", icon: <PeopleRoundedIcon />, path: "/profile" },
  { text: "Create Farm", icon: <AddBoxIcon />, path: "/farm-create" },
  { text: "Add Your Farm", icon: <AddBoxIcon />, path: "/farm-sign-up" },
  { text: "Edit Farm", icon: <AddBoxIcon />, path: "/edit-farm" },
];

const secondaryListItems = [
  // { text: "About", icon: <InfoRoundedIcon />, path: "/about" },
  { text: "Privacy", icon: <HelpRoundedIcon />, path: "/privacy" },
  { text: "Settings", icon: <SettingsRoundedIcon />, path: "/settings" },
  { text: "Sign in/Sign up", icon: <FaSignInAlt />, path: "/sign-in" },
];

const drawerWidth = 205;

const tooltipStyles = {
  tooltip: {
    sx: {
      p: 0,
      backgroundColor: "#fff",
      borderRadius: "8px",
      border: "1px solid",
      borderColor: "divider",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: 350,
      "& .MuiTooltip-arrow": {
        color: "#fff",
        "&::before": {
          backgroundColor: "#fff",
          border: "1px solid",
          borderColor: "divider",
        },
      },
    },
  },
  arrow: {
    sx: {
      "&::before": {
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "divider",
      },
    },
  },
};

interface MenuContentProps {
  open: boolean;
  onToggleDrawer: () => void;
  user: User | null;
  profile: Tables<"profiles"> | null;
}

interface ToggleButtonProps {
  onToggleDrawer: () => void;
}

interface ToggleButtonOpenProps extends ToggleButtonProps {
  tooltipOpen: boolean;
  setTooltipOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/** Toggle button for the open (expanded) menu */
function ToggleButtonOpen({
  onToggleDrawer,
  tooltipOpen,
  setTooltipOpen,
}: ToggleButtonOpenProps) {
  return (
    <ListItem key="toggle" disablePadding sx={{ display: "block" }}>
      <Tooltip
        title="Close Menu"
        placement="right"
        open={tooltipOpen}
        onClose={() => setTooltipOpen(false)}
      >
        <ListItemButton
          onClick={onToggleDrawer}
          sx={{
            minHeight: 47,
            justifyContent: "initial",
            right: 4,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <CgArrowsShrinkH size={20} />
            <img
              src="/AgroVitaLogo.png"
              alt="AgroVita"
              style={{
                width: 110,
                height: "auto",
                marginLeft: 18,
                paddingTop: 0,
                marginTop: 0,
              }}
            />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

/** Toggle button for the closed (collapsed) menu */
function ToggleButtonClosed({ onToggleDrawer }: ToggleButtonProps) {
  return (
    <ListItem key="toggle" disablePadding sx={{ display: "block" }}>
      <Tooltip title="open menu" placement="right">
        <ListItemButton
          onClick={onToggleDrawer}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            right: 4,
            width: "100%",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 0,
              justifyContent: "center",
            }}
          >
            <RiExpandRightFill size={20} />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

interface TipButtonProps extends ToggleButtonProps {
  open: boolean;
}

/** Button to show helpful tips */
function TipButton({ open }: TipButtonProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) {
      const handleDocumentClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        const tipButton = target.closest(".tip-button");

        if (tipButton) {
          return;
        }

        setIsTooltipOpen(false);
      };

      document.addEventListener("click", handleDocumentClick);
      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }
  }, [isTouchDevice]);

  const handleClick = (event: React.MouseEvent) => {
    if (isTouchDevice) {
      event.stopPropagation();
      setIsTooltipOpen(!isTooltipOpen);
    }
  };
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Tooltip
        title={
          <Box sx={{ p: 1 }}>
            <List dense sx={{ p: 0, m: 0 }}>
              <ListItem disablePadding sx={{ p: 0, m: 0, mb: 1 }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                    right: 4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {isTouchDevice
                      ? "Tap lightbulbs to reveal helpful tips. Keep an eye out for them to discover useful insights."
                      : "Hover over lightbulbs to reveal helpful tips. Keep an eye out for them to discover useful insights."}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        }
        arrow
        placement="right"
        slotProps={tooltipStyles}
        open={isTooltipOpen}
        onClose={() => !isTouchDevice && setIsTooltipOpen(false)}
        onOpen={() => !isTouchDevice && setIsTooltipOpen(true)}
        disableFocusListener={isTouchDevice}
        disableHoverListener={isTouchDevice}
        disableTouchListener={isTouchDevice}
      >
        <ListItemButton
          className="tip-button"
          onClick={handleClick}
          sx={{
            minHeight: 48,
            justifyContent: "initial",
            right: 4,
            ...(open ? {} : { width: "100%" }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <GrInfo size={16} color="orange" />
          </ListItemIcon>
          {open && (
            <ListItemText
              primary={
                <Typography component="span">
                  <Box component="span" sx={{ display: "block" }}>
                    {isTouchDevice ? "Tap For Info" : "Hover For Info"}
                  </Box>
                </Typography>
              }
              slotProps={{
                primary: { sx: { textAlign: "left" } },
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

export default function MenuContent({
  open,
  onToggleDrawer,
  user,
  profile,
}: MenuContentProps) {
  const location = useLocation();
  const currentPath = location.pathname.slice(1) || "home";
  const [_isTouchDevice, setIsTouchDevice] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const admin = profile?.role === UserRole.ADMIN;

  const renderListItem = (item: {
    text: string;
    icon: React.ReactNode;
    path: string;
  }) => {
    if (!user && (item.text === "Profile" || item.text === "Settings"))
      return null;

    if (user && item.text === "Sign in/Sign up") {
      return null;
    }

    const isSettings = item.text === "Settings";

    if (!admin && item.text === "Create Farm") {
      return null;
    }

    if (!admin && item.text === "Edit Farm") {
      return null;
    }

    if (!admin && item.text === "Products") {
      return null;
    }

    const icon = isSettings ? (
      <Avatar
        src={profile?.profile_pic_url || "/profile1.webp"}
        sx={{
          width: 30,
          height: 30,
          right: 8,
          backgroundColor: "transparent",
        }}
      >
        {!profile?.profile_pic_url && <SettingsRoundedIcon />}
      </Avatar>
    ) : (
      item.icon
    );

    const listItem = (
      <ListItemButton
        selected={currentPath === item.text.toLowerCase()}
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          right: 4,
          width: open ? "inherit" : "100%",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isSettings ? 1.2 : 3,
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={item.text}
            slotProps={{
              primary: { sx: { textAlign: "left" } },
            }}
          />
        )}
      </ListItemButton>
    );

    return (
      <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
        <PreloadLink to={item.path}>
          {open ? (
            listItem
          ) : (
            <Tooltip title={item.text} placement="right">
              {listItem}
            </Tooltip>
          )}
        </PreloadLink>
      </ListItem>
    );
  };

  if (open) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          boxSizing: "border-box",
          [`& .${drawerClasses.paper}`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "fff",
          },
        }}
      >
        <Stack
          sx={{ flexGrow: 1, p: 1, px: 0, justifyContent: "space-between" }}
        >
          <Box>
            <List dense>
              <ToggleButtonOpen
                onToggleDrawer={onToggleDrawer}
                tooltipOpen={tooltipOpen}
                setTooltipOpen={setTooltipOpen}
              />
            </List>
            <Divider />
            <List dense>{mainListItems.map(renderListItem)}</List>
          </Box>
          <List dense>
            <KofiSidebarItem open={true} />
            <TipButton open={true} onToggleDrawer={onToggleDrawer} />
            {secondaryListItems.map(renderListItem)}
          </List>
        </Stack>
      </Drawer>
    );
  }

  return (
    <div style={{ marginRight: 45 }}>
      <Stack
        sx={{
          flexGrow: 1,
          p: 1,
          px: 0,
          height: "100%",
          position: "fixed",
          justifyContent: "space-between",
          zIndex: 6,
          maxWidth: 45,
        }}
      >
        <Box>
          <List>
            <ToggleButtonClosed onToggleDrawer={onToggleDrawer} />
          </List>
          <List dense>{mainListItems.map(renderListItem)}</List>
        </Box>
        <List dense>
          <KofiSidebarItem open={false} />
          <TipButton open={false} onToggleDrawer={onToggleDrawer} />
          {secondaryListItems.map(renderListItem)}
        </List>
      </Stack>
    </div>
  );
}
