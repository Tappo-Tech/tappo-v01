// MUI COMPONENTS
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

// ICONS
import NotificationsIcon from "@mui/icons-material/Notifications";

// CONTEXTS
import { useUser } from "../../context/UserContext"; 

const currentDate = new Date().toLocaleDateString("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function stringAvatar(name) {
  if (!name) return { children: "C" };

  const nameParts = name.trim().split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : nameParts[0][0].toUpperCase();

  return {
    children: initials,
  };
}

function DashboardHeader({ notificationsCount = 0 }) {
  const { user } = useUser();
  const userName = user?.name || "Cashier";

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* العنوان والتاريخ */}
        <Box sx={{ textAlign: "start" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.02em",
            }}
          >
            الطلبات الحالية
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              fontWeight: 500,
              color: "text.secondary",
              mt: 0.3,
            }}
          >
            {currentDate} | شاشة الكاشير والمطبخ
          </Typography>
        </Box>

        {/* الإشعارات والبروفايل */}
        <Stack direction="row" spacing={4} alignItems="end">
          <IconButton
            sx={{
              color: "text.secondary",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 1, sm: 1.2 },
            }}
          >
            <Badge badgeContent={notificationsCount} color="error">
              <NotificationsIcon sx={{ fontSize: { xs: 20, md: 22 } }} />
            </Badge>
          </IconButton>

          <Avatar
            {...stringAvatar(userName)}
            sx={{
              width: { xs: 38, md: 42 },
              height: { xs: 38, md: 42 },
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              fontWeight: 700,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default DashboardHeader;