import { createContext, useContext, useState, useEffect } from "react";

const TablesContext = createContext();

export function TablesProvider({ children }) {
  const [tables, setTables] = useState(() => {
    const savedTables = localStorage.getItem("tappo_tables");
    if (savedTables) {
      try {
        const parsed = JSON.parse(savedTables);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error loading tables from localStorage", e);
      }
    }
    return []; // مصفوفة فارغة افتراضياً
  });

  useEffect(() => {
    localStorage.setItem("tappo_tables", JSON.stringify(tables));
  }, [tables]);

  // توليد الطاولات بالكامل ومسح القديم
  const generateTables = (count) => {
    const parsedCount = parseInt(count, 10) || 0;
    const baseUrl = window.location.origin; // يأخذ رابط الموقع تلقائياً سواء netlify أو localhost

    const newTables = Array.from({ length: parsedCount }, (_, index) => ({
      id: index + 1,
      tableNumber: index + 1,
      qrValue: `${baseUrl}/menu/${index + 1}`,
    }));

    setTables(newTables);
  };

  // مسح جميع الطاولات
  const clearTables = () => {
    setTables([]);
    localStorage.removeItem("tappo_tables");
  };

  return (
    <TablesContext.Provider value={{ tables, generateTables, clearTables }}>
      {children}
    </TablesContext.Provider>
  );
}

export const useTables = () => useContext(TablesContext);