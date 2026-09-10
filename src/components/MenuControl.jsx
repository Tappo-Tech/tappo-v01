import { useState } from "react";
import { useMenu } from "../context/MenuContext";

// COMPONENTS
import AddItemDrawer from "./AddItemDrawer";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function MenuControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const {
    filteredMenu,
    searchQuery,
    setSearchQuery,
    deleteItem,
    toggleAvailable,
  } = useMenu();

  const handleOpenAdd = () => {
    setItemToEdit(null);
    setIsOpen(true);
  };

  const handleOpenEdit = (product) => {
    setItemToEdit(product);
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
    setItemToEdit(null);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          placeholder="ابحث عن صنف..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: { xs: "100%", sm: 300 } }}
        />

        <Button
          onClick={handleOpenAdd}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "primary.main",
            fontWeight: 700,
            borderRadius: "8px",
            px: 2.5,
          }}
        >
          إضافة صنف جديد
        </Button>
      </Box>

      {/* CARDS GRID */}
      <Grid container spacing={2}>
        {filteredMenu.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "none",
                opacity: product.available ? 1 : 0.6,
                transition: "0.2s",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.image || "/logo-icon.png"}
                alt={product.name}
              />

              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    ر.س{Number(product.price).toFixed(2)}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5, minHeight: 40 }}
                >
                  {product.description}
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={product.available}
                      onChange={() => toggleAvailable(product.id)}
                      color="success"
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {product.available ? "متوفر" : "غير متوفر"}
                    </Typography>
                  }
                />
              </CardContent>

              <CardActions
                sx={{
                  justifyContent: "flex-end",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  px: 1.5,
                  py: 1,
                }}
              >
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleOpenEdit(product)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteItem(product.id)}
                >
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* DRAWER COMPONENT */}
      <AddItemDrawer
        open={isOpen}
        onClose={handleDrawerClose}
        itemToEdit={itemToEdit}
      />
    </Box>
  );
}

export default MenuControl;