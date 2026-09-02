// MUI COMPONENTS
import { TextField } from '@mui/material';

function MenuSearchBar() {
  return (
    <TextField
      fullWidth
      placeholder="ابحث عن قهوتك أو حلاك المفضل..."
      variant="outlined"
      sx={{
        backgroundColor: 'background.paper',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'divider',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'secondary.main', 
          }
        }
      }}
    />
  );
}

export default MenuSearchBar;