import { ReactNode } from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/material/";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>{children}</Box>
    </Container>
  );
}
