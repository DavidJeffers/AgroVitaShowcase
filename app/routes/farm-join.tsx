import React from "react";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { GrInfo } from "react-icons/gr";
import { FaCircle } from "react-icons/fa6";

const perks = [
  {
    title: "Expand Your Reach",
    description:
      "Connect with thousands of buyers eager to support local farmers and purchase fresh, high-quality products.",
    position: { top: "60%", left: "13%" },
  },
  {
    title: "Analytics & Insights",
    description:
      "Gain valuable insights into your farm&apos;s performance with detailed analytics on visits, interactions, and customer preferences.",
    position: { top: "70%", left: "8%" },
  },
  {
    title: "Customizable Profiles",
    description:
      "Create a standout profile for your farm with descriptions, images, and updates that showcase your unique story.",
    position: { top: "70%", left: "23%" },
  },
  {
    title: "Boost Your Revenue",
    description:
      "Sell directly to customers without intermediaries and maximize your profits while building lasting relationships.",
    position: { top: "60%", left: "28%" },
  },
  {
    title: "Build Customer Trust",
    description:
      "Highlight your sustainable practices and standards to attract conscious consumers and foster loyalty.",
    position: { top: "80%", left: "15%" },
  },
];

const plans = [
  {
    id: 1,
    title: "Free Plan",
    price: "Free",
    features: [
      "Edit your farm's description and website URL",
      "Showcase your best pictures",
      "Add or update products and standards once",
    ],
    highlight: "Ideal for farms just starting out!",
  },
  {
    id: 2,
    title: "Pro Plan",
    price: "$19/month",
    features: [
      "Unlimited product updates",
      "Verified farm badge for added credibility",
      "Priority placement in farm listings",
      "Detailed analytics: see views, clicks, and more",
    ],
    highlight: "Perfect for farms ready to grow!",
  },
  {
    id: 3,
    title: "Pro Plus Plan (Coming Soon)",
    price: "Coming Soon",
    features: [
      "Advanced marketing tools (e.g., email campaigns)",
      "Integration with Agrovita's online store",
      "Inventory and customer relationship management",
      "Comprehensive analytics to drive success",
    ],
    highlight: "Take your farm to the next level!",
  },
];

export default function FarmJoin() {
  const planCardsRef = React.useRef<HTMLDivElement>(null);

  const scrollToPlans = () => {
    planCardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <React.Fragment>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "80vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          zIndex: 2,
        }}
      >
        {/* Background Image with Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/farm_marketing.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              zIndex: 2,
            }}
          />
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            zIndex: 3,
          }}
        >
          Join a thriving community of farmers and connect directly with{" "}
          <br></br>
          thousands of buyers who value fresh, sustainable, and local products.
        </Typography>

        <Button
          color="primary"
          variant="outlined"
          onClick={scrollToPlans}
          sx={{
            borderColor: "#1976D2",
            color: "#fff",
            px: { xs: 7, sm: 10 },
            py: { xs: 2, sm: 3 },
            borderRadius: "30px",
            fontWeight: "600",
            fontStyle: "bold",
            fontSize: { xs: "1.2rem", sm: "1.2rem" },
            whiteSpace: "nowrap",
            minWidth: "fit-content",
            "&:hover": {
              backgroundColor: "#E3F2FD",
              borderColor: "#1565C0",
              color: "#1565C0",
            },
            zIndex: 3,
          }}
        >
          Start Growing with Us
        </Button>

        {/* Tooltip Pills */}
        {perks.map((perk, index) => (
          <Tooltip
            disableInteractive
            placement="right"
            key={index}
            title={
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    textAlign: "center",
                    justifyContent: "center",
                    borderBottom: "2px solid",
                    borderColor: "divider",
                    pb: 1,
                    color: "text.primary",
                  }}
                >
                  {perk.title}
                </Typography>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                  }}
                >
                  {perk.description}
                </Typography>
              </Box>
            }
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  p: 1,
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
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: perk.position.top,
                left: perk.position.left,
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#333",
                px: 2,
                py: 1,
                borderRadius: "16px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                zIndex: 3,
                gap: "0.5rem",
                "&:hover": {
                  color: "#16A34A",
                  transform: "translate(-50%, -50%) scale(1.05)",
                  bgcolor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <GrInfo color="orange" />
              {perk.title}
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* Plans Section */}
      <Box ref={planCardsRef} sx={{ py: 6, px: 3, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Compare Our Plans
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(245, 245, 245, 0.8)",
                  borderRadius: "12px",
                  transition: "all 0.2s ease-in-out",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative", // For badge positioning
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {/* Add a badge for the Pro Plan */}
                {plan.title === "Pro Plan" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#FFD700",
                      color: "#000",
                      px: 2,
                      py: 0.5,
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ textAlign: "center", mb: 1 }}
                >
                  {plan.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#1976D2",
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  {plan.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontStyle: "italic",
                    color: "gray",
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  {plan.highlight}
                </Typography>
                <List dense>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: "24px" }}>
                        <FaCircle size={8} color="#1976D2" />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          fontSize: "0.9rem",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
