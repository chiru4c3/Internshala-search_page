import React, { memo, useState, useMemo, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Divider,
  Collapse,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Autocomplete
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { formatCurrency } from '../utils/filterUtils';

/**
 * Filter Section Component
 * Collapsible section for each filter category
 */
const FilterSection = memo(({
  title,
  children,
  defaultExpanded = true,
  count = 0,
  icon = null
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f9f9f9'
          },
          px: 0.5,
          borderRadius: 1
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {icon && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#00A5CE' }}>
              {icon}
            </Box>
          )}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#212121',
              fontSize: '0.95rem'
            }}
          >
            {title}
          </Typography>
          {count > 0 && (
            <Chip
              label={count}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                minWidth: 20
              }}
            />
          )}
        </Stack>
        <IconButton
          size="small"
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout="auto">
        <Box sx={{ pl: 1, pt: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
});

FilterSection.displayName = 'FilterSection';

/**
 * Filter Sidebar Component
 * Desktop-friendly filter sidebar with all filter controls
 */
export const FilterSidebar = memo(({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
  isLoading = false
}) => {
  const [selectedProfiles, setSelectedProfiles] = useState(filters.selectedProfiles || []);
  const [selectedLocations, setSelectedLocations] = useState(filters.selectedLocations || []);
  const [profileInputValue, setProfileInputValue] = useState('');
  const [locationInputValue, setLocationInputValue] = useState('');
  const [keywordInput, setKeywordInput] = useState(filters.keywordFilter || '');

  const {
    profiles: availableProfiles = [],
    locations: availableLocations = [],
    durations = [],
    maxStipend = 50000
  } = filterOptions;

  // Memoized suggestions to prevent duplicates and sort
  const profileSuggestions = useMemo(() => {
    const existing = new Set(selectedProfiles);
    return availableProfiles.filter(p => !existing.has(p)).sort();
  }, [availableProfiles, selectedProfiles]);

  const locationSuggestions = useMemo(() => {
    const existing = new Set(selectedLocations);
    return availableLocations.filter(l => !existing.has(l)).sort();
  }, [availableLocations, selectedLocations]);

  const countActiveFilters = () => {
    let count = 0;
    if (selectedProfiles?.length) count += selectedProfiles.length;
    if (selectedLocations?.length) count += selectedLocations.length;
    if (keywordInput?.length) count += 1;
    if (filters.minStipend > 0) count += 1;
    if (filters.workFromHome) count += 1;
    if (filters.partTime) count += 1;
    return count;
  };

  const activeFilterCount = countActiveFilters();

  // Sync local state with filters prop
  useEffect(() => {
    setSelectedProfiles(filters.selectedProfiles || []);
    setSelectedLocations(filters.selectedLocations || []);
    setKeywordInput(filters.keywordFilter || '');
    setProfileInputValue('');
    setLocationInputValue('');
  }, [filters.selectedProfiles, filters.selectedLocations, filters.keywordFilter]);

  // Handle clear all filters
  const handleClearAllFilters = () => {
    setSelectedProfiles([]);
    setSelectedLocations([]);
    setProfileInputValue('');
    setLocationInputValue('');
    setKeywordInput('');
    onClearFilters();
  };

  // Handle Profile selection and custom input
  const handleProfileChange = (event, newValue) => {
    setSelectedProfiles(newValue);
    onFilterChange('selectedProfiles', newValue);
  };

  const handleProfileInputChange = (event, value, reason) => {
    setProfileInputValue(value);
    
    // Handle Enter key to add custom value
    if (reason === 'input' && value.endsWith('\n')) {
      const cleanValue = value.replace('\n', '').trim();
      if (cleanValue && !selectedProfiles.includes(cleanValue)) {
        const newProfiles = [...selectedProfiles, cleanValue];
        setSelectedProfiles(newProfiles);
        onFilterChange('selectedProfiles', newProfiles);
        setProfileInputValue('');
      }
      return;
    }
  };

  // Handle Location selection and custom input
  const handleLocationChange = (event, newValue) => {
    setSelectedLocations(newValue);
    onFilterChange('selectedLocations', newValue);
  };

  const handleLocationInputChange = (event, value, reason) => {
    setLocationInputValue(value);

    // Handle Enter key to add custom value
    if (reason === 'input' && value.endsWith('\n')) {
      const cleanValue = value.replace('\n', '').trim();
      if (cleanValue && !selectedLocations.includes(cleanValue)) {
        const newLocations = [...selectedLocations, cleanValue];
        setSelectedLocations(newLocations);
        onFilterChange('selectedLocations', newLocations);
        setLocationInputValue('');
      }
      return;
    }
  };

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setKeywordInput(value);
    onFilterChange('keywordFilter', value);
  };

  return (
    <Paper
      sx={{
        p: 1.5,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 80,
        overflow: 'hidden'
      }}
    >
      {/* Header with Filter Icon and Clear Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1
        }}
      >
        <Stack direction="row" spacing={0.75} alignItems="center">
          <FilterListIcon sx={{ color: '#00A5CE', fontSize: 20 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#212121',
              fontSize: '0.95rem'
            }}
          >
            Filters
          </Typography>
        </Stack>
        <Button
          size="small"
          onClick={handleClearAllFilters}
          startIcon={<ClearIcon />}
          disabled={activeFilterCount === 0}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            color: '#00A5CE',
            opacity: activeFilterCount > 0 ? 1 : 0.15,
            transition: 'opacity 0.3s ease',
            cursor: activeFilterCount > 0 ? 'pointer' : 'not-allowed',
            '&:hover': {
              backgroundColor: activeFilterCount > 0 ? 'rgba(0, 165, 206, 0.08)' : 'transparent'
            },
            '&.Mui-disabled': {
              color: '#00A5CE'
            }
          }}
        >
          Clear
        </Button>
      </Box>

      {/* Active Filter Count Badge */}
      {activeFilterCount > 0 && (
        <Box sx={{ mb: 1 }}>
          <Chip
            label={`${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} active`}
            color="primary"
            variant="filled"
            size="small"
            sx={{
              height: 28,
              fontWeight: 600
            }}
          />
        </Box>
      )}

      <Divider sx={{ mb: 1 }} />

      {/* Scrollable Filters Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
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
        <Stack spacing={1.5}>
          {/* Profile Autocomplete */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: '#212121',
                fontSize: '0.9rem',
                mb: 0.75
              }}
            >
              Profile
            </Typography>
            <Autocomplete
              multiple
              disabled={isLoading}
              options={profileSuggestions}
              value={selectedProfiles}
              onChange={handleProfileChange}
              inputValue={profileInputValue}
              onInputChange={handleProfileInputChange}
              freeSolo
              fullWidth
              size="small"
              noOptionsText="No profiles available"
              placeholder={selectedProfiles.length === 0 ? 'e.g. Marketing' : ''}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    size="small"
                    sx={{
                      fontSize: '0.85rem'
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={selectedProfiles.length === 0 ? 'e.g. Marketing' : ''}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.9rem',
                      backgroundColor: '#f9f9f9',
                      '&:hover fieldset': {
                        borderColor: '#90caf9'
                      }
                    }
                  }}
                />
              )}
              sx={{
                '& .MuiAutocomplete-listbox': {
                  fontSize: '0.9rem'
                }
              }}
            />
          </Box>

        {/* Location Autocomplete */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#212121',
              fontSize: '0.95rem',
              mb: 1
            }}
          >
            Location
          </Typography>
          <Autocomplete
            multiple
            disabled={isLoading}
            options={locationSuggestions}
            value={selectedLocations}
            onChange={handleLocationChange}
            inputValue={locationInputValue}
            onInputChange={handleLocationInputChange}
            freeSolo
            fullWidth
            size="small"
            noOptionsText="No locations available"
            placeholder={selectedLocations.length === 0 ? 'e.g. Delhi' : ''}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  size="small"
                  sx={{
                    fontSize: '0.85rem'
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={selectedLocations.length === 0 ? 'e.g. Delhi' : ''}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.9rem',
                    backgroundColor: '#f9f9f9',
                    '&:hover fieldset': {
                      borderColor: '#90caf9'
                    }
                  }
                }}
              />
            )}
            sx={{
              '& .MuiAutocomplete-listbox': {
                fontSize: '0.9rem'
              }
            }}
          />
        </Box>

        {/* Keyword Search */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#212121',
              fontSize: '0.95rem',
              mb: 1
            }}
          >
            Keyword
          </Typography>
          <TextField
            placeholder="e.g. Design, Mumbai, Infosys"
            variant="outlined"
            size="small"
            fullWidth
            value={keywordInput}
            onChange={handleKeywordChange}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: '#9e9e9e', fontSize: 18 }} />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '0.9rem',
                backgroundColor: '#f9f9f9',
                '&:hover fieldset': {
                  borderColor: '#90caf9'
                }
              }
            }}
          />
        </Box>

        {/* Work Mode Filter - Always Visible */}
        <Box sx={{ my: 1.5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#212121',
              fontSize: '0.95rem',
              mb: 1
            }}
          >
            Work Mode
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.workFromHome || false}
                  onChange={(e) =>
                    onFilterChange('workFromHome', e.target.checked)
                  }
                  size="small"
                  disabled={isLoading}
                />
              }
              label={<Typography variant="body2">Work From Home</Typography>}
              sx={{ m: 0, mb: 1 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.partTime || false}
                  onChange={(e) =>
                    onFilterChange('partTime', e.target.checked)
                  }
                  size="small"
                  disabled={isLoading}
                />
              }
              label={<Typography variant="body2">Part Time</Typography>}
              sx={{ m: 0 }}
            />
          </FormGroup>
        </Box>

        <Divider sx={{ my: 0.75 }} />

        {/* Duration Filter */}
        <FilterSection
          title="Duration"
          count={filters.durations?.length || 0}
          defaultExpanded={false}
        >
          <FormGroup>
            {durations.map((duration) => (
              <FormControlLabel
                key={duration}
                control={
                  <Checkbox
                    checked={filters.durations?.includes(duration) || false}
                    onChange={(e) => {
                      const newDurations = e.target.checked
                        ? [...(filters.durations || []), duration]
                        : (filters.durations || []).filter(d => d !== duration);
                      onFilterChange('durations', newDurations);
                    }}
                    size="small"
                    disabled={isLoading}
                  />
                }
                label={<Typography variant="body2">{duration}</Typography>}
                sx={{
                  m: 0,
                  mb: 0.75,
                  '&:last-child': { mb: 0 }
                }}
              />
            ))}
          </FormGroup>
        </FilterSection>

        {/* Stipend Filter */}
        <FilterSection
          title="Minimum Stipend"
          count={filters.minStipend > 0 ? 1 : 0}
          defaultExpanded={false}
        >
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.minStipend || 0}
              onChange={(e, value) => onFilterChange('minStipend', value)}
              min={0}
              max={maxStipend}
              step={5000}
              marks={[
                { value: 0, label: '₹0' },
                { value: maxStipend, label: `₹${maxStipend.toLocaleString('en-IN')}` }
              ]}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => formatCurrency(value)}
              disabled={isLoading}
              sx={{
                mt: 2,
                mb: 1
              }}
            />
          </Box>
        </FilterSection>
        </Stack>
      </Box>
    </Paper>
  );
});

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;
