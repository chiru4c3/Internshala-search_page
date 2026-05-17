/**
 * Filtering utilities for internship search and filtering logic
 */

/**
 * Filter internships based on filter state
 * Uses AND logic between different categories, OR logic within same category
 * 
 * @param {Internship[]} internships - Array of internships to filter
 * @param {FilterState} filters - Current filter state
 * @returns {Internship[]} - Filtered internships
 */
export const filterInternships = (internships, filters) => {
  return internships.filter(internship => {
    // Selected Profiles filter (OR logic - if any match) - Priority over search
    if (filters.selectedProfiles && filters.selectedProfiles.length > 0) {
      if (!filters.selectedProfiles.includes(internship.profile)) {
        return false;
      }
    }

    // Selected Locations filter (OR logic - if any match) - Priority over search
    if (filters.selectedLocations && filters.selectedLocations.length > 0) {
      if (!filters.selectedLocations.includes(internship.location)) {
        return false;
      }
    }

    // Duration filter (OR logic within durations)
    if (filters.durations && filters.durations.length > 0) {
      if (!filters.durations.includes(internship.duration)) {
        return false;
      }
    }

    // Minimum stipend filter - check if minimum stipend is within range
    if (filters.minStipend > 0) {
      if (internship.stipendMax < filters.minStipend) {
        return false;
      }
    }

    // Work from home filter
    if (filters.workFromHome && !internship.workFromHome) {
      return false;
    }

    // Part-time filter
    if (filters.partTime && !internship.partTime) {
      return false;
    }

    // Keyword filter (searches in title, company, location, skills)
    if (filters.keywordFilter && filters.keywordFilter.trim()) {
      const keyword = filters.keywordFilter.toLowerCase();
      const matchesKeyword =
        internship.title.toLowerCase().includes(keyword) ||
        internship.company.toLowerCase().includes(keyword) ||
        internship.location.toLowerCase().includes(keyword) ||
        internship.skills.some(skill => skill.toLowerCase().includes(keyword));

      if (!matchesKeyword) {
        return false;
      }
    }

    // Legacy Profile filter (checkbox-based, OR logic within profiles)
    if (filters.profiles && filters.profiles.length > 0) {
      if (!filters.profiles.includes(internship.profile)) {
        return false;
      }
    }

    // Legacy Location filter (checkbox-based, OR logic within locations)
    if (filters.locations && filters.locations.length > 0) {
      if (!filters.locations.includes(internship.location)) {
        return false;
      }
    }

    // Legacy Keyword search (searches in title, company, skills)
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        internship.title.toLowerCase().includes(query) ||
        internship.company.toLowerCase().includes(query) ||
        internship.profile.toLowerCase().includes(query) ||
        internship.skills.some(skill => skill.toLowerCase().includes(query));

      if (!matchesSearch) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort internships by different criteria
 * @param {Internship[]} internships - Array to sort
 * @param {string} sortBy - Sort key: 'recent', 'stipend-high', 'stipend-low'
 * @returns {Internship[]}
 */
export const sortInternships = (internships, sortBy = 'recent') => {
  const sorted = [...internships];

  switch (sortBy) {
    case 'stipend-high':
      sorted.sort((a, b) => {
        const aStipend = a.stipendMax || a.stipend || 0;
        const bStipend = b.stipendMax || b.stipend || 0;
        return bStipend - aStipend;
      });
      break;
    case 'stipend-low':
      sorted.sort((a, b) => {
        const aStipend = a.stipendMax || a.stipend || 0;
        const bStipend = b.stipendMax || b.stipend || 0;
        return aStipend - bStipend;
      });
      break;
    case 'recent':
    default:
      sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      break;
  }

  return sorted;
};

/**
 * Format date string for display
 * @param {string} dateString - ISO format date string
 * @returns {string} - Formatted date (e.g., "2 days ago")
 */
export const formatDateAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-IN');
};

/**
 * Format currency (Indian Rupees)
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency
 */
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Extract numbers from applicants string (e.g., "1.2K" -> 1200)
 * @param {string} applicantsStr - Applicants string
 * @returns {number}
 */
export const parseApplicants = (applicantsStr) => {
  if (!applicantsStr) return 0;
  const num = parseFloat(applicantsStr);
  if (applicantsStr.includes('K')) return num * 1000;
  if (applicantsStr.includes('M')) return num * 1000000;
  return num;
};

/**
 * Get badge text color based on badge type
 * @param {string} type - Badge type
 * @returns {string} - Color value
 */
export const getBadgeColor = (type) => {
  const colorMap = {
    activelyHiring: 'success',
    workFromHome: 'info',
    partTime: 'warning',
    jobOffer: 'error'
  };
  return colorMap[type] || 'default';
};

/**
 * Get badge label text
 * @param {string} type - Badge type
 * @returns {string} - Badge text
 */
export const getBadgeLabel = (type) => {
  const labelMap = {
    activelyHiring: 'Actively Hiring',
    workFromHome: 'Work From Home',
    partTime: 'Part Time',
    jobOffer: 'Job Offer'
  };
  return labelMap[type] || '';
};
