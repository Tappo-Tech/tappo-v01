import React, { useState } from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// MUI ICONS
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";

// CONTEXT
import { useStore } from "../context/StoreInfoContext";

function StoreInfoSettings() {
  const { storeInfo, updateStoreInfo } = useStore();

  const [formData, setFormData] = useState({ ...storeInfo });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        logoUrl: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStoreInfo(formData);
    alert("تم حفظ إعدادات الكافيه بنجاح!");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1 }}>
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {/* Logo Upload Section - Full width on mobile */}
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
              src={formData.logoUrl}
              alt={formData.storeName}
              variant="rounded"
              sx={{
                width: 115,
                height: 115,
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
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "20px" }}>
                شعار الكافيه
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1, fontSize: "16px" }}
              >
                يظهر الشعار في أعلى الفواتير المطبوعة
              </Typography>
              <Button
                variant="outlined"
                component="label"
                size="medium"
                startIcon={<CloudUploadIcon />}
                fullWidth={{ xs: true, sm: false }}
                sx={{ borderRadius: "8px" }}
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
          />
        </Grid>

        {/* Currency */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="العملة"
            name="currency"
            value={formData.currency || ""}
            onChange={handleInputChange}
            size="small"
          />
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
              py: 1.2,
              borderRadius: "8px",
              fontWeight: 700,
            }}
          >
            حفظ التغييرات
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StoreInfoSettings;