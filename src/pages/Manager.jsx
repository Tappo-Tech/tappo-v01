// COMPONENTS
import ManagerHeader from "../components/manager-dashboard/ManagerHeader";

// MUI COMPONENTS
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Manager() {
  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="xl" sx={{ backgroundColor: "secondary.main" }}>
        <ManagerHeader />
      </Container>
    </Box>
  );
}

export default Manager;
