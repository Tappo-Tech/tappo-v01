// COMPONENTS
import MenuItemCard from "./MenuItemCard";

// MUI COMPONENTS
import Box from "@mui/material/Box";

// DATA
import { useMenu } from "../context/MenuContext";

function MenuItemsList() {
  const { filteredMenu } = useMenu();

  const ItemList = filteredMenu.map((item) => (
    <MenuItemCard key={item.id} itemDetails={item} />
  ));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {ItemList}
    </Box>
  );
}

export default MenuItemsList;
