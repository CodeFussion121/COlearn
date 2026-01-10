import { createTheme } from '@mui/material/styles';

const googleBlue = '#4285F4';
const googleRed = '#DB4437';
const googleYellow = '#F4B400';
const googleGreen = '#0F9D58';

const theme = createTheme({
  palette: {
    primary: {
      main: googleBlue,
    },
    secondary: {
      main: googleGreen,
    },
    error: {
      main: googleRed,
    },
    warning: {
      main: googleYellow,
    },
    background: {
      default: '#F8F9FA', // Google grey background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#202124',
      secondary: '#5F6368',
    },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Google buttons are not all caps
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Standard Google radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Pill shaped buttons
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                // Google card style
                boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
                border: 'none', 
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
                backgroundColor: '#FFFFFF',
                color: '#5F6368',
            }
        }
    }
  },
});

export default theme;
