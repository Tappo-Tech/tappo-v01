// MUI COMPONENTS
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function SidebarItem({ navItem, isSelected, onSelect }) {
  return (
    <ListItem disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        selected={isSelected}
        onClick={onSelect}
        sx={{
          borderRadius: 2,
          "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "common.white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "& .MuiListItemIcon-root": {
              color: "common.white",
            },
          },
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isSelected ? "common.white" : "inherit",
          }}
        >
          {navItem.icon}
        </ListItemIcon>
        <ListItemText
          primary={navItem.label}
          primarytypographyprops={{
            fontSize: "0.95rem",
            fontWeight: isSelected ? 700 : 400,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default SidebarItem;