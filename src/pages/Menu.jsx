// COMPONENTS
import MenuHeader from "../components/MenuHeader";
import MenuFilterTabs from "../components/MenuFilterTabs";
import NotFound from "../components/NotFound";

// MUI COMPONENTS
import Container from "@mui/material/Container";

// DATA
import { validTables } from "../data/mockData";

// HOOKS
import { useParams } from "react-router-dom";

function Menu() {
  const { tableNumber } = useParams();
  const isValidTable = validTables.includes(tableNumber);

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
    <Container maxWidth="md">
      <MenuHeader table={tableNumber} />
      <MenuFilterTabs />
    </Container>
  );
}

export default Menu;
