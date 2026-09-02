// HOOKS
import { useState } from "react";

// MUI COMPONENTS
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

function MenuFilterTabs() {
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  const handleAlignment = (event, newCategories) => {
    if (newCategories.length > 0) {
      setSelectedCategories(newCategories);
    }
  };

  return (
    <Box sx={{ overflowX: "auto", py: 1, mb: 2 }}>
      <ToggleButtonGroup
        value={selectedCategories}
        onChange={handleAlignment}
        aria-label="menu categories"
        // exclusive={false}
        sx={{
          display: "flex",
          gap: 1,
          "& .MuiToggleButton-root": {
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "divider",
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            color: "text.secondary",
            backgroundColor: "background.paper",
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          },
        }}
      >
        <ToggleButton value="all">الكل</ToggleButton>
        <ToggleButton value="cold-brew">مشروبات باردة</ToggleButton>
        <ToggleButton value="desserts">حلى</ToggleButton>
        <ToggleButton value="snacks">سناكس</ToggleButton>
        <ToggleButton value="specials">عروض خاصة</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default MenuFilterTabs;
