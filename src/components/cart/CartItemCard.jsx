// MUI COMPONENTS
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// ICONS
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// CONTEXTS
import { useCart } from "../../context/CartContext";

function CartItemCard({ cartItemDetails }) {
  const { updatedQuantity } = useCart();

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
        mb: 2,
        borderRadius: "16px",
        boxShadow: "0px 2px 12px rgba(0,0,0,0.04)",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          pl: 1.5,
        }}
      >
        <Box sx={{ textAlign: "start" }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, mb: 0.5, fontSize: "1rem" }}
          >
            {cartItemDetails.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
              fontWeight: 500,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {cartItemDetails.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1.5,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 800, color: "primary.main", fontSize: "0.95rem" }}
          >
            {cartItemDetails.price} ر.س
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() =>
                updatedQuantity(
                  cartItemDetails.id,
                  cartItemDetails.quantity - 1,
                )
              }
              size="small"
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <RemoveIcon />
            </IconButton>

            <Typography
              variant="h6"
              sx={{ fontWeight: 700, minWidth: "20px", textAlign: "center" }}
            >
              {cartItemDetails.quantity}
            </Typography>

            <IconButton
              onClick={() =>
                updatedQuantity(
                  cartItemDetails.id,
                  cartItemDetails.quantity + 1,
                )
              }
              size="small"
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                color: "primary.main",
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <CardMedia
        component="img"
        image={cartItemDetails.image}
        alt={cartItemDetails.name}
        sx={{
          width: 95,
          height: 95,
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />
    </Card>
  );
}

export default CartItemCard;
