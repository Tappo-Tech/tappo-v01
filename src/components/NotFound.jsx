// MUI COMPONENTS
import { Box, Typography } from '@mui/material';

// ICONS
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';

function NotFound({ title, message }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 10, px: 2 }}>
      <ReportGmailerrorredOutlinedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}

export default NotFound;