import React, { memo } from 'react';
import {
  Box,
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper
} from '@mui/material';
import InternshipCard from './InternshipCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { SkeletonList } from '../../../components/ui/SkeletonLoader';

/**
 * Internship List Component
 * Displays paginated list of internships with sorting and controls
 */
export const InternshipList = memo(({
  internships,
  pagination,
  onPageChange,
  sortBy,
  onSortChange,
  isLoading = false,
  onViewDetails = null,
  onApply = null,
  onSave = null,
  savedInternships = new Set(),
  onClearFilters = null
}) => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  const startIndex = (pagination.page - 1) * pagination.pageSize + 1;
  const endIndex = Math.min(pagination.page * pagination.pageSize, pagination.total);

  if (isLoading) {
    return (
      <Box>
        <SkeletonList count={pagination.pageSize} />
      </Box>
    );
  }

  if (internships.length === 0) {
    return (
      <EmptyState
        title="No internships found"
        message="Try adjusting your filters or search criteria to find more opportunities"
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <Stack spacing={2}>
      {/* Total Count Heading with Subtitle */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#006B8F',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: 0.5
          }}
        >
          {pagination.total} Total Internships
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#757575',
            fontSize: '0.95rem',
            fontWeight: 500
          }}
        >
          Latest Summer Internships in India
        </Typography>
      </Box>

      {/* List Header with Sorting and Info */}
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          backgroundColor: '#fafafa'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#757575',
            fontWeight: 500
          }}
        >
          Showing <strong>{startIndex}</strong> to <strong>{endIndex}</strong> of{' '}
          <strong>{pagination.total}</strong> internships
        </Typography>

        {/* Sort Control */}
        <FormControl
          size="small"
          sx={{
            minWidth: 180
          }}
        >
          <InputLabel
            sx={{
              fontSize: '0.875rem'
            }}
          >
            Sort By
          </InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            label="Sort By"
            sx={{
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0'
              }
            }}
          >
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="stipend-high">Highest Stipend</MenuItem>
            <MenuItem value="stipend-low">Lowest Stipend</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Internship Cards */}
      <Stack spacing={1.5}>
        {internships.map((internship) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            onViewDetails={() => onViewDetails?.(internship)}
            onApply={() => onApply?.(internship)}
            onSave={onSave}
            isSaved={savedInternships.has(internship.id)}
          />
        ))}
      </Stack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            borderTop: '1px solid #e0e0e0',
            mt: 2
          }}
        >
          <Pagination
            count={totalPages}
            page={pagination.page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
            size="medium"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-page': {
                fontSize: '0.875rem'
              }
            }}
          />
        </Box>
      )}
    </Stack>
  );
});

InternshipList.displayName = 'InternshipList';

export default InternshipList;
