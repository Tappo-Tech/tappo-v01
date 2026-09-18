// COMPONENTS
import ManagerHeader from "../components/manager-dashboard/ManagerHeader";
import AnalyticsOverview from "../components/manager-dashboard/AnalyticsOverview";
import SalesTrendChart from "../components/manager-dashboard/SalesTrendChart";
import TopSellingProductsCard from "../components/manager-dashboard/TopSellingProductsCard";
import RecentOrdersCard from "../components/manager-dashboard/RecentOrdersCard";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Manager() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "Background.default" }}>
      <Container maxWidth="xl" sx={{ backgroundColor: "secondary.main" }}>
        <ManagerHeader />
      </Container>

      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: 3, pb: 6 }}
      >
        <AnalyticsOverview />
        <SalesTrendChart />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <TopSellingProductsCard />
          </Box>

          <Box sx={{ width: "50%" }}>
            <RecentOrdersCard />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Manager;
