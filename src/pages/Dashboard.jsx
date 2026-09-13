// COMPONENTS
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import LiveOrders from "../components/LiveOrders";
import MenuControl from "../components/MenuControl";
import OrdersHistory from "../components/OrdersHistory";
import DashboardSettings from "../components/DashboardSettings";

// MUI COMPONENTS
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

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
        <Grid size={{ xs: 12, md: 9 }} sx={{ p: { xs: 2, md: 1 } }}>
          <Stack spacing={1}>
            <Box sx={{width: "100%", backgroundColor: "white"}}>
              <DashboardHeader
                title={titles[activeTab] || activeTab}
                onOpenMenu={handleDrawerToggle}
              />
            </Box>

            <Divider variant="fullWidth" sx={{ mt: 2 }} />

            <Box sx={{ mt: 2, width: "100%" }}>
              {activeTab === "orders" && <LiveOrders />}
              {activeTab === "menu" && <MenuControl />}
              {activeTab === "history" && <OrdersHistory />}
              {activeTab === "settings" && <DashboardSettings />}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
