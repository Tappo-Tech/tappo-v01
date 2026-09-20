import { useState } from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

// MUI ICONS
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";

// COMPONENTS
import StoreInfoSettings from "./StoreInfoSettings";
import UserProfileSettings from "./UserProfileSettings";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function SettingsLayout() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1000, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          الإعدادات
        </Typography>
        <Typography variant="body2" color="text.secondary">
          إدارة بيانات الفرع والمعلومات الشخصية للحساب
        </Typography>
      </Box>

      {/* Main Container */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: "16px",
          p: { xs: 2, sm: 3 },
          borderColor: "divider",
        }}
      >
        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="إعدادات النظام"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              icon={<StorefrontIcon />}
              iconPosition="start"
              label="بيانات الفرع / المتجر"
              sx={{ fontWeight: 700, minHeight: 48 }}
            />
            <Tab
              icon={<PersonIcon />}
              iconPosition="start"
              label="الملف الشخصي والحساب"
              sx={{ fontWeight: 700, minHeight: 48 }}
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <CustomTabPanel value={activeTab} index={0}>
          <StoreInfoSettings />
        </CustomTabPanel>

        <CustomTabPanel value={activeTab} index={1}>
          <UserProfileSettings />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}

export default SettingsLayout;