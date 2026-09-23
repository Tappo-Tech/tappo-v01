import { createContext, useContext, useState, useEffect } from "react";

const WaiterCallsContext = createContext();

export function WaiterCallsProvider({ children }) {
  const [calls, setCalls] = useState(() => {
    const savedCalls = localStorage.getItem("waiter_calls");
    return savedCalls ? JSON.parse(savedCalls) : [];
  });

  // حفظ التغييرات في LocalStorage
  useEffect(() => {
    localStorage.setItem("waiter_calls", JSON.stringify(calls));
  }, [calls]);

  // دالة إضافة نداء جديد من العميل
  const addCall = (tableNumber, reason) => {
    const newCall = {
      id: Date.now().toString(),
      tableNumber: tableNumber || "1",
      reason: reason || "استدعاء عام",
      createdAt: new Date().toLocaleTimeString("ar-SA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: Date.now(),
    };

    setCalls((prev) => [newCall, ...prev]);
  };

  // دالة إكمال/تلبية النداء وحذفه من قائمة الكاشير
  const resolveCall = (id) => {
    setCalls((prev) => prev.filter((call) => call.id !== id));
  };

  return (
    <WaiterCallsContext.Provider value={{ calls, addCall, resolveCall }}>
      {children}
    </WaiterCallsContext.Provider>
  );
}

// Hook للاستخدام السريع
export const useWaiterCalls = () => {
  const context = useContext(WaiterCallsContext);
  if (!context) {
    throw new Error("useWaiterCalls must be used within a WaiterCallsProvider");
  }
  return context;
};