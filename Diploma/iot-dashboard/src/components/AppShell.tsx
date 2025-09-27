import type { PropsWithChildren } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <Box minHeight="100vh" bgcolor="background.default" color="text.primary">
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <SensorsIcon sx={{ mr: 1 }} />
          <Typography variant="h6">IoT Ledger Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
