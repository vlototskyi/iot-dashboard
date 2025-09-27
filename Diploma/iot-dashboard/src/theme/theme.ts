import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light", // switch to 'dark' if you like
    primary: { main: "#2563eb" }, // Tailwind-ish blue-600
    secondary: { main: "#22c55e" }, // green-500
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: {
      styleOverrides: { root: { borderRadius: 16 } },
    },
  },
});
