// COMPONENTS
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

// MUI COMPONENTS
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// HOOKS
import { useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const titles = {
    orders: "الطلبات الحية",
    menu: "التحكم في المنيو",
    history: "سجل العمليات",
    settings: "الإعدادات",
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
      <Grid container>
        <Grid
          size={{ xs: 0, md: 3 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <DashboardSidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }} sx={{ p: { xs: 2, md: 2 } }}>
          <Stack spacing={3}>
            <DashboardHeader
              title={titles[activeTab] || activeTab}
              onOpenMenu={handleDrawerToggle}
            />

            <Box sx={{ mt: 2 }}>
              {activeTab === "orders" && <div>صفحة الطلبات (Live Orders)</div>}
              {activeTab === "menu" && (
                <div>صفحة التحكم في المنيو (Menu Control)</div>
              )}
              {activeTab === "history" && (
                <div>سجل العمليات (History)</div>
              )}
              {activeTab === "settings" && <div>صفحة الإعدادات (Settings)</div>}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
