/**
 * Type definitions for Internship and related data structures
 */

/**
 * @typedef {Object} Internship
 * @property {string} id - Unique identifier
 * @property {string} title - Internship title/position
 * @property {string} company - Company name
 * @property {string} location - Location of the internship
 * @property {string} profile - Profile/role name
 * @property {string} duration - Duration in months (e.g., "3 months")
 * @property {number} stipend - Monthly stipend amount
 * @property {string[]} skills - Required skills
 * @property {string} postedDate - Date posted (ISO format)
 * @property {boolean} activelyHiring - Whether actively hiring
 * @property {boolean} workFromHome - Work from home available
 * @property {boolean} partTime - Part-time position
 * @property {boolean} jobOffer - Job offer available
 * @property {string} applicants - Number of applicants
 */

/**
 * @typedef {Object} FilterState
 * @property {string[]} profiles - Selected profiles
 * @property {string[]} locations - Selected locations
 * @property {string[]} durations - Selected durations
 * @property {number} minStipend - Minimum stipend filter
 * @property {boolean} workFromHome - Work from home filter
 * @property {boolean} partTime - Part-time filter
 * @property {string} searchQuery - Keyword search query
 */

/**
 * @typedef {Object} ApiResponse
 * @property {Internship[]} data - Array of internships
 * @property {number} total - Total count of internships
 * @property {number} page - Current page
 * @property {number} pageSize - Items per page
 */

/**
 * @typedef {Object} PaginationState
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} total - Total items
 */

export {};
