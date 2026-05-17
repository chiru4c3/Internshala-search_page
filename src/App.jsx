import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from './theme/muiTheme';
import SearchHeader from './features/internships/components/SearchHeader';
import FilterSidebar from './features/internships/components/FilterSidebar';
import InternshipList from './features/internships/components/InternshipList';
import JobDetailsDrawer from './features/internships/components/JobDetailsDrawer';
import { fetchInternships } from './features/internships/api/internshipApi';
import {
  useFilters,
  useSortBy,
  usePagination,
  useDebouncedSearch,
  useFilteredAndSortedInternships,
  usePaginatedData,
  useFilterOptions
} from './features/internships/hooks/useInternshipFilters';
import './App.css';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State Management
  const [allInternships, setAllInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [savedInternships, setSavedInternships] = useState(new Set());

  const { filters, updateFilter, clearFilters } = useFilters();
  const [sortBy, setSortBy] = useSortBy();
  const { searchQuery, debouncedQuery, handleSearchChange } = useDebouncedSearch(300);
  
  // Filter with debounced search
  const filterWithSearch = {
    ...filters,
    searchQuery: debouncedQuery
  };

  const filteredAndSorted = useFilteredAndSortedInternships(
    allInternships,
    filterWithSearch,
    sortBy
  );

  const { pagination, updatePage, resetPagination } = usePagination(
    10,
    filteredAndSorted.length
  );

  const paginatedInternships = usePaginatedData(filteredAndSorted, pagination);
  const filterOptions = useFilterOptions(allInternships);

  // Fetch internships on mount
  useEffect(() => {
    const loadInternships = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchInternships();
        setAllInternships(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch internships:', err);
        setError('Failed to load internships. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInternships();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [filters, debouncedQuery, resetPagination]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    updateFilter(filterName, value);
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    clearFilters();
    handleSearchChange(''); // Clear the global search bar
  };

  // Handle view details - Open drawer
  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setDrawerOpen(true);
  };

  // Handle apply
  const handleApply = (internshipId) => {
    console.log('Applied to internship:', internshipId);
    // Could add actual apply logic here
  };

  // Handle save internship
  const handleSaveInternship = (internshipId) => {
    setSavedInternships(prev => {
      const newSet = new Set(prev);
      if (newSet.has(internshipId)) {
        newSet.delete(internshipId);
      } else {
        newSet.add(internshipId);
        setSnackbarMessage('Internship saved!');
        setSnackbarOpen(true);
      }
      return newSet;
    });
  };

  // Handle close drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedInternship(null);
  };

  // Handle close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onMobileFilterToggle={() => setMobileFilterOpen(!mobileFilterOpen)}
          filterCount={
            (filters.selectedProfiles?.length || 0) +
            (filters.selectedLocations?.length || 0) +
            (filters.durations?.length || 0) +
            (filters.minStipend > 0 ? 1 : 0) +
            (filters.workFromHome ? 1 : 0) +
            (filters.partTime ? 1 : 0) +
            (filters.keywordFilter?.length || 0 > 0 ? 1 : 0)
          }
        />

        {/* Main Content */}
        {isLoading && !allInternships.length ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              maxWidth: '1400px',
              mx: 'auto',
              px: 3,
              py: 3
            }}
          >
            {/* Filter Sidebar - Desktop (Fixed) */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                width: 280,
                flexShrink: 0
              }}
            >
              <Box
                sx={{
                  position: 'sticky',
                  top: 80,
                  zIndex: 10
                }}
              >
                <FilterSidebar
                  filters={filters}
                  filterOptions={filterOptions}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearAllFilters}
                  isLoading={isLoading}
                />
              </Box>
            </Box>

            {/* Internships List - Main Content */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0
              }}
            >
              <InternshipList
                internships={paginatedInternships}
                pagination={pagination}
                onPageChange={updatePage}
                sortBy={sortBy}
                onSortChange={setSortBy}
                isLoading={isLoading && filteredAndSorted.length === 0}
                onViewDetails={handleViewDetails}
                onApply={handleApply}
                onSave={handleSaveInternship}
                savedInternships={savedInternships}
                onClearFilters={handleClearAllFilters}
              />
            </Box>
          </Box>
        )}

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="left"
          open={mobileFilterOpen && isMobile}
          onClose={() => setMobileFilterOpen(false)}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          <Box
            sx={{
              width: 300,
              p: 2,
              pt: 1
            }}
          >
            <FilterSidebar
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearAllFilters}
              isLoading={isLoading}
            />
          </Box>
        </Drawer>

        {/* Job Details Drawer */}
        <JobDetailsDrawer
          open={drawerOpen}
          internship={selectedInternship}
          onClose={handleCloseDrawer}
          onApply={handleApply}
          onSave={handleSaveInternship}
          isSaved={selectedInternship ? savedInternships.has(selectedInternship.id) : false}
        />

        {/* Success Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
