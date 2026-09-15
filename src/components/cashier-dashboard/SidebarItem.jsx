// MUI COMPONENTS
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function SidebarItem({ navItem, isSelected, onSelect }) {
  return (
    <ListItem disablePadding sx={{ mb: 0 }}>
      <ListItemButton
        selected={isSelected}
        onClick={onSelect}
        sx={{
          borderRadius: "6px",
          py: 1,
          px: 1.5,
          gap: 1.5,
          justifyContent: "flex-start",
          "&.Mui-selected": {
            bgcolor: "rgba(255, 255, 255, 0.08)",
            color: "common.white",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.12)",
            },
            "& .MuiListItemIcon-root": {
              color: "#ff602e",
            },
          },
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.05)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
            color: isSelected ? "#ff602e" : "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          {navItem.icon}
        </ListItemIcon>
        <ListItemText
          primary={navItem.label}
          primaryTypographyProps={{
            fontSize: "0.9rem",
            fontWeight: isSelected ? 700 : 500,
            sx: { textAlign: "start" },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default SidebarItem;