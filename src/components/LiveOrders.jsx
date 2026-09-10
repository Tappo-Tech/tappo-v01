// COMPONENTS
import OrderItemCard from "./OrderItemCard";

// MUI COMPONENTS
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

// CONTEXTS
import { useOrders } from "../context/OrdersContext";

// ICONS
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function LiveOrders() {
  const { orders } = useOrders();

  const activeOrders = orders.filter((order) => !order.isCompleted);

  const pendingOrders = activeOrders.filter((order) => order.status === "pending");
  const preparingOrders = activeOrders.filter((order) => order.status === "preparing");
  const readyOrders = activeOrders.filter((order) => order.status === "ready");

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box
          sx={{
            mb: 2,
            p: 1,
            borderRadius: "8px",
            width: "100%",
            display: "flex",
            justify: "start",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <FiberManualRecordIcon
            fontSize="small"
            sx={{ color: "warning.main" }}
          />
          <Typography variant="h6" fontWeight="bold">
            جديد
          </Typography>
          <Chip
            label={pendingOrders.length}
            size="small"
            sx={{
              bgcolor: (theme) => theme.palette.warning.main + "15",
              color: "warning.main",
              fontWeight: "bold",
              fontSize: "0.85rem",
              height: "24px",
            }}
          />
        </Box>
        {pendingOrders.map((order) => (
          <OrderItemCard key={order.id} order={order} />
        ))}
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box
          sx={{
            mb: 2,
            p: 1,
            borderRadius: "8px",
            width: "100%",
            display: "flex",
            justify: "start",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <FiberManualRecordIcon fontSize="small" sx={{ color: "info.main" }} />
          <Typography variant="h6" fontWeight="bold">
            جاري التحضير
          </Typography>
          <Chip
            label={preparingOrders.length}
            size="small"
            sx={{
              bgcolor: (theme) => theme.palette.info.main + "15",
              color: "info.main",
              fontWeight: "bold",
              fontSize: "0.85rem",
              height: "24px",
            }}
          />
        </Box>
        {preparingOrders.map((order) => (
          <OrderItemCard key={order.id} order={order} />
        ))}
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box
          sx={{
            mb: 2,
            p: 1,
            borderRadius: "8px",
            width: "100%",
            display: "flex",
            justify: "start",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <FiberManualRecordIcon
            fontSize="small"
            sx={{ color: "success.main" }}
          />
          <Typography variant="h6" fontWeight="bold">
            جاهز للتسليم
          </Typography>
          <Chip
            label={readyOrders.length}
            size="small"
            sx={{
              bgcolor: (theme) => theme.palette.success.main + "15",
              color: "success.main",
              fontWeight: "bold",
              fontSize: "0.85rem",
              height: "24px",
            }}
          />
        </Box>
        {readyOrders.map((order) => (
          <OrderItemCard key={order.id} order={order} />
        ))}
      </Grid>
    </Grid>
  );
}

export default LiveOrders;