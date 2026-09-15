// COMPONENTS

// MUI COMPONENTS
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

// HOOKS

// CONTEXTS

function ManagerHeader() {
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

          <Typography sx={{ fontSize: 22, fontWeight: "900", color: "secondary.contrastText" }}>
            TAPPO
          </Typography>
        </Box>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Typography sx={{ fontWeight: "700", color: "secondary.contrastText" }}>The Roastery HQ</Typography>
      </Box>

      {/* MANAGER AVATAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography sx={{ fontWeight: "600", color: "secondary.contrastText" }}>Manage Cafe</Typography>
        <Avatar alt="" src="" />
      </Box>
    </Stack>
  );
}

export default ManagerHeader;
