import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Tooltip,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { SiKofi } from "react-icons/si";

interface KofiButtonProps {
  open: boolean;
  onItemClick?: () => void;
}

export default function KofiSidebarItem({
  open,
  onItemClick,
}: KofiButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
    onItemClick?.();
  };

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Tooltip
        title={"Support Us"}
        placement="right"
        disableFocusListener={isTouchDevice}
        disableHoverListener={isTouchDevice}
        disableTouchListener={isTouchDevice}
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: open ? 48 : 48,
            justifyContent: "initial",
            right: { xs: 0, sm: 2, md: 4, lg: 4 },
            width: open ? "inherit" : "100%",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              /* mr: 2.2, */
              mr: { xs: 0, sm: 2, md: 2, lg: 2.2 },
              /* justifyContent: "center",  */
              alignItems: "center",
              display: "flex",
              color: "#29ABE0",
            }}
          >
            <SiKofi size={22} />
          </ListItemIcon>
          {open ? <ListItemText primary="Support Us" /> : <ListItemText />}
        </ListItemButton>
      </Tooltip>
      {/* <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            bgcolor: "#fff",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            padding: "50px 16px 24px",
            position: "relative",
            textAlign: "center",
          },
        }}
      >
        <IconButton
          // onClick={() => setIsModalOpen(false)}
          onClick={() => {
            console.log("Close button clicked!");
            setIsModalOpen(false);
          }}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            zIndex: 20,
            width: 32,
            height: 32,
            color: "grey.700",
            bgcolor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "50%",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.15)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
          }}
        >
          <IoMdClose size={20} />
        </IconButton>

        <iframe
          id="kofiframe"
          src="https://ko-fi.com/agrovita/?hidefeed=true&widget=true&embed=true&preview=true"
          style={{
            border: "none",
            height: "620px",
            width: "100%",
            display: "block",
          }}
          title="agrovita"
        />
      </Dialog> */}
      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#ffffff",
            boxShadow: 24,
            p: 2,
            /* overflow: "hidden", */
            borderRadius: "16px",
          }}
        >
          <IconButton onClick={() => setIsModalOpen(false)}>
            <IoMdClose />
          </IconButton>
          <iframe
            id="kofiframe"
            src="https://ko-fi.com/agrovita/?hidefeed=true&widget=true&embed=true&preview=true"
            style={{
              border: "none",
              height: "650px",
              width: "100%",
              display: "block",
            }}
            title="agrovita"
          />
        </Box>
      </Modal>
    </ListItem>
  );
}
