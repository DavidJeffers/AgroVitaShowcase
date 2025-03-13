import { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AgricultureIcon from "@mui/icons-material/Agriculture";

export function SmallFarmsContent() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        px: { xs: 3, sm: 4 },
        py: { xs: 2, sm: 5 },
        minHeight: "400px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#16A34A",
          textAlign: "center",
        }}
      >
        🏭 Big Business vs. 👩‍🌾 Small Farmers
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
        An exploration of the challenges of agribusiness and the critical role
        of small-scale farmers in sustainable agriculture
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            mt: 4,
            mb: 1,
            position: "absolute",
            bottom: 0,
            zIndex: 100,
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-around",
              gap: { xs: 1, sm: 1 },
            },
            "& .MuiTab-root": {
              fontSize: { xs: "0.8rem", sm: "1rem" },
              textTransform: "none",
              minWidth: { xs: "80px", sm: "120px" },
              px: { xs: 2, sm: 2 },
              borderRadius: "10px",
            },
            "& .Mui-selected": {
              backgroundColor: "#e8f5e9",
              color: "#2e7d32",
            },
          }}
        >
          <Tab label="The Problem with Large Farms" icon={<BusinessIcon />} />
          <Tab
            label="Why Small Farmers Are Crucial"
            icon={<AgricultureIcon />}
          />
        </Tabs>
      </Box>
      {tabIndex === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                p: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                The Problem with Large Farms
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
                Industrial agriculture, dominated by large corporations, often
                prioritizes profit over sustainability and community well-being.
                This model has led to:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="- Environmental Degradation due to heavy use of chemicals and monocropping" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="- Reduced biodiversity and depleted soil health" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="- Displacement of small farmers and decline of rural communities" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="- Reliance on long supply chains and limited local food systems" />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                p: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Why Small Farmers Are Crucial
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
                Small-scale farmers are the backbone of a resilient and
                sustainable food system. They play a vital role in:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="- Practicing sustainable and regenerative farming methods" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="- Preserving local food diversity and traditional farming practices" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="- Building robust local economies and community ties" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="- Fostering a direct connection between food production and consumption" />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      )}
      {/* </Box> */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="subtitle2" color="text.secondary">
          Supporting small farmers is not just an economic issue; it&apos;s a
          vital action for a food secure and healthy world.
        </Typography>
      </Box>
    </Box>
  );
}
