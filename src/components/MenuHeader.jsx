// COMPONENTS
import MenuSearchBar from "./MenuSearchBar";

// MUI COMPONENTS
import { Box, Stack, Chip, Typography } from "@mui/material";

// ICONS
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

function MenuHeader({ table }) {
  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h3" component="h3">
            راحة كافي
          </Typography>
          <Typography variant="subtitle1" component="p">
            كافي و حلويات راحة
          </Typography>
        </Box>
        <Chip icon={<PlaceOutlinedIcon />} label={`طاولة  ${table}`} />
      </Stack>
      <MenuSearchBar />
    </Box>
  );
}

export default MenuHeader;
