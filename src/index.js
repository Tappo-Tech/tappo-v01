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
import { OrdersProvider } from "./context/OrdersContext";
import { HistoryProvider } from "./context/HistoryContext";
import { StoreInfoProvider } from "./context/StoreInfoContext";
import { UserProvider } from "./context/UserContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <CartProvider>
          <OrdersProvider>
            <HistoryProvider>
              <StoreInfoProvider>
                <UserProvider>
                  <AnalyticsProvider>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <App />
                    </ThemeProvider>
                  </AnalyticsProvider>
                </UserProvider>
              </StoreInfoProvider>
            </HistoryProvider>
          </OrdersProvider>
        </CartProvider>
      </MenuProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
