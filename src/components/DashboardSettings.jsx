import React from "react";
import StoreInfoSettings from "./StoreInfoSettings";
import UserProfileSettings from "./UserProfileSettings";

// MUI COMPONENTS
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function DashboardSettings() {
  return (
    <Stack spacing={3} sx={{ p: { xs: 1, sm: 2 } }}>
      {/* 1. قسم بيانات الكافيه */}
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: "12px" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          بيانات الكافيه (Store Profile)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          البيانات الأساسية التي تظهر في التقارير والواجهة
        </Typography>
        <Divider sx={{ mb: 2.5 }} />
        <StoreInfoSettings />
      </Paper>

      {/* 2. قسم بيانات الكاشير / المستخدم */}
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: "12px" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          بيانات الحساب (Cashier Profile)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          معلومات الحساب الحالي وكلمة المرور
        </Typography>
        <Divider sx={{ mb: 2.5 }} />
        <UserProfileSettings />
      </Paper>
    </Stack>
  );
}

export default DashboardSettings;