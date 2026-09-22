import { useState } from "react";

// COMPONENTS
import ManagerSidebar from "../components/manager-dashboard/ManagerSidebar";
import ManagerHeader from "../components/manager-dashboard/ManagerHeader";
import Analytics from "../components/manager-dashboard/Analytics";
import MenuControl from "../components/manager-dashboard/menu-control/MenuControl";
import QRCodeGenerate from "../components/manager-dashboard/settings/QRCodesGenerate";
import OrdersHistory from "../components/manager-dashboard/orders/OrdersHistory";
import SettingsLayout from "../components/manager-dashboard/settings/SettingsLayout";
import Feedbacks from "../components/manager-dashboard/Feedbacks";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function ManagerDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("manager");

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* الشريط الجانبي */}
      <ManagerSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* منطقة المحتوى الرئيسي */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* الهيدر الثابت مع الفاصل البصري */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
            <ManagerHeader onDrawerToggle={handleDrawerToggle} />
          </Box>
          <Divider />
        </Box>

        {/* عرض الصفحة بناءً على التبويب المحدد */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          {activeTab === "manager" && <Analytics />}
          {activeTab === "history" && <OrdersHistory />}
          {activeTab === "menu" && <MenuControl />}
          {activeTab === "settings" && <SettingsLayout />}
          {activeTab === "qrGen" && <QRCodeGenerate />}
          {activeTab === "feedbacks" && <Feedbacks />}
        </Box>
      </Box>
    </Box>
  );
}

export default ManagerDashboard;