import { createContext, useContext, useState, useEffect } from "react";

// Initial Mock / Default Store Data
const defaultStoreData = {
  storeName: "TAPPO CAFE",
  storeDisc: "قهوة و حلويات تابو",
  logoUrl: "/logo-icon.png",
  phone: "+966 50 000 0000",
  email: "info@tappo.app",
  taxNumber: "300000000000003",
  address: "الرياض، المملكة العربية السعودية",
  currency: "ر.س",
  receiptFooter: "شكراً لزيارتكم! ننتظركم مجدداً ",
};

const StoreInfoContext = createContext();

export function StoreInfoProvider({ children }) {
  const [storeInfo, setStoreInfo] = useState(() => {
    const localData = localStorage.getItem("tappo_store_info");
    return localData ? JSON.parse(localData) : defaultStoreData;
  });

  useEffect(() => {
    localStorage.setItem("tappo_store_info", JSON.stringify(storeInfo));
  }, [storeInfo]);

  const updateStoreInfo = (newDetails) => {
    setStoreInfo((prev) => ({
      ...prev,
      ...newDetails,
    }));
  };

  return (
    <StoreInfoContext.Provider value={{ storeInfo, updateStoreInfo }}>
      {children}
    </StoreInfoContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreInfoContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};