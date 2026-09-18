// COMPONENTS

// MUI COMPONENTS
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

// CONTEXTS
import { useUser } from "../../context/UserContext";
import { useStore } from "../../context/StoreInfoContext";

function stringAvatar(name) {
  if (!name) return { children: "M" };

  const nameParts = name.trim().split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : nameParts[0][0].toUpperCase();

  return {
    children: initials,
  };
}

function ManagerHeader() {
  const { user } = useUser();
  const userName = user?.name || "Manager";

  const {storeInfo} = useStore();

  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        direction: "rtl",
        padding: 2,
      }}
    >
      {/* LOGO & TITLE */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            component={"img"}
            src="/logo-icon.png"
            alt="TAPPO LOGO ICON"
            sx={{ width: 40, height: 40 }}
          />

          <Typography
            sx={{
              fontSize: 22,
              fontWeight: "900",
              color: "secondary.contrastText",
            }}
          >
            TAPPO
          </Typography>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Typography sx={{ fontWeight: "700", color: "secondary.contrastText" }}>
          {storeInfo.storeName}
        </Typography>
      </Box>

      {/* MANAGER AVATAR (NAME INITIALS ONLY) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography sx={{ fontWeight: "600", color: "secondary.contrastText" }}>
          {userName}
        </Typography>
        
        {/* Avatar */}
        <Avatar
          {...stringAvatar(userName)}
          sx={{
            width: { xs: 36, md: 40 },
            height: { xs: 36, md: 40 },
            fontSize: { xs: "0.875rem", md: "0.95rem" },
            fontWeight: 700,
            color: "secondary.contrastText",
          }}
        />
      </Box>
    </Stack>
  );
}

export default ManagerHeader;