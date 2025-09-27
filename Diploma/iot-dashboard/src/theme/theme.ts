import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },
    secondary: { main: "#22c55e" },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: {
      styleOverrides: { root: { borderRadius: 16 } },
    },
  },
});
