import { Divider } from "@mui/material";
import { Drawer } from "@mui/material";
import { drawerClasses } from "@mui/material/Drawer";
import { Stack } from "@mui/material";

import MenuContent from "./MenuContent";
import { useState } from "react";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
}: SideMenuMobileProps) {
  const [_tooltipOpen, setTooltipOpen] = useState(false);

  const handleClose = () => {
    setTooltipOpen(false);
    toggleDrawer(false)();
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        display: { xs: "block", sm: "none" },
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          sx={{
            p: 1,
            pb: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            sx={{
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              p: 1,
            }}
          >
            <img
              src="/AgroVitaLogo.png"
              alt="AgroVita"
              style={{
                width: 120,
                height: "auto",
              }}
            />
          </Stack>
          {/* <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton> */}
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent onClose={handleClose} />
          <Divider />
        </Stack>
        {/* <CardAlert /> */}
        {/* <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
          </Button>
        </Stack> */}
      </Stack>
    </Drawer>
  );
}
