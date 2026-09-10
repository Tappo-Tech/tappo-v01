// COMPONENTS
import MenuHeader from "../components/MenuHeader";
import MenuFilterTabs from "../components/MenuFilterTabs";
import MenuItemsList from "../components/MenuItemsList";
import FloatingCartBar from "../components/FloatingCartBar";
import CartDrawer from "../components/CartDrawer";
import NotFound from "../components/NotFound";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// DATA
import { validTables } from "../data/mockData";

// CONTEXTS
import { useCart } from "../context/CartContext";

// HOOKS
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Menu() {
  const [ isOpen, setOpen ] = useState(false);
  const {setTable} = useCart();

  function handleCartOpen() {
    setOpen(true);
  }

  function handleCartClose() {
    setOpen(false);
  }

  const { tableNumber } = useParams();
  const isValidTable = validTables.includes(tableNumber);

  useEffect(() => {
    if (tableNumber) {
      setTable(tableNumber);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableNumber, isValidTable]);

  if (!isValidTable) {
    return (
      <Container maxWidth="sm">
        <NotFound
          title="طاولة غير صالحة"
          message="عذراً، لم نتمكن من التعرف على رقم الطاولة. يرجى مسح رمز الـ QR الموجود على طاولتك مرة أخرى."
        />
      </Container>
    );
  }

  return (
    <Box
      sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 2 }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          px: 2,
          pt: 2,
          pb: 1,
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
          mb: 2,
        }}
      >
        <Container maxWidth="md" disableGutters>
          <MenuHeader table={tableNumber} />
          <MenuFilterTabs />
        </Container>
      </Box>

      <Container maxWidth="md">
        <MenuItemsList />
      </Container>

      <FloatingCartBar handleCartOpen={handleCartOpen} />

      <CartDrawer open={isOpen} close={handleCartClose} />
    </Box>
  );
}

export default Menu;
