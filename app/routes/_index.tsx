import type { MetaFunction } from "react-router";
import { Link, useSearchParams } from "react-router";
import { Typography, Box, Container, Grid, Alert } from "@mui/material";

import { FaBookOpen, FaHandshake, FaUserFriends } from "react-icons/fa";
import { GiBinoculars, GiPlantRoots } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { useEffect, useState } from "react";
import AnimatedHoverContent from "~/components/ui/AnimatedHoverContent";

export enum HoverState {
  FindFarms = "Find Farms",
  Learn = "Learn",
  Join = "Join",
  Community = "Community",
  Farmers = "Farmers",
  None = "None",
  FindProducts = "Find Products",
  DirectToConsumer = "DirectToConsumer",
  FreshHealthy = "FreshHealthy",
  LocalEconomies = "LocalEconomies",
  Education = "Education",
  Transparency = "Transparency",
}

export const meta: MetaFunction = () => [
  { title: "AgroVita" },
  { name: "description", content: "Welcome to AgroVita!" },
];

export default function Index() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const [isHovering, setIsHovering] = useState<HoverState>(HoverState.None);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const infoBoxData = [
    {
      title: "Direct To Consumer",
      icon: (
        <Box sx={{ fontSize: { xs: 20, sm: 20, md: 27, lg: 27 } }}>
          <FaUserFriends />
        </Box>
      ),
      hover: HoverState.DirectToConsumer,
    },
    {
      title: "Transparency",
      icon: (
        <Box sx={{ fontSize: { xs: 20, sm: 20, md: 27, lg: 27 } }}>
          <GiBinoculars />
        </Box>
      ),
      hover: HoverState.Transparency,
    },
    {
      title: "Fresh and Healthy",
      icon: (
        <Box sx={{ fontSize: { xs: 20, sm: 20, md: 27, lg: 27 } }}>
          <GiPlantRoots />
        </Box>
      ),
      hover: HoverState.FreshHealthy,
    },
    {
      title: "Local Economies",
      icon: (
        <Box sx={{ fontSize: { xs: 20, sm: 20, md: 27, lg: 27 } }}>
          <FaHandshake />
        </Box>
      ),
      hover: HoverState.LocalEconomies,
    },
    {
      title: "Education",
      icon: (
        <Box sx={{ fontSize: { xs: 20, sm: 20, md: 27, lg: 27 } }}>
          <FaBookOpen />
        </Box>
      ),
      hover: HoverState.Education,
    },
    {
      title: "Community",
      icon: (
        <Box sx={{ fontSize: { xs: 20, sm: 20, md: 30, lg: 27 } }}>
          <FaPeopleGroup />
        </Box>
      ),
      hover: HoverState.Community,
    },
  ];

  const gridItems = [
    {
      title: "Explore Farms Near You",
      image: "/fieldman.webp",
      link: "/farms",
      hoverState: HoverState.FindFarms,
    },
    {
      title: "Learn Regenerative Agriculture",
      image: "/fields.webp",
      link: "/learn",
      hoverState: HoverState.Learn,
    },
    {
      title: "Join Our Thriving Network",
      image: "/cows.webp",
      link: "/farm-sign-up",
      hoverState: HoverState.Join,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        pt: { xs: 8, sm: 3, md: 0, lg: 1 },
        flexDirection: "column",
        height: { xs: "auto", sm: "96vh", md: "100vh", lg: "100vh" },
        px: { xs: 3, sm: 4, md: 4, lg: 4 },
        mt: 0,
        overflow: "hidden",
        borderColor:
          isHovering === HoverState.None ? undefined : "text.secondary",
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ py: { xs: 0, sm: 0, md: 4, lg: 4 } }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box
            component="img"
            src="/AgroVitaLogo.png"
            alt="AgroVita"
            sx={{
              maxWidth: "100%",
              width: { xs: 200, sm: 250, md: 300, lg: 350 },
              height: "auto",
              borderRadius: "16px",
              mt: { xs: 0, sm: 0, md: 3, lg: 0 },
            }}
          />

          <Typography
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "1rem", sm: "1rem", md: "2rem", lg: "2rem" },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "left",
                lg: "left",
              },
            }}
          >
            Every farm, every food, every standard from organic to{" "}
            <span style={{ color: "#16A34A" }}>regenerative</span>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {infoBoxData.map((box, index) => (
              <Grid item xs={6} md={6} key={index}>
                <Box
                  {...(!isTouchDevice && {
                    onMouseEnter: () => setIsHovering(box.hover),
                    onMouseLeave: () => setIsHovering(HoverState.None),
                  })}
                  onClick={() => {
                    if (isTouchDevice) {
                      setIsHovering((prev) =>
                        prev === box.hover ? HoverState.None : box.hover
                      );
                    }
                  }}
                  sx={{
                    py: { xs: 0.8, sm: 1, md: 1.5, lg: 1.8 },
                    px: { xs: 1, sm: 1.2, md: 2, lg: 2 },
                    borderRadius: "12px",
                    borderColor: "divider",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "column",
                      md: "column",
                      lg: "row",
                    },
                    alignItems: {
                      xs: "center",
                      sm: "center",
                      md: "center",
                    },
                    gap: { xs: 0.5, sm: 1, md: 1, lg: 3 },
                    boxShadow: "0 2px 10px hsla(301, 3%, 57%, 0.15)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 20px grey",
                    },
                  }}
                >
                  {box.icon}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "0.70rem",
                        sm: "0.8rem",
                        md: "0.9rem",
                        lg: "1rem",
                      },
                    }}
                    fontWeight="medium"
                  >
                    {box.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <AnimatedHoverContent isHovering={isHovering} />

      <Grid
        container
        spacing={{ xs: 1, sm: 3 }}
        sx={{
          mt: { xs: 0, sm: 2, md: 8, lg: 10 },
          px: 1,
          justifyContent: "center",
          pb: { xs: 2, sm: 0 },
        }}
      >
        {gridItems.map(({ title, image, link, hoverState }, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              {...(!isTouchDevice && {
                onMouseEnter: () => setIsHovering(hoverState),
                onMouseLeave: () => setIsHovering(HoverState.None),
              })}
              sx={{
                position: "relative",
                width: "100%",
                padding: { xs: 1, sm: 0, md: 0, lg: 0 },
                cursor: "pointer",
              }}
            >
              <Link to={link} style={{ textDecoration: "none", width: "100%" }}>
                <Box
                  component="img"
                  src={image}
                  alt={title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 1px 25px hsla(301, 3%, 57%, 0.7)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 4px 20px grey",
                      borderRadius: "17px",
                    },
                  }}
                />

                <Box
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    py: { xs: 0.8, sm: 1, md: 1.5, lg: 1.8 },
                    px: { xs: 1, sm: 1.2, md: 2, lg: 2 },
                    borderRadius: "12px",

                    cursor: "pointer",
                    flexDirection: {
                      xs: "column",
                      sm: "column",
                      md: "column",
                      lg: "row",
                    },
                    alignItems: {
                      xs: "center",
                      sm: "center",
                      md: "center",
                    },
                    gap: { xs: 0.5, sm: 1, md: 1, lg: 3 },
                  }}
                >
                  <Typography
                    fontWeight="medium"
                    sx={{
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.5rem",
                        lg: "1rem",
                      },
                      color: "#000000",
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </Typography>
                </Box>

                <Typography
                  fontWeight="medium"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    position: "absolute",
                    bottom: "5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 2px 10px hsla(301, 3%, 57%, 0.15)",
                    px: { xs: 1, sm: 1.5, md: 2, lg: 2 },
                    py: 0.8,
                    borderRadius: "16px",
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.9rem",
                      md: "1.2rem",
                      lg: "1rem",
                    },
                    whiteSpace: "nowrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {title}
                </Typography>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
