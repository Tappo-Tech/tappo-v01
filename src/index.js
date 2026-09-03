import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ROUTING
import { BrowserRouter } from "react-router-dom";

// THEME
import theme from "./theme/Theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

// CONTEXTS
import { MenuProvider } from "./context/MenuContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <App />
          </ThemeProvider>
        </CartProvider>
      </MenuProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
