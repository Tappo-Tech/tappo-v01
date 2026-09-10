import { createContext, useContext } from "react";
import { useOrders } from "./OrdersContext";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const { finishedOrders, cancelledOrders } = useOrders();

  return (
    <HistoryContext.Provider value={{ finishedOrders, cancelledOrders }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};