// COMPONENTS
import DashboardHeader from "../components/cashier-dashboard/DashboardHeader";
import LiveOrders from "../components/cashier-dashboard/orders/LiveOrders";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Dashboard() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f8fafc", // خلفية هادئة تُبرز الكروت
        py: { xs: 2, sm: 3, md: 4 }, // بادنج رأسي متجاوب
        px: { xs: 2, sm: 3, md: 5 }, // بادنج أُفقي محترم للأطراف
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Stack spacing={{ xs: 2.5, md: 3.5 }}>
          {/* كارت الهيدر العرفي */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
            }}
          >
            <DashboardHeader />
          </Paper>

          {/* منطقة الطلبات الحية بتوزيع متناسق */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
              minHeight: "calc(100vh - 180px)", // استغلال مساحة الشاشة بشكل ممتاز
            }}
          >
            <LiveOrders />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default Dashboard;