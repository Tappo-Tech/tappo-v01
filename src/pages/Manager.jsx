// COMPONENTS
import ManagerHeader from "../components/manager-dashboard/ManagerHeader";
import AnalyticsOverview from "../components/manager-dashboard/AnalyticsOverview";
import SalesTrendChart from "../components/manager-dashboard/SalesTrendChart";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Manager() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "Background.default" }}>
      <Container maxWidth="xl" sx={{ backgroundColor: "secondary.main" }}>
        <ManagerHeader />
      </Container>

      <Container maxWidth="lg">
        <AnalyticsOverview />
        <SalesTrendChart />
      </Container>
    </Box>
  );
}

export default Manager;
