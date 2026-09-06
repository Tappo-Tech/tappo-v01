// MUI COMPONENTS
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";

// MUI HOOKS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ICONS
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

// DATA
import { currentUserMock } from "../data/mockData";

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
    <Box sx={{ width: "100%", p: { xs: 1, md: 2 } }}>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        {isMobile && (
          <IconButton color="inherit" onClick={onOpenMenu} edge="start">
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ textAlign: "start" }}>
          <Typography
            variant="h4"
            component={"h2"}
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2.125rem" },
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              fontWeight: 400,
              color: "text.secondary",
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
          <IconButton>
            <Badge badgeContent={notificationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            src={currentUserMock.avatar}
            alt={currentUserMock.name}
            {...stringAvatar(currentUserMock.name)}
            sx={{
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              fontSize: { xs: "0.875rem", md: "1.125rem" },
              fontWeight: 600,
              bgcolor: "secondary.main",
            }}
          />
        </Box>
      </Stack>

      <Divider variant="fullWidth" sx={{ mt: 2 }} />
    </Box>
  );
}

export default DashboardHeader;
