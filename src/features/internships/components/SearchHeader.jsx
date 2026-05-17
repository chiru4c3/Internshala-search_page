import React, { memo } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  TextField,
  Box,
  Typography,
  Stack,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InternshalaLogo from '../../../assets/internshala.svg';

/**
 * Search Header Component
 * Navigation bar with logo, menu, search, login/register buttons and mobile filter toggle
 */
export const SearchHeader = memo(({
  searchQuery,
  onSearchChange,
  onMobileFilterToggle = null,
  filterCount = 0
}) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
        color: '#212121',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            gap: 2
          }}
        >
          {/* Logo/Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img 
              src={InternshalaLogo} 
              alt="Internshala Logo" 
              style={{ height: '40px', width: 'auto' }}
            />
          </Box>

          {/* Menu Items - Desktop Only */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 3
            }}
          >
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#424242',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#00A5CE'
                }
              }}
            >
              Internships
            </Typography>
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#424242',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#00A5CE'
                }
              }}
            >
              Courses
            </Typography>
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#424242',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#00A5CE'
                }
              }}
            >
              Jobs
            </Typography>
          </Stack>

          {/* Search Bar - Flexible */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              maxWidth: '400px',
              mx: 'auto',
              minWidth: 0
            }}
          >
            <TextField
              placeholder="Search by profile, skills, company..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    sx={{
                      mr: 1,
                      color: '#9e9e9e',
                      fontSize: 20
                    }}
                  />
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  backgroundColor: '#f5f5f5',
                  fontSize: '0.9rem',
                  '&:hover fieldset': {
                    borderColor: '#90caf9'
                  }
                }
              }}
            />
          </Box>

          {/* Auth Buttons - Desktop Only */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexShrink: 0
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderColor: '#e0e0e0',
                color: '#00A5CE',
                '&:hover': {
                  borderColor: '#00A5CE',
                  backgroundColor: 'rgba(0, 165, 206, 0.04)'
                }
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                backgroundColor: '#00A5CE',
                '&:hover': {
                  backgroundColor: '#008A9F'
                }
              }}
            >
              Register
            </Button>
          </Stack>

          {/* Mobile Menu - Visible on mobile only */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            {onMobileFilterToggle && (
              <IconButton
                size="small"
                onClick={onMobileFilterToggle}
                sx={{
                  color: '#00A5CE'
                }}
              >
                <Badge badgeContent={filterCount > 0 ? filterCount : 0} color="primary">
                  <TuneIcon />
                </Badge>
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={handleMobileMenuOpen}
              sx={{
                color: '#00A5CE'
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={handleMobileMenuClose}>Internships</MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>Courses</MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>Jobs</MenuItem>
              <MenuItem divider onClick={handleMobileMenuClose}>Login</MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>Register</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

SearchHeader.displayName = 'SearchHeader';

export default SearchHeader;
