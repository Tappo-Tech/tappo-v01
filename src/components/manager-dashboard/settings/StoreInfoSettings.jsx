import { useState, useEffect } from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// MUI ICONS
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

// CONTEXT
import { useStore } from "../../../context/StoreInfoContext";

const CURRENCIES = [
  { value: "SAR", label: "ر.س (ريال سعودي)" },
  { value: "SDG", label: "ج.س (جنيه سوداني)" },
  { value: "AED", label: "د.إ (درهم إماراتي)" },
  { value: "USD", label: "$ (دولار أمريكي)" },
];

function StoreInfoSettings() {
  const { storeInfo, updateStoreInfo } = useStore();

  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    email: "",
    taxNumber: "",
    currency: "SAR",
    address: "",
    receiptFooter: "",
    logoUrl: "",
    ...storeInfo,
  });

  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (storeInfo) {
      setFormData((prev) => ({ ...prev, ...storeInfo }));
    }
  }, [storeInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logoUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStoreInfo(formData);
    setToast({ open: true, message: "تم حفظ إعدادات الكافيه بنجاح!", severity: "success" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1, maxWidth: 900, mx: "auto" }}>
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {/* Logo Upload Section */}
        <Grid size={{ xs: 12 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2,
              borderRadius: "12px",
              backgroundColor: "background.default",
            }}
          >
            <Avatar
              src={formData.logoUrl || "/logo-icon.png"}
              alt={formData.storeName}
              variant="rounded"
              sx={{
                width: 100,
                height: 100,
                border: "1px solid",
                borderColor: "divider",
              }}
            />
            <Box
              sx={{
                textAlign: { xs: "center", sm: "right" },
                width: { xs: "100%", sm: "auto" },
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "18px" }}>
                شعار الكافيه / النشاط
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1.5, fontSize: "14px" }}
              >
                يظهر الشعار في أعلى الفواتير المطبوعة وعلى تطبيق المنيو الرقمي
              </Typography>
              <Button
                variant="outlined"
                component="label"
                size="small"
                startIcon={<CloudUploadIcon />}
                fullWidth={{ xs: true, sm: false }}
                sx={{ borderRadius: "8px", alignSelf: { sm: "flex-start" } }}
              >
                تغيير الشعار
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Store Name */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="اسم الكافيه / الفرع"
            name="storeName"
            value={formData.storeName || ""}
            onChange={handleInputChange}
            required
            size="small"
          />
        </Grid>

        {/* Phone Number */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="رقم الهاتف"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>

        {/* Tax Number */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="الرقم الضريبي (VAT)"
            name="taxNumber"
            value={formData.taxNumber || ""}
            onChange={handleInputChange}
            size="small"
            placeholder="مثال: 300000000000003"
          />
        </Grid>

        {/* Currency Select */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            label="العملة"
            name="currency"
            value={formData.currency || "SAR"}
            onChange={handleInputChange}
            size="small"
          >
            {CURRENCIES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Address */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="العنوان"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            size="small"
            placeholder="مثال: الرياض - حي الملقا - طريق الملك فهد"
          />
        </Grid>

        {/* Receipt Footer Note */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="تذييل الفاتورة (رسالة الترحيب)"
            name="receiptFooter"
            value={formData.receiptFooter || ""}
            onChange={handleInputChange}
            multiline
            rows={2}
            size="small"
            placeholder="مثال: شكراً لزيارتكم! نتمنى لكم يوماً سعيداً."
          />
        </Grid>

        {/* Save Button */}
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: { xs: "stretch", sm: "flex-end" },
            mt: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            fullWidth={{ xs: true, sm: false }}
            sx={{
              px: 4,
              py: 1,
              borderRadius: "8px",
              fontWeight: 700,
            }}
          >
            حفظ التغييرات
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Alert */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default StoreInfoSettings;