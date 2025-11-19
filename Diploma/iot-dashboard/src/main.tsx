import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Auth0Provider
          domain="diploma-ivsmlfoxzl5uhxoa.eu.auth0.com"
          clientId="UwdqVrnioHdIVnPcnfUzkb36AjXDCFlc"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
          cacheLocation="localstorage"
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
