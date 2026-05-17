import React, { memo } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { formatDateAgo } from '../utils/filterUtils';

/**
 * Badge component for special internship attributes
 */
const BadgeChip = memo(({ label, variant = 'filled' }) => (
  <Chip
    size="small"
    label={label}
    variant={variant}
    sx={{
      height: 28,
      fontSize: '0.75rem',
      fontWeight: 600,
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      border: '1px solid #4caf50',
      '& .MuiChip-label': {
        px: 1
      }
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
  
  return hoursDifference < 24; // Show badge if posted within last 24 hours
};

/**
 * Internship Card Component - Internshala Style Layout
 * Professional structure with company logo, location, stipend, duration and icons
 */
export const InternshipCard = memo(({
  internship,
  onViewDetails = null,
  onApply = null,
  onSave = null,
  isSaved = false
}) => {
  const {
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

  // Collect special badges
  const specialBadges = [];
  if (activelyHiring) specialBadges.push('Actively Hiring');
  if (workFromHome) specialBadges.push('Work From Home');
  if (partTime) specialBadges.push('Part Time');

  const showEarlyApplicant = isEarlyApplicantOpportunity(postedDate);
  const companyInitials = getCompanyInitials(company);

  return (
    <Card
      onClick={() => onViewDetails?.()}
      sx={{
        mb: 2.5,
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)'
        }
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        {/* Header with Company Logo and Title */}
        <Stack direction="row" spacing={2} sx={{ mb: 1.5 }} alignItems="flex-start">
          {/* Company Logo/Avatar */}
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: '#00A5CE',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1.1rem',
              flexShrink: 0
            }}
            src={logoUrl}
            alt={company}
          >
            {!logoUrl && companyInitials}
          </Avatar>

          {/* Title and Company Info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: '1.15rem',
                color: '#006B8F',
                mb: 0.5,
                lineHeight: 1.3,
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#008A9F'
                }
              }}
            >
              {title}
            </Typography>

            {/* Company Name */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#212121',
                mb: 0.75
              }}
            >
              {company}
            </Typography>

            {/* Early Applicant Badge */}
            {showEarlyApplicant && (
              <Box sx={{ mb: 1 }}>
                <EarlyApplicantBadge />
              </Box>
            )}
          </Box>
        </Stack>

        {/* Special Badges - Green and Visible */}
        {specialBadges.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
              {specialBadges.map((badge) => (
                <BadgeChip key={badge} label={badge} />
              ))}
            </Stack>
          </Box>
        )}

        {/* Key Details Grid - Location, Stipend, Duration, Posted Date */}
        <Stack spacing={1} sx={{ mb: 1.5 }}>
          {/* Location */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnOutlinedIcon sx={{ fontSize: 18, color: '#d32f2f' }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: '#424242'
                }}
              >
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
                sx={{
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#2e7d32'
                }}
              >
                 {(stipendMin / 1000).toFixed(0)}K - {(stipendMax / 1000).toFixed(0)}K /month
              </Typography>
            </Stack>
          </Box>

          {/* Duration */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayOutlinedIcon sx={{ fontSize: 18, color: '#00A5CE' }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: '#424242'
                }}
              >
                {duration}
              </Typography>
            </Stack>
          </Box>

          {/* Posted Date/Time */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: '#757575' }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: '#424242'
                }}
              >
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

        <Divider sx={{ my: 1.5 }} />

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#424242',
            mb: 1.5,
            lineHeight: 1.6,
            fontSize: '0.9rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {description}
        </Typography>

        {/* Skills */}
        <Box sx={{ mb: 1 }}>
          <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
            {skills.slice(0, 5).map((skill, index) => (
              <Tooltip key={index} title={`${skill} skill required`}>
                <Chip
                  label={skill}
                  size="small"
                  variant="filled"
                  sx={{
                    height: 26,
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
            {skills.length > 5 && (
              <Chip
                label={`+${skills.length - 5} more`}
                size="small"
                variant="filled"
                sx={{
                  height: 26,
                  fontSize: '0.75rem',
                  backgroundColor: '#e8eaf6',
                  color: '#3f51b5',
                  fontWeight: 600
                }}
              />
            )}
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ pt: 0, pb: 1, px: 2, justifyContent: 'space-between', gap: 1 }}>
        <Tooltip title={isSaved ? 'Saved' : 'Save internship'}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onSave?.(internship.id);
            }}
            sx={{
              color: isSaved ? '#fdd835' : '#757575',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#fdd835',
                backgroundColor: 'rgba(253, 216, 53, 0.08)'
              }
            }}
          >
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Tooltip>

        <Stack direction="row" spacing={1}>
          {onViewDetails && (
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
              endIcon={<OpenInNewIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                borderColor: '#e0e0e0',
                color: '#00A5CE',
                '&:hover': {
                  borderColor: '#00A5CE',
                  backgroundColor: 'rgba(0, 165, 206, 0.04)'
                }
              }}
            >
              View
            </Button>
          )}
          {onApply && (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onApply();
              }}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #27632a 0%, #2e7d32 100%)'
                }
              }}
            >
              Apply
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
});

InternshipCard.displayName = 'InternshipCard';

export default InternshipCard;
