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
import { TablesProvider } from "./context/TablesContext";
import { FeedbacksProvider } from "./context/FeedbackContext";
import { WaiterCallsProvider } from "./context/WaiterCallsContext";
import { SuggestionsProvider } from "./context/SuggestionsContext";

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
                    <TablesProvider>
                      <FeedbacksProvider>
                        <WaiterCallsProvider>
                          <SuggestionsProvider>
                            <ThemeProvider theme={theme}>
                              <CssBaseline />
                              <App />
                            </ThemeProvider>
                          </SuggestionsProvider>
                        </WaiterCallsProvider>
                      </FeedbacksProvider>
                    </TablesProvider>
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
