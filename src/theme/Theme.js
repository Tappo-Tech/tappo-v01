import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // اللون البرتقالي (للأزرار والتفاعلات الأساسية)
    primary: {
      main: '#F47920',
      light: '#F79952',
      dark: '#D96210',
      contrastText: '#FFFFFF',
    },
    
    // اللون النيفي (للهيدر، الأيقونات الثانوية، واللمسات الداكنة)
    secondary: {
      main: '#171A2F', 
      light: '#2E3250',
      dark: '#0B0D1A',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#F8F9FA', // خلفية فاتحة للتطبيق
      paper: '#FFFFFF',   // كروت الأصناف بيضاء
    },

    text: {
      primary: '#171A2F', // النيفي للعناوين   
      secondary: '#6B7280', 
    },
    
    divider: '#E5E7EB',
  },
  
  typography: {
    fontFamily: `'Tajawal', 'Inter', sans-serif`,
    h1: { fontWeight: 700, color: '#171A2F' }, 
    h3: { fontWeight: 700, color: '#171A2F' },
  },
  
  shape: {
    borderRadius: 12,
  },
});

export default theme;