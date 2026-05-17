import React from 'react';
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  Stack
} from '@mui/material';

/**
 * Loading skeleton for internship cards
 */
export const InternshipCardSkeleton = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="80%" height={20} />
          <Stack direction="row" spacing={1}>
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="text" width="30%" height={16} />
          </Stack>
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} variant="rounded" width={60} height={24} />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width="25%" height={16} />
            <Skeleton variant="rectangular" width={80} height={32} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

/**
 * Loading skeleton for filter sidebar
 */
export const FilterSidebarSkeleton = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2.5}>
        {[1, 2, 3, 4].map(i => (
          <Box key={i}>
            <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
            <Stack spacing={1}>
              {[1, 2, 3].map(j => (
                <Skeleton key={j} variant="text" width="80%" height={20} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

/**
 * Loading skeleton list
 */
export const SkeletonList = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <InternshipCardSkeleton key={i} />
      ))}
    </>
  );
};
