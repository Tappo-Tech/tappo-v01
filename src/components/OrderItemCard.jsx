// MUI COMPONENTS
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// ICONS
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// HELPERS
import { formatTimeAgo } from "../utils/helpers";

// CONTEXTS
import { useOrders } from "../context/OrdersContext";

function OrderItemCard({ order }) {
  const { updateOrderStatus } = useOrders();

  return (
    <Card
      sx={{
        width: "100%",
        mb: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          pb: 1.5,
          display: "flex",
          justify: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "text.primary" }}
        >
          طاولة {order.tableNumber}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.8rem" }}
        >
          {formatTimeAgo(order.createdAt)}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <CardContent sx={{ p: 2, py: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {order.items.map((item) => (
            <Box
              key={item.cartItemId || item.id}
              sx={{
                display: "flex",
                justify: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {item.quantity}x : {item.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {item.price} ر.س
              </Typography>
            </Box>
          ))}
        </Box>

        {order.notes && (
          <Box
            sx={{
              mt: 1.5,
              p: 1,
              borderRadius: "6px",
              bgcolor: "action.hover",
              display: "flex",
              alignItems: "center",
              gap: 0.8,
            }}
          >
            <FiberManualRecordIcon sx={{ fontSize: 8, color: "warning.main" }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "text.secondary" }}
            >
              ملاحظة: {order.notes}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 1.5, pt: 0.5 }}>
        {/* حالة الطلب جديد */}
        {order.status === "pending" && (
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <Button
              color="primary"
              fullWidth
              size="medium"
              variant="contained"
              disableElevation
              onClick={() => updateOrderStatus(order.id, "preparing")}
              sx={{ borderRadius: "8px", fontWeight: 700, py: 1 }}
            >
              بدء التحضير
            </Button>
            <Button
              color="error"
              size="medium"
              variant="outlined"
              onClick={() => updateOrderStatus(order.id, "cancelled")}
              sx={{ borderRadius: "8px", fontWeight: 700, minWidth: "75px" }}
            >
              إلغاء
            </Button>
          </Box>
        )}

        {/* حالة الطلب قيد التحضير */}
        {order.status === "preparing" && (
          <Button
            color="info"
            fullWidth
            size="medium"
            variant="contained"
            disableElevation
            onClick={() => updateOrderStatus(order.id, "ready")}
            sx={{ borderRadius: "8px", fontWeight: 700, py: 1 }}
          >
            جاهز للتسليم
          </Button>
        )}

        {/* حالة الطلب جاهز للتسليم */}
        {order.status === "ready" && (
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <Button
              color="success"
              fullWidth
              size="medium"
              variant="contained"
              disableElevation
              onClick={() => updateOrderStatus(order.id, "served")}
              sx={{ borderRadius: "8px", fontWeight: 700, py: 1 }}
            >
              تم الاستلام
            </Button>
            <Button
              color="warning"
              size="medium"
              variant="outlined"
              onClick={() => updateOrderStatus(order.id, "unclaimed")}
              sx={{ borderRadius: "8px", fontWeight: 700, minWidth: "90px" }}
            >
              لم يُستلم
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}

export default OrderItemCard;