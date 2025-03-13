import { Typography, Box, Grid, Fade } from "@mui/material";
import Explore from "./svgs/Explore";
import Food from "./svgs/Food";
import Animals from "./svgs/Animals";

const benefits = [
  {
    id: 1,
    title: "Healthier Food",
    description:
      "Food grown in healthy soil is more nutrient-dense, particularly in minerals. It also doesn't contain harmful chemicals from pesticides herbicides insecticides and synthetic fertilizers",
    backgroundColor: "#E8F5E9",
    color: "#16A34A",
    svg: <Food />,
  },
  {
    id: 2,
    title: "Healthier Animals",
    description:
      "Animals raised on healthy soil, with access to pasture and natural habitats, are healthier and happier. Better nutrition from a natural diet greatly improveds gut and immune health leading to a lower risk of disease from antibiotic-resistant bacteria and parasites. Reduced stress from more natural living conditions, and the ability to express natural behaviors, leads to better overall health and quality of life.",
    backgroundColor: "#E8F5E9",
    color: "#16A34A",
    svg: <Animals />,
  },
  {
    id: 3,
    title: "Healthier Envirnoment",
    description:
      "Diversified farms lead to more stable income streams for farmers.",
    backgroundColor: "#E8F5E9",
    color: "#16A34A",
    svg: null,
  },
];

export type BenefitVisibilityState = {
  isIntroVisible: boolean;
  isBenefit1Visible: boolean;
  isBenefit2Visible: boolean;
  isBenefit3Visible: boolean;
  isEndingVisible: boolean;
};

function BenefitsSlides({ currentStep }: { currentStep: number }) {
  const getVisibilityStates = (): BenefitVisibilityState => ({
    isIntroVisible: currentStep === 0,
    isBenefit1Visible: currentStep === 1,
    isBenefit2Visible: currentStep === 2,
    isBenefit3Visible: currentStep === 3,
    isEndingVisible: currentStep === 4,
  });

  const visibility = getVisibilityStates();

  return (
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
      }}
    >
      {visibility.isIntroVisible && (
        <Fade in={visibility.isIntroVisible} timeout={500}>
          <Box sx={{ width: "100%", textAlign: "center", mb: 5 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              Benefits of <span style={{ color: "#16A34A" }}>Regenerative</span>{" "}
              Agriculture
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: { xs: "90%", sm: "600px" }, mx: "auto" }}
            >
              Discover how regenerative practices create positive impacts across
              ecosystems and communities.
            </Typography>
          </Box>
        </Fade>
      )}

      <Grid container spacing={4}>
        {benefits.map((benefit, index) => {
          const visibilityKey = `isBenefit${
            index + 1
          }Visible` as keyof BenefitVisibilityState;
          const isBenefitVisible = visibility[visibilityKey];

          return (
            isBenefitVisible && (
              <Fade key={benefit.id} in={isBenefitVisible} timeout={500}>
                <Grid item xs={12}>
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
                        backgroundColor: benefit.backgroundColor,
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
                          color: benefit.color,
                        }}
                      >
                        {benefit.id}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "#555", lineHeight: 1.6 }}
                    >
                      {benefit.description}
                    </Typography>
                    {benefit.svg}
                  </Box>
                </Grid>
              </Fade>
            )
          );
        })}

        {visibility.isIntroVisible && (
          <Explore x={undefined} y={undefined} animationDelay={false} />
        )}
        {visibility.isEndingVisible && (
          <Explore x={undefined} y={50} animationDelay={false} />
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
                  mb: 4,
                }}
              >
                🌿 Key Benefits of Regenerative Agriculture
              </Typography>
            </Fade>
            <Grid container spacing={4} justifyContent="center">
              {benefits.map((benefit, index) => (
                <Fade
                  key={benefit.id}
                  in={visibility.isEndingVisible}
                  timeout={index * 500}
                >
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        p: 3,
                        backgroundColor: "#f9f9f9",
                        borderRadius: 2,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          backgroundColor: benefit.backgroundColor,
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
                            color: benefit.color,
                          }}
                        >
                          {benefit.id}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Grid>
                </Fade>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default BenefitsSlides;
