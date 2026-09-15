// COMPONENTS
import MenuItemCard from "./MenuItemCard";

// MUI COMPONENTS
import Box from "@mui/material/Box";

// DATA
import { useMenu } from "../../context/MenuContext";
import { useCart } from "../../context/CartContext";

function MenuItemsList() {
  const { filteredMenu } = useMenu();
  const { cartItems } = useCart();

  const ItemList = filteredMenu.map((item) => (
    <MenuItemCard key={item.id} itemDetails={item} />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        pb: cartItems.length > 0 ? "90px" : "0",
      }}
    >
      {ItemList}
    </Box>
  );
}

export default MenuItemsList;
