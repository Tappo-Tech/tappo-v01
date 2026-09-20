// COMPONENTS
import MenuHeader from "../components/menu/MenuHeader";
import MenuFilterTabs from "../components/menu/MenuFilterTabs";
import MenuItemsList from "../components/menu/MenuItemsList";
import FloatingCartBar from "../components/cart/FloatingCartBar";
import CartDrawer from "../components/cart/CartDrawer";
import NotFound from "../components/NotFound";
import FloatingActions from "../components/menu/FloatingActions"; // 👈 استدعاء المكون هنا

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// CONTEXTS
import { useCart } from "../context/CartContext";
import { useTables } from "../context/TablesContext";

// HOOKS
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Menu() {
  const [isOpen, setOpen] = useState(false);

  function handleCartOpen() {
    setOpen(true);
  }

  function handleCartClose() {
    setOpen(false);
  }

  const { tables } = useTables();
  const { setTable } = useCart();
  const { tableNumber } = useParams();

  const isValidTable = tables.some(
    (t) => String(t.tableNumber) === String(tableNumber)
  );

  useEffect(() => {
    if (isValidTable && tableNumber) {
      setTable(tableNumber);
    }
  }, [tableNumber, isValidTable, setTable]);

  // دالة التعامل مع نداء الجرسون
  const handleCallWaiter = (data) => {
    console.log("تم طلب الجرسون:", data);
    // يمكنك إرسال الطلب لـ OrderContext أو إظهار التنبيه (Toast)
  };

  // دالة التعامل مع إرسال الرأي
  const handleSubmitFeedback = (feedback) => {
    console.log("تم استلام رأي جديد:", feedback);
    // يمكنك هنا الإضافة لـ FeedbackContext الخاص بك
  };

  if (!isValidTable) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
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
      {/* HEADER & FILTER TABS */}
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

      {/* ITEMS SPACE */}
      <Container maxWidth="md">
        <MenuItemsList />
      </Container>

      {/* FLOATING ACTIONS (SPEED DIAL) */}
      <FloatingActions
        tableNumber={tableNumber}
        onCallWaiter={handleCallWaiter}
        onSubmitFeedback={handleSubmitFeedback}
      />

      {/* SHOWING CART BUTTON */}
      <FloatingCartBar handleCartOpen={handleCartOpen} />

      {/* CART DRAWER */}
      <CartDrawer open={isOpen} close={handleCartClose} />
    </Box>
  );
}

export default Menu;