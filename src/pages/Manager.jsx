// COMPONENTS
import ManagerHeader from "../components/manager-dashboard/ManagerHeader";
import AnalyticsOverview from "../components/manager-dashboard/AnalyticsOverview";
import SalesTrendChart from "../components/manager-dashboard/SalesTrendChart";
import TopSellingProductsCard from "../components/manager-dashboard/TopSellingProductsCard";
import RecentOrdersCard from "../components/manager-dashboard/RecentOrdersCard";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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

        {/* الحاوية المتجاوبة للكارتين */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TopSellingProductsCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentOrdersCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Manager;