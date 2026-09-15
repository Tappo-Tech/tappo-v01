// MUI COMPONENTS
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

// MUI HOOKS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ICONS
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

// DATA
import { currentUserMock } from "../../data/mockData";

const currentDate = new Date().toLocaleDateString("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function stringAvatar(name) {
  return {
    children: name ? name.trim()[0].toUpperCase() : "U",
  };
}

function DashboardHeader({ title, onOpenMenu, notificationsCount = 0 }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "white", width: "100%", p: { xs: 1, md: 2 } }}>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        {isMobile && (
          <IconButton color="inherit" onClick={onOpenMenu} edge="start">
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ textAlign: "start" }}>
          <Typography
            variant="h5"
            component={"h2"}
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              fontWeight: 500,
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            {currentDate} | شاشة الكاشير \ المطبخ
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: "10px",
          }}
        >
          <IconButton sx={{ color: "text.secondary" }}>
            <Badge badgeContent={notificationsCount} color="error">
              <NotificationsIcon sx={{ fontSize: { xs: 22, md: 24 } }} />
            </Badge>
          </IconButton>

          <Avatar
            src={currentUserMock.avatar}
            alt={currentUserMock.name}
            {...stringAvatar(currentUserMock.name)}
            sx={{
              width: { xs: 36, md: 40 },
              height: { xs: 36, md: 40 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              fontWeight: 700,
              bgcolor: "primary.main",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default DashboardHeader;
