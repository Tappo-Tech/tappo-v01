import { useState, useEffect } from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// CONTEXT
import { useUser } from "../../../context/UserContext";

function UserProfileSettings() {
  const { user, updateUser } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  // مزامنة حالة النموذج عند تحميل بيانات المستخدم من الـ Context
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const isCashier = user?.role === "cashier";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من تطابق كلمة المرور الجديدة
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setToast({ open: true, message: "كلمتا المرور غير متطابقتين", severity: "error" });
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      setToast({ open: true, message: "يرجى إدخال كلمة المرور الحالية للتأكيد", severity: "error" });
      return;
    }

    // تحديث البيانات الأساسية (للمدير فقط)
    if (!isCashier) {
      updateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
    }

    setToast({ open: true, message: "تم حفظ التغييرات بنجاح", severity: "success" });

    // إعادة إعداد حقول كلمات المرور
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: "auto", p: 1 }}>
      <Grid container spacing={2.5}>
        {/* Name */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="الاسم"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isCashier} // الكاشير لا يمكنه تغيير اسمه
            required
            size="small"
            helperText={isCashier ? "يمكن للمدير فقط تغيير الاسم" : ""}
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isCashier}
            size="small"
          />
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="رقم الجوال"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isCashier}
            size="small"
          />
        </Grid>

        {/* Current Password */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="كلمة المرور الحالية"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>

        {/* New Password */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="كلمة المرور الجديدة"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>

        {/* Confirm New Password */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="تأكيد كلمة المرور الجديدة"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            sx={{ px: 4, py: 1, borderRadius: "8px", fontWeight: 700 }}
          >
            حفظ التغييرات
          </Button>
        </Grid>
      </Grid>

      {/* التنبيهات (بديل لـ alert العادية) */}
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

export default UserProfileSettings;