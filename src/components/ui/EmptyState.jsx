import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FilterListIcon from '@mui/icons-material/FilterList';

/**
 * Empty state component when no internships are found
 */
export const EmptyState = ({
  title = 'No internships found',
  message = 'Try adjusting your filters or search criteria',
  onClearFilters = null
}) => {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderRadius: 2
      }}
    >
      <Box sx={{ mb: 2 }}>
        <SearchOffIcon
          sx={{
            fontSize: 60,
            color: '#bdbdbd',
            mb: 1
          }}
        />
      </Box>
      
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: '#212121',
          mb: 1
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: '#757575',
          mb: 3
        }}
      >
        {message}
      </Typography>
      
      {onClearFilters && (
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={onClearFilters}
          sx={{
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Clear Filters
        </Button>
      )}
    </Paper>
  );
};

/**
 * Loading state component
 */
export const LoadingState = ({ message = 'Loading internships...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        minHeight: '400px'
      }}
    >
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

/**
 * Error state component
 */
export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading internships. Please try again.',
  onRetry = null
}) => {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: 2
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: '#856404',
          mb: 1
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: '#856404',
          mb: 2
        }}
      >
        {message}
      </Typography>
      
      {onRetry && (
        <Button
          variant="contained"
          color="warning"
          onClick={onRetry}
          sx={{
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Try Again
        </Button>
      )}
    </Paper>
  );
};
