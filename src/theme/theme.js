import { createTheme } from '@mui/material/styles';

// Premium Color Palettes (Cyberpunk & Minimalist Fusion)
const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#6366f1', // Indigo 500
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#10b981', // Emerald 500
    light: '#34d399',
    dark: '#059669',
  },
  background: {
    default: '#0b0f1a', // Deeper Space Black
    paper: '#111827',   // Gray 900
    glass: 'rgba(17, 24, 39, 0.7)',
  },
  text: {
    primary: '#f3f4f6',
    secondary: '#9ca3af',
  },
  accent: {
    purple: '#a855f7',
    orange: '#f97316',
    pink: '#ec4899',
  }
};

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#4f46e5', // Indigo 600
    light: '#6366f1',
    dark: '#3730a3',
  },
  secondary: {
    main: '#059669', // Emerald 600
    light: '#10b981',
    dark: '#047857',
  },
  background: {
    default: '#f9fafb', // Gray 50
    paper: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.7)',
  },
  text: {
    primary: '#111827',
    secondary: '#4b5563',
  },
};

const getThemeBase = (mode) => ({
  palette: mode === 'dark' ? darkPalette : lightPalette,
  typography: {
    fontFamily: '"Outfit", "Google Sans", "Inter", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 900,
      letterSpacing: '-0.05em',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-0.04em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        body {
          transition: background-color 0.3s ease;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${mode === 'dark' ? '#334155' : '#cbd5e1'};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${mode === 'dark' ? '#475569' : '#94a3b8'};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Consistent button radius
          textTransform: 'none', // Professional casing
          fontWeight: 700,
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)', // Keep the lift effect
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', // Indigo-600 to Indigo-500
          '&:hover': {
            background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)',
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          boxShadow: mode === 'dark' ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
        },
        elevation0: {
          boxShadow: 'none',
          border: 'none'
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark' ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme(getThemeBase('light'));
export const darkTheme = createTheme(getThemeBase('dark'));

export default lightTheme;
