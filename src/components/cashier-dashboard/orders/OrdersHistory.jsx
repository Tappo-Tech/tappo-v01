import { useState } from "react";
import dayjs from "dayjs";

import InvoiceModal from "./OrderPill";

// CONTEXTS
import { useOrders } from "../../../context/OrdersContext";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const renderStatusChip = (status) => {
  switch (status) {
    case "served":
      return (
        <Chip
          label="تم التسليم"
          color="success"
          size="small"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      );
    case "unclaimed":
      return (
        <Chip
          label="غير مستلم"
          color="warning"
          size="small"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      );
    case "cancelled":
      return (
        <Chip
          label="ملغى"
          color="error"
          size="small"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      );
    default:
      return (
        <Chip
          label={status}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      );
  }
};

function OrderRow({ order }) {
  const [open, setOpen] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
          {order.id}
        </TableCell>
        <TableCell align="center">طاولة {order.tableNumber}</TableCell>
        <TableCell align="center">
          {dayjs(order.createdAt).format("YYYY/MM/DD - hh:mm A")}
        </TableCell>
        <TableCell align="center">{renderStatusChip(order.status)}</TableCell>
        <TableCell align="center" sx={{ fontWeight: 700 }}>
          {order.total} ر.س
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  عناصر الطلب:
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<ReceiptLongIcon />}
                  onClick={() => setOpenInvoice(true)}
                >
                  استعراض الفاتورة
                </Button>
              </Box>

              <Stack spacing={1} sx={{ mb: 2 }}>
                {order.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: 400,
                      p: 1,
                      bgcolor: "action.hover",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {item.name} × {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {item.price * item.quantity} ر.س
                    </Typography>
                  </Box>
                ))}
              </Stack>
              {order.notes && (
                <Typography variant="caption" color="text.secondary">
                  ملاحظات: {order.notes}
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <InvoiceModal
        open={openInvoice}
        onClose={() => setOpenInvoice(false)}
        order={order}
      />
    </>
  );
}

function OrdersHistory() {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders
    .filter((order) => order.isCompleted)
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.tableNumber.toString().includes(searchQuery);

      const matchesStatus =
        statusFilter === "all" ? true : order.status === statusFilter;

      const matchesDate = selectedDate
        ? dayjs(order.createdAt).isSame(selectedDate, "day")
        : true;

      return matchesSearch && matchesStatus && matchesDate;
    });

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-invoice, #printable-invoice * {
              visibility: visible;
            }
            #printable-invoice {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>

      <Box
        sx={{
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          placeholder="ابحث برقم الطلب أو رقم الطاولة..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: "100%", sm: 280 } }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flexWrap: "wrap",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-filter-label">حالة الطلب</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="حالة الطلب"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">كل الحالات</MenuItem>
              <MenuItem value="served">تم التسليم</MenuItem>
              <MenuItem value="unclaimed">غير مستلم</MenuItem>
              <MenuItem value="cancelled">ملغى</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="تاريخ الطلبات"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="YYYY/MM/DD"
              slotProps={{
                textField: {
                  size: "small",
                  InputLabelProps: { shrink: true },
                  sx: {
                    width: { xs: "100%", sm: 220 },
                    "& .MuiOutlinedInput-root": {
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      px: 1.5,
                    },
                    "& .MuiInputBase-input": {
                      textAlign: "right",
                      direction: "rtl",
                    },
                    "& .MuiInputAdornment-root": {
                      margin: "0 !important",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell width="50" />
              <TableCell sx={{ fontWeight: 700 }}>رقم الطلب</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                الطاولة
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                التاريخ والتوقيت
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                الحالة
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                المجموع
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    لا توجد طلبات مطابقة للفلترة الحالية
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrdersHistory;
