import { createTheme } from '@mui/material/styles';

/**
 * Material UI Theme Configuration
 * Light modern interface with professional colors and spacing
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00A5CE', // Cyan/Teal main color
      light: '#33BADE',
      dark: '#008A9F',
      contrastText: '#fff'
    },
    secondary: {
      main: '#757575',
      light: '#9e9e9e',
      dark: '#424242'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c'
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00'
    },
    info: {
      main: '#00A5CE',
      light: '#33BADE',
      dark: '#008A9F'
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f'
    },
    background: {
      default: '#f5f5f5', // Soft gray background
      paper: '#ffffff'
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd'
    },
    divider: '#e0e0e0'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.5px'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
      fontWeight: 400
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400
    },
    subtitle1: {
      fontSize: '0.95rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.9rem',
      letterSpacing: '0.3px'
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      fontWeight: 400
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8, // Base unit for spacing (8px)
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#ffffff',
          color: '#212121'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 6,
          transition: 'all 0.2s ease-in-out'
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
          }
        },
        outlined: {
          borderColor: '#e0e0e0',
          color: '#00A5CE',
          '&:hover': {
            borderColor: '#00A5CE',
            backgroundColor: 'rgba(0, 165, 206, 0.04)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.8rem',
          height: 24,
          borderRadius: 4
        },
        filled: {
          backgroundColor: '#f5f5f5',
          color: '#212121'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: '#fafafa',
            transition: 'all 0.2s ease-in-out',
            '&:hover fieldset': {
              borderColor: '#90caf9'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00A5CE',
              boxShadow: '0 0 0 3px rgba(0, 165, 206, 0.1)'
            }
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
});

export default theme;
