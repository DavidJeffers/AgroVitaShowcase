import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export function HumanHealthContent() {
  return (
    <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 2, sm: 5 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#16A34A",
          textAlign: "center",
        }}
      >
        💪 Human Health & Food
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: "#444",
          mb: 4,
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        The interconnectedness between the health of our soil, our food, and our
        bodies.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              p: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              The Impact of Farming on Human Health
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
              Modern agricultural practices have significant implications for
              human health, as what is put into the soil also ends up in our
              bodies
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="- Soil depletion leads to nutrient-deficient crops" />
              </ListItem>
              <ListItem>
                <ListItemText primary="- Excessive use of pesticides and chemicals can harm consumers" />
              </ListItem>
              <ListItem>
                <ListItemText primary="- Industrial farms can expose workers to dangerous conditions" />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              p: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Why Farmers Are Essential
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
              Farmers are the custodians of our food and a cornerstone for human
              health and wellbeing
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="- Growing nutritious and safe food is essential for our diets" />
              </ListItem>
              <ListItem>
                <ListItemText primary="- Regenerative farmers focus on restoring soil health for healthier crops" />
              </ListItem>
              <ListItem>
                <ListItemText primary="- A thriving farming community supports rural economies and health" />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="subtitle2" color="text.secondary">
          Investing in farming is an investment in the health of ourselves, our
          communities, and the planet we inhabit.
        </Typography>
      </Box>
    </Box>
  );
}
