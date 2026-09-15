// COMPONENTS
import MenuHeader from "../components/menu/MenuHeader";
import MenuFilterTabs from "../components/menu/MenuFilterTabs";
import MenuItemsList from "../components/menu/MenuItemsList";
import FloatingCartBar from "../components/cart/FloatingCartBar";
import CartDrawer from "../components/cart/CartDrawer";
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
  const [isOpen, setOpen] = useState(false); /*
   state
   مسؤلة من فتح  و قفل واظهار زر فتح السلة العائم السلة بناء علي الدالة 
   (handleCartOpen) اللي بيتم ارساله (FloatingCartBar)
   و هناك بيتم التاكد بشرط في حال كان متغير (cartItems) بيساوي 0 ما بيظهر الزر و برجع المكون null
   و اذا لم يتحقق الشرط بيظهر الزر و في حال الضغط عليه بتتحول لترو في الدالة (handleCartOpen)
   */
  function handleCartOpen() {
    setOpen(true);
  }

  function handleCartClose() {
    setOpen(false);
  }

  const { setTable } =
    useCart(); /* دالة في ال(CartContext) مسؤلة عن ارسال رقم الطاولة اللي مستخرج عن طريق (useParams) */

  const { tableNumber } = useParams(); /* hook بيستخرج رقم الطاولة من الرابط */
  const isValidTable =
    validTables.includes(
      tableNumber,
    ); /* شرط بتحقق هل رقم الطاولة في الكائن المخزن فيه عدد او ارقام الطاولات  */

  useEffect(() => {
    if (tableNumber) {
      setTable(tableNumber);
    } /* هنا بيتم ارسال رقم الطاولة الحالي لل CartContext عشان يتم ارساله و استعمالة في ال OrderContext */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tableNumber,
    isValidTable,
    setTable,
  ]); /* هنا استخدمت useEffect  عشان ما يتم ارسال رقم الطاولة في كل مرة يحصل فيها re-render و يتم ارساله في حال تغير الرقم او تغير ناتج الشرط اللي بيتحقق من وجوده في الكائن */

  if (!isValidTable) {
    return (
      <Container maxWidth="sm">
        <NotFound
          title="طاولة غير صالحة"
          message="عذراً، لم نتمكن من التعرف على رقم الطاولة. يرجى مسح رمز الـ QR الموجود على طاولتك مرة أخرى."
        />
      </Container>
    );
  } /* هنا بيتم التحقق من الرقم و اذا كان غير موجود بيتم اظهار صفحة الخطاء */

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

      {/* SHOWING CART BUTTON AND CALCULATING THE PRICE */}
      <FloatingCartBar handleCartOpen={handleCartOpen} />

      {/* CART DRAWER */}
      <CartDrawer open={isOpen} close={handleCartClose} />
    </Box>
  );
}

export default Menu;
