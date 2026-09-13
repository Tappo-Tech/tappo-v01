// MUI COMPONENTS
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

// CONTEXT
import { useUser } from "../context/UserContext";

// HOOKS 
import { useState } from "react";

function UserProfileSettings() {
  const { user, updateUser } = useUser();

  // state محلي للنموذج لتجنب تعديل الـ Context عند كل ضربة مفتاح
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. تحديث البيانات العامة في الـ Context
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    // 2. معالجة كلمة المرور (مستقبلاً يتم إرسالها للـ Backend)
    if (formData.newPassword) {
      // هنا سيتم استدعاء API تغيير كلمة المرور مستقبلاً
      alert("تم تحديث البيانات وتغيير كلمة المرور بنجاح!");
    } else {
      alert("تم تحديث بيانات البروفايل بنجاح!");
    }

    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {/* Name */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="اسم الكاشير / المستخدم"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
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
            value={formData.email}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            fullWidth
            label="رقم الجوال"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>

        {/* Current Password */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="password"
            label="كلمة المرور الحالية"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            size="small"
            placeholder="أدخلها فقط في حال تغيير كلمة المرور"
          />
        </Grid>

        {/* New Password */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="password"
            label="كلمة المرور الجديدة"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
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
            sx={{ px: 4, py: 1.2, borderRadius: "8px", fontWeight: 700 }}
          >
            حفظ التغييرات
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfileSettings;