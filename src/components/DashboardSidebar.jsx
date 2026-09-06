// COMPONENTS
import SidebarItem from "./SidebarItem";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";

// MUI HOOKS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ICONS
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const navItems = [
  { id: "orders", label: "الطلبات الحية", icon: <ShowChartOutlinedIcon /> },
  { id: "menu", label: "التحكم في المنيو", icon: <TuneOutlinedIcon /> },
  { id: "history", label: "سجل الطلبات", icon: <ReceiptLongOutlinedIcon /> },
  { id: "settings", label: "الاعدادات", icon: <SettingsOutlinedIcon /> },
];

function DashboardSidebar({
  mobileOpen,
  handleDrawerToggle,
  activeTab,
  onSelectTab,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleItemClick = (id) => {
    onSelectTab(id);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const sidebarItems = navItems.map((item) => (
    <SidebarItem
      key={item.id}
      navItem={item}
      isSelected={activeTab === item.id}
      onSelect={() => handleItemClick(item.id)}
    />
  ));

  return (
    <SwipeableDrawer
      anchor="right"
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      onOpen={() => {}}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: 273,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 276,
          boxSizing: "border-box",
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            justifyContent: "start",
            px: 1,
            pt: 2,
          }}
        >
          <Box
            component="img"
            src="/logo-icon.png"
            alt="TAPPO Logo"
            sx={{ width: 35, height: 35, borderRadius: 0.8 }}
          />
          <Typography
            sx={{ fontSize: "25px", fontWeight: "800" }}
            variant="h4"
            component="h1"
          >
            TAPPO
          </Typography>
        </Box>

        <Box sx={{ pt: 5 }}>
          <List disablePadding>{sidebarItems}</List>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}

export default DashboardSidebar;
