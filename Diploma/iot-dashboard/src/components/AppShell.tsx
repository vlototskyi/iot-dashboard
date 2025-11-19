import type { PropsWithChildren } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import { useAuth0 } from "@auth0/auth0-react";

export default function AppShell({ children }: PropsWithChildren) {
  const { logout, isAuthenticated, isLoading } = useAuth0();

  return (
    <Box minHeight="100vh" bgcolor="background.default" color="text.primary">
      <AppBar position="sticky" elevation={0}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SensorsIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Панель керування</Typography>
          </div>
          {!isLoading && isAuthenticated && (
            <Button
              variant="outlined"
              style={{ color: "#fff" }}
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Вийти
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
