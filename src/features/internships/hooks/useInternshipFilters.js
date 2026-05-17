import { useState, useCallback, useMemo, useEffect } from 'react';
import { filterInternships, sortInternships } from '../utils/filterUtils';
import debounce from 'lodash.debounce';

/**
 * Custom hook for filter state management
 * @returns {[FilterState, function]} - Filter state and update function
 */
export const useFilters = () => {
  const [filters, setFilters] = useState({
    profiles: [],
    locations: [],
    durations: [],
    minStipend: 0,
    workFromHome: false,
    partTime: false,
    searchQuery: '',
    selectedProfiles: [],
    selectedLocations: [],
    keywordFilter: ''
  });

  const updateFilter = useCallback((filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      profiles: [],
      locations: [],
      durations: [],
      minStipend: 0,
      workFromHome: false,
      partTime: false,
      searchQuery: '',
      selectedProfiles: [],
      selectedLocations: [],
      keywordFilter: ''
    });
  }, []);

  return { filters, updateFilter, clearFilters };
};

/**
 * Custom hook for sorting state
 * @returns {[string, function]} - Sort key and setter
 */
export const useSortBy = () => {
  const [sortBy, setSortBy] = useState('recent');
  return [sortBy, setSortBy];
};

/**
 * Custom hook for pagination
 * @param {number} pageSize - Items per page
 * @param {number} total - Total items
 * @returns {[PaginationState, function]} - Pagination state and update function
 */
export const usePagination = (pageSize = 10, total = 0) => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize,
    total
  });

  const updatePage = useCallback((page) => {
    const maxPage = Math.ceil(total / pageSize);
    setPagination(prev => ({
      ...prev,
      page: Math.min(page, maxPage)
    }));
  }, [pageSize, total]);

  const resetPagination = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  }, []);

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total,
      pageSize
    }));
  }, [total, pageSize]);

  return { pagination, updatePage, resetPagination };
};

/**
 * Custom hook for search with debouncing
 * @param {number} delay - Debounce delay in ms
 * @returns {[string, function]} - Search query and setter
 */
export const useDebouncedSearch = (delay = 300) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSetQuery = useMemo(
    () => debounce((query) => {
      setDebouncedQuery(query);
    }, delay),
    [delay]
  );

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    debouncedSetQuery(query);
  }, [debouncedSetQuery]);

  return { searchQuery, debouncedQuery, handleSearchChange };
};

/**
 * Custom hook for filtering and sorting combined
 * @param {Internship[]} internships - All internships
 * @param {FilterState} filters - Current filters
 * @param {string} sortBy - Sort criteria
 * @returns {Internship[]} - Filtered and sorted internships
 */
export const useFilteredAndSortedInternships = (internships, filters, sortBy = 'recent') => {
  return useMemo(() => {
    let result = filterInternships(internships, filters);
    result = sortInternships(result, sortBy);
    return result;
  }, [internships, filters, sortBy]);
};

/**
 * Custom hook for pagination with data
 * @param {*[]} data - Array to paginate
 * @param {PaginationState} pagination - Pagination state
 * @returns {*[]} - Paginated data
 */
export const usePaginatedData = (data, pagination) => {
  return useMemo(() => {
    const { page, pageSize } = pagination;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, pagination]);
};

/**
 * Custom hook to get unique filter options from internships
 * @param {Internship[]} internships - Array of internships
 * @returns {Object} - Object with arrays of unique values for each filter
 */
export const useFilterOptions = (internships) => {
  return useMemo(() => {
    const profiles = [...new Set(internships.map(i => i.profile))].sort();
    const locations = [...new Set(internships.map(i => i.location))].sort();
    const durations = [...new Set(internships.map(i => i.duration))].sort(
      (a, b) => {
        const durationMap = { '3 months': 3, '4 months': 4, '5 months': 5, '6 months': 6 };
        return (durationMap[a] || 0) - (durationMap[b] || 0);
      }
    );
    const maxStipend = Math.max(...internships.map(i => i.stipendMax || 50000), 50000);
    
    return {
      profiles,
      locations,
      durations,
      maxStipend
    };
  }, [internships]);
};
