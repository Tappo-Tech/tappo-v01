// MUI COMPONENTS
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";

// ICONS
import PrintIcon from "@mui/icons-material/Print";

// OTHERS
import dayjs from "dayjs";

// CONTEXTS
import { useStore } from "../context/StoreInfoContext";

function InvoiceModal({ open, onClose, order }) {
  const { storeInfo } = useStore();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent id="printable-invoice">
        <Box sx={{ textAlign: "center", mb: 2 }}>
          {storeInfo.logoUrl && (
            <Box
              component="img"
              src={storeInfo.logoUrl}
              alt={storeInfo.storeName}
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                objectFit: "cover",
                mx: "auto",
                mb: 1,
              }}
            />
          )}
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {storeInfo.storeName}
          </Typography>

          {storeInfo.taxNumber && (
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
            >
              الرقم الضريبي: {storeInfo.taxNumber}
            </Typography>
          )}

          <Typography sx={{mr: 1}} variant="caption" color="text.secondary" display="block">
            فاتورة مبسطة
          </Typography>
          <Typography variant="caption" display="block">
            {dayjs(order.createdAt).format("YYYY/MM/DD - hh:mm A")}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed", my: 1.5 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            رقم الطلب: #{order.id}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            طاولة: {order.tableNumber}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed", my: 1.5 }} />

        <Box sx={{ my: 2 }}>
          {order.items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body2">
                {item.name} × {item.quantity}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {item.price * item.quantity} {storeInfo.currency || "ر.س"}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderStyle: "dashed", my: 1.5 }} />

        {order.notes && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            ملاحظات: {order.notes}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            pt: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
            المجموع الكلي:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
            {order.total} {storeInfo.currency || "ر.س"}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed", my: 1.5 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          {storeInfo.phone && (
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              هاتف: {storeInfo.phone}
            </Typography>
          )}
          {storeInfo.email && (
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              البريد: {storeInfo.email}
            </Typography>
          )}
        </Box>

        <Typography
          variant="caption"
          align="center"
          display="block"
          sx={{ mt: 2, color: "text.secondary", fontWeight: 700 }}
        >
          {storeInfo.receiptFooter || "شكراً لزيارتكم!"}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button onClick={onClose} color="inherit">
          إغلاق
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          color="primary"
        >
          طباعة
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InvoiceModal;
