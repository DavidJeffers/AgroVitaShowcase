import { Form } from "react-router";
import { Typography, Button, Paper, Container, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Settings() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={2}
        sx={{ p: 4, borderRadius: 2, backgroundColor: "background.default" }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 500 }}>
          Settings
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Form action="/sign-out" method="post" style={{ margin: 0 }}>
            <Button
              type="submit"
              color="error"
              variant="contained"
              startIcon={<LogoutIcon />}
              sx={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                px: 3,
                py: 1,
              }}
            >
              Log Out
            </Button>
          </Form>
        </Box>
      </Paper>
    </Container>
  );
}
