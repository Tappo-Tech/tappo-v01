// COMPONENTS
import AnalyticsOverview from "./Analytics/AnalyticsOverview";
import SalesTrendChart from "./Analytics/SalesTrendChart";
import TopSellingProductsCard from "./Analytics/TopSellingProductsCard";
import RecentOrdersCard from "./Analytics/RecentOrdersCard";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 

function Analytics() {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "background.default",
        pt: 2,
        pb: 6,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <AnalyticsOverview />
        <SalesTrendChart />

        {/* الحاوية المتجاوبة لكروت المنتجات الأكثر مبيعاً والطلبات الأخيرة */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TopSellingProductsCard />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <RecentOrdersCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Analytics;
