import React, { memo } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { formatDateAgo } from '../utils/filterUtils';

/**
 * Badge component for special attributes
 */
const BadgeChip = memo(({ label }) => (
  <Chip
    size="small"
    label={label}
    variant="filled"
    sx={{
      height: 28,
      fontSize: '0.75rem',
      fontWeight: 600,
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      border: '1px solid #4caf50'
    }}
  />
));

BadgeChip.displayName = 'BadgeChip';

/**
 * Early Applicant Badge
 */
const EarlyApplicantBadge = memo(() => (
  <Chip
    size="small"
    label="Be an early applicant"
    sx={{
      height: 26,
      fontSize: '0.75rem',
      fontWeight: 600,
      backgroundColor: '#fff3e0',
      color: '#e65100',
      border: '1px solid #ffb74d'
    }}
  />
));

EarlyApplicantBadge.displayName = 'EarlyApplicantBadge';

/**
 * Get initials from company name
 */
const getCompanyInitials = (companyName) => {
  if (!companyName) return 'IN';
  return companyName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Check if internship is recent
 */
const isEarlyApplicantOpportunity = (postedDate) => {
  const postedTime = new Date(postedDate);
  const currentTime = new Date();
  const hoursDifference = (currentTime - postedTime) / (1000 * 60 * 60);
  return hoursDifference < 24;
};

/**
 * Job Details Drawer Component
 * Displays full job details when a user clicks on a card
 */
export const JobDetailsDrawer = memo(({
  open = false,
  internship = null,
  onClose = () => {},
  onApply = () => {},
  onSave = () => {},
  isSaved = false
}) => {
  if (!internship) return null;

  const {
    id,
    title,
    company,
    location,
    duration,
    stipendMin,
    stipendMax,
    description,
    skills,
    postedDate,
    activelyHiring,
    workFromHome,
    partTime,
    applicants,
    logoUrl
  } = internship;

  const specialBadges = [];
  if (activelyHiring) specialBadges.push('Actively Hiring');
  if (workFromHome) specialBadges.push('Work From Home');
  if (partTime) specialBadges.push('Part Time');

  const showEarlyApplicant = isEarlyApplicantOpportunity(postedDate);
  const companyInitials = getCompanyInitials(company);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500 },
          backgroundColor: '#ffffff'
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header with Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#212121' }}>
            Job Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f5f5f5'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#bdbdbd',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: '#9e9e9e'
              }
            }
          }}
        >
          {/* Company Avatar and Title */}
          <Stack direction="row" spacing={2} sx={{ mb: 2.5 }} alignItems="flex-start">
            <Avatar
              sx={{
                width: 64,
                height: 64,
                backgroundColor: '#00A5CE',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1.2rem',
                flexShrink: 0
              }}
              src={logoUrl}
              alt={company}
            >
              {!logoUrl && companyInitials}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: '#006B8F',
                  mb: 0.5,
                  lineHeight: 1.3
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: '#212121',
                  mb: 1
                }}
              >
                {company}
              </Typography>

              {showEarlyApplicant && <EarlyApplicantBadge />}
            </Box>
          </Stack>

          {/* Special Badges */}
          {specialBadges.length > 0 && (
            <Box sx={{ mb: 2.5 }}>
              <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                {specialBadges.map((badge) => (
                  <BadgeChip key={badge} label={badge} />
                ))}
              </Stack>
            </Box>
          )}

          <Divider sx={{ my: 2.5 }} />

          {/* Key Details */}
          <Stack spacing={1.5} sx={{ mb: 2.5 }}>
            {/* Location */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: '#d32f2f' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#424242' }}>
                  {location}
                </Typography>
              </Stack>
            </Box>

            {/* Stipend */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <CurrencyRupeeIcon sx={{ fontSize: 18, color: '#2e7d32' }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#2e7d32' }}
                >
                  ₹ {(stipendMin / 1000).toFixed(0)}K - {(stipendMax / 1000).toFixed(0)}K /month
                </Typography>
              </Stack>
            </Box>

            {/* Duration */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayOutlinedIcon sx={{ fontSize: 18, color: '#00A5CE' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#424242' }}>
                  {duration}
                </Typography>
              </Stack>
            </Box>

            {/* Posted Date */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: '#757575' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#424242' }}>
                  {formatDateAgo(postedDate)}
                </Typography>
                {applicants && (
                  <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.8rem', ml: 1 }}>
                    • {applicants} applied
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          {/* Full Description */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: '#212121',
                mb: 1,
                fontSize: '0.95rem'
              }}
            >
              About the Role
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#424242',
                lineHeight: 1.7,
                fontSize: '0.9rem'
              }}
            >
              {description}
            </Typography>
          </Box>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: '#212121',
                  mb: 1,
                  fontSize: '0.95rem'
                }}
              >
                Required Skills
              </Typography>
              <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                {skills.map((skill, index) => (
                  <Tooltip key={index} title={`${skill} skill required`}>
                    <Chip
                      label={skill}
                      size="small"
                      variant="filled"
                      sx={{
                        height: 28,
                        fontSize: '0.75rem',
                        backgroundColor: '#f5f5f5',
                        color: '#424242',
                        border: '0.5px solid #e0e0e0',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          borderColor: '#00A5CE',
                          color: '#006B8F'
                        }
                      }}
                    />
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
          <Tooltip title={isSaved ? 'Saved' : 'Save internship'}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onSave(id)}
              startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                borderColor: isSaved ? '#fdd835' : '#e0e0e0',
                color: isSaved ? '#fdd835' : '#00A5CE',
                '&:hover': {
                  borderColor: '#fdd835',
                  backgroundColor: 'rgba(253, 216, 53, 0.08)'
                }
              }}
            >
              Save
            </Button>
          </Tooltip>

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onApply(id)}
            sx={{
              flex: 1,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #27632a 0%, #2e7d32 100%)'
              }
            }}
          >
            Apply Now
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
});

JobDetailsDrawer.displayName = 'JobDetailsDrawer';

export default JobDetailsDrawer;
