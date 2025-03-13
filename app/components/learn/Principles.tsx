import { Box, Fade, Typography, Grid } from "@mui/material";
import AllPrinciples from "./svgs/AllPrinciples";
import Explore from "./svgs/Explore";
import CropDiversity from "./svgs/CropDiversity";
import NaturalFertilization from "./svgs/Fertilizers";
import RotationalGrazing from "./svgs/Livestock";
import LivingRoots from "./svgs/LivingRoots";
import MinimizeSoilDisturbance from "./svgs/MinimizeSoilDisturbance";
import Nature from "./svgs/Nature";
import SoilCoverage from "./svgs/SoilCoverage";

export interface Principle {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  color: string;
  svg: React.ReactNode | null;
}

export type VisibilityState = {
  isIntroVisible: boolean;
  isPrinciplesVisible: boolean;
  isPrinciple1Visible: boolean;
  isPrinciple2Visible: boolean;
  isPrinciple3Visible: boolean;
  isPrinciple4Visible: boolean;
  isPrinciple5Visible: boolean;
  isPrinciple6Visible: boolean;
  isPrinciple7Visible: boolean;
  isEndingVisible: boolean;
};

const principles = [
  {
    id: 1,
    title: "Minimize Soil Disturbance",
    description:
      "Reduce or eliminate tillage (plowing) to protect soil structure, fungal networks, and beneficial organisms. This improves water infiltration, prevents erosion, and sequesters carbon.",
    backgroundColor: "#E8F5E9",
    color: "#16A34A",
    svg: <MinimizeSoilDisturbance />,
  },
  {
    id: 2,
    title: "Maximize Crop Diversity",
    description:
      "Shift from monoculture to diverse crop rotations and cover crops. This creates resilient ecosystems, reduces pest pressure, and enhances soil health with diverse root systems.",
    backgroundColor: "#F3E5F5",
    color: "#8E24AA",
    svg: <CropDiversity />,
  },
  {
    id: 3,
    title: "Keep Soil Covered",
    description:
      "Maintain ground cover with plants or residue to prevent erosion, reduce evaporation, regulate soil temperature, and feed soil life.",
    backgroundColor: "#E0F7FA",
    color: "#00ACC1",
    svg: <SoilCoverage />,
  },
  {
    id: 4,
    title: "Maintain Living Roots",
    description:
      "Keep living roots in the soil year-round to feed soil microbes, enhance nutrient cycling, improve soil structure, and increase carbon sequestration.",
    backgroundColor: "#FFF3E0",
    color: "#FF9800",
    svg: <LivingRoots />,
  },
  {
    id: 5,
    title: "Integrate Livestock",
    description:
      "Use rotational grazing to improve soil health, fertilize naturally with manure, and enhance biodiversity, mimicking natural grazing patterns, while preventing overgrazing.",
    backgroundColor: "#FBE9E7",
    color: "#EF5350",
    svg: <RotationalGrazing />,
  },
  {
    id: 6,
    title: "Utilize Natural Fertilizers",
    description:
      "Rely on natural biological processes, compost, and cover crops for soil nutrients, reducing reliance on synthetic inputs which harm the soil and pollute water sources.",
    backgroundColor: "#E3F2FD",
    color: "#5C6BC0",
    svg: <NaturalFertilization />,
  },
  {
    id: 7,
    title: "Work with Nature",
    description:
      "Adapt practices to specific climates and ecosystems, acknowledging there is no one-size-fits-all approach. Observe patterns and work with natural processes. Regenerative agriculture is about working with nature, not against it.",
    backgroundColor: "#F0F4C3",
    color: "#7CB342",
    svg: <Nature />,
  },
];

export function Principles({ currentStep }: { currentStep: number }) {
  const getVisibilityStates = (): VisibilityState => ({
    isIntroVisible: currentStep === 0,
    isPrinciplesVisible: currentStep === 1,
    isPrinciple1Visible: currentStep === 2,
    isPrinciple2Visible: currentStep === 3,
    isPrinciple3Visible: currentStep === 4,
    isPrinciple4Visible: currentStep === 5,
    isPrinciple5Visible: currentStep === 6,
    isPrinciple6Visible: currentStep === 7,
    isPrinciple7Visible: currentStep === 8,
    isEndingVisible: currentStep === 9,
  });

  const visibility: VisibilityState = getVisibilityStates();

  return (
    <>
      {" "}
      {(visibility.isPrinciplesVisible || visibility.isIntroVisible) && (
        <Explore x={undefined} y={200} animationDelay={false} />
      )}
      <Box
        sx={{
          px: { xs: 7, sm: 20 },
          py: { xs: 1, sm: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          position: "absolute",
          top: "50%",
          msTransform: "translateY(-50%)",
          transform: "translateY(-50%)",

          // "&:hover": {
          //   cursor: `url("data:image/svg+xml;base64,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%0A%3Cdefs%3E%0A%3Cstyle%3E%0A%40keyframes%20flapWings%20%7B%0A%20%20%20%200%25%20%7B%20transform%3A%20rotate(0deg)%3B%20%7D%0A%20%20%20%2050%25%20%7B%20transform%3A%20rotate(20deg)%3B%20%7D%0A%20%20%20%20100%25%20%7B%20transform%3A%20rotate(0deg)%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E%0A%3C%2Fdefs%3E%0A%3C!--%20Body%20(made%20smaller)%20--%3E%0A%3Cpath%20d%3D%22M12%208c2%200%204%201.5%204.5%203s0.5%203%200%203.5-2%201.5-4.5%201.5-4-0.5-4.5-1.5%200.5-2%200-3.5%202.5-3%204.5-3z%22%20fill%3D%22%234299E1%22%2F%3E%0A%3C!--%20Head%20--%3E%0A%3Ccircle%20cx%3D%2218%22%20cy%3D%229%22%20r%3D%222.5%22%20fill%3D%22%234299E1%22%2F%3E%0A%3C!--%20Beak%20--%3E%0A%3Cpath%20d%3D%22M20%208.5l2%200.5-2%200.5z%22%20fill%3D%22%23ECC94B%22%2F%3E%0A%3C!--%20Eye%20--%3E%0A%3Ccircle%20cx%3D%2218.5%22%20cy%3D%228.5%22%20r%3D%220.5%22%20fill%3D%22black%22%2F%3E%0A%3C!--%20Wings%20--%3E%0A%3Cg%3E%0A%3C%2Fg%3E%0A%3C!--%20Tail%20feathers%20--%3E%0A%3Cpath%20d%3D%22M8%2011l-2%202%202%202z%22%20fill%3D%22%234299E1%22%2F%3E%0A%3C!--%20Additional%20feather%20details%20--%3E%0A%3Cpath%20d%3D%22M13%2012c1%200%202%200.5%202%201s-1%201-2%201-2-0.5-2-1%201-1%202-1z%22%20fill%3D%22%2363B3ED%22%2F%3E%0A%3Cpath%20d%3D%22M10%208c2-2%204-2%205-1s1%202%200%203-3%201-4%200-2-1-1-2z%22%20fill%3D%22%2363B3ED%22%20style%3D%22animation%3A%20flapWings%200.5s%20infinite%22%3E%0A%20%20%20%20%3CanimateTransform%20attributeName%3D%22transform%22%20type%3D%22rotate%22%20from%3D%220%2012%2010%22%20to%3D%2220%2012%2010%22%20dur%3D%220.5s%22%20repeatCount%3D%22indefinite%22%20additive%3D%22sum%22%20%2F%3E%0A%3C%2Fpath%3E%0A%0A%3C%2Fsvg%3E")} 16 16, auto`,
          // },
        }}
      >
        {visibility.isIntroVisible && (
          <Fade in={visibility.isIntroVisible} timeout={500}>
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                mb: 5,
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                Explore the World of{" "}
                <span style={{ color: "#16A34A" }}>Regenerative</span>{" "}
                Agriculture 🌿
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ maxWidth: { xs: "90%", sm: "600px" }, mx: "auto" }}
              >
                Regenerative agriculture is a revolutionary approach that
                focuses on rejuvenating soil, biodiversity, and ecosystems.
              </Typography>
            </Box>
          </Fade>
        )}

        {visibility.isPrinciplesVisible && (
          <Fade in={visibility.isPrinciplesVisible} timeout={500}>
            <Box sx={{ width: "100%", textAlign: "center", mb: 13 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                Principles of{" "}
                <span style={{ color: "#16A34A" }}>Regenerative</span>{" "}
                Agriculture
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ maxWidth: { xs: "90%", sm: "600px" }, mx: "auto" }}
              >
                {" "}
              </Typography>
            </Box>
          </Fade>
        )}

        <Grid container spacing={4}>
          {principles.map((principle, index) => {
            const visibilityKey = `isPrinciple${
              index + 1
            }Visible` as keyof VisibilityState;
            const isPrincipleVisible = visibility[visibilityKey];

            return (
              isPrincipleVisible && (
                <Fade key={principle.id} in={isPrincipleVisible} timeout={500}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        width: "50vw",
                        borderRadius: 1,
                        p: 3,
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundColor: principle.backgroundColor,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: principle.color,
                          }}
                        >
                          {principle.id}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
                      >
                        {principle.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "#555", lineHeight: 1.6 }}
                      >
                        {principle.description}
                      </Typography>
                      {principle.svg}
                    </Box>
                  </Grid>
                </Fade>
              )
            );
          })}

          {visibility.isEndingVisible && (
            <>
              <Explore x={155} y={400} animationDelay={false} />
              <Explore x={455} y={420} animationDelay={true} />
            </>
          )}

          {visibility.isEndingVisible && (
            <>
              <Fade in={visibility.isEndingVisible} timeout={1000}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    alignSelf: "center",
                    width: "100%",
                    color: "#16A34A",
                    textAlign: "center",
                  }}
                >
                  🌿 Principles of Regenerative Agriculture
                </Typography>
              </Fade>
              <Fade in={visibility.isEndingVisible} timeout={500}>
                <Grid
                  container
                  spacing={4}
                  justifyContent="space-between"
                  padding={13}
                  paddingTop={0}
                >
                  {principles.map((principle, index) => (
                    <Fade
                      key={principle.id}
                      in={visibility.isEndingVisible}
                      timeout={index * 1000}
                    >
                      <Grid item xs={12} sm={6} md={1}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            borderRadius: 1,
                            py: 10,
                            pb: 12,
                            height: "100%",
                            gap: 1,
                            width: "100%",
                            mb: 4,
                          }}
                        >
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: principle.backgroundColor,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mb: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                color: principle.color,
                              }}
                            >
                              {principle.id}
                            </Typography>
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
                          >
                            {principle.title}
                          </Typography>
                        </Box>
                      </Grid>
                    </Fade>
                  ))}
                </Grid>
              </Fade>
              <AllPrinciples />
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
