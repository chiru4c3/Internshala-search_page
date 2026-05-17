# Internshala Search Platform

A modern, professional internship search interface built with React, Material-UI, and Vite. Features advanced filtering, real-time search synchronization, and a polished user experience.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.6-61DAFB.svg?style=flat)
![Material-UI](https://img.shields.io/badge/Material--UI-9.0.1-1976D2.svg?style=flat)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🎯 Project Overview

Internshala Search Platform is a production-ready internship discovery application designed with modern UX principles. It combines powerful filtering capabilities with intuitive search functionality, allowing users to discover internships effortlessly.

**Live Demo:** http://localhost:5174/

---

## ✨ Key Features

### 🔍 Advanced Search & Filtering
- **Real-time Search Synchronization** - Search queries automatically populate relevant filters (location, profile, duration, work mode)
- **Multi-select Autocomplete** - Profile and location selection with custom value support
- **Keyword Search** - Search across titles, companies, and skills
- **Debounced Search** - 300ms debounce for optimal performance

### 🎛️ Comprehensive Filtering
- **Profile Filter** - Select specific internship roles (Marketing, IT, HR, etc.)
- **Location Filter** - Multi-city selection with case-insensitive matching
- **Duration Filter** - Filter by internship length (1-6 months)
- **Stipend Range Slider** - Set minimum salary expectations
- **Work Mode Toggles** - Filter for Work From Home and Part-Time opportunities
- **Smart Filter Preservation** - Manual selections survive search changes

### 📱 Responsive Design
- **Desktop-Optimized Layout** - Sticky filter sidebar with scrollable content
- **Mobile-Friendly** - Collapsible filter drawer for smaller screens
- **Adaptive Spacing** - Responsive padding and margins

### 🎨 Modern UI/UX
- **Cyan Theme (#00A5CE)** - Custom color palette throughout
- **Material Design 3** - Industry-standard component library
- **Loading States** - Skeleton loaders for data fetching
- **Empty States** - Helpful messaging when no results found
- **Smooth Animations** - Card hover effects and transitions
- **Professional Typography** - Carefully tuned font sizes and weights

### 💾 User Experience
- **Save Internships** - Bookmark favorites with persistent state tracking
- **Quick View** - Side drawer with full internship details
- **Applied Jobs Tracking** - Visual feedback for applied positions
- **Pagination** - 10 items per page with sorting options
- **Sort Controls** - Sort by Most Recent, Highest Stipend, or Lowest Stipend

### 🔧 Developer Experience
- **Custom Hooks** - `useInternshipFilters`, `useDebouncedSearch` for cleaner code
- **Utility Functions** - Centralized filtering and formatting logic
- **Hot Module Replacement** - Instant feedback during development
- **Error Handling** - Graceful handling of edge cases

---

## 🏗️ Architecture Overview

### Project Structure
```
src/
├── App.jsx                           # Root component with state orchestration
├── App.css                           # Global styles
├── main.jsx                          # Entry point
├── theme/
│   └── muiTheme.js                   # Material-UI theme configuration
├── components/
│   └── ui/
│       ├── EmptyState.jsx            # No results messaging
│       └── SkeletonLoader.jsx        # Loading placeholders
└── features/
    └── internships/
        ├── api/
        │   └── internshipApi.js      # Mock data and API calls
        ├── components/
        │   ├── SearchHeader.jsx      # Navigation bar
        │   ├── FilterSidebar.jsx     # Filter panel
        │   ├── InternshipCard.jsx    # Job listing card
        │   ├── InternshipList.jsx    # Paginated list wrapper
        │   └── JobDetailsDrawer.jsx  # Detail view panel
        ├── hooks/
        │   └── useInternshipFilters.js  # Filter state management
        ├── utils/
        │   └── filterUtils.js        # Filtering and formatting utilities
        └── types/
            └── index.js              # Data type definitions
```

### Data Flow
```
App.jsx (State Management)
    ↓
SearchHeader (Search Input) → useDebouncedSearch Hook
    ↓
FilterSidebar (Filter Controls) → useInternshipFilters Hook
    ↓
filterUtils.js (Extraction & Synchronization)
    ↓
InternshipList (Filtered Results)
    ↓
InternshipCard (Individual Listings)
```

---

## 💡 Implemented Ideas

### 1. **Bidirectional Search-Filter Synchronization**
Search queries intelligently auto-populate filters:
- Type "Delhi" → Location chip auto-adds
- Type "Administration" → Profile auto-adds
- Type "3 month" → Duration auto-selects
- Type "work from home" → WFH toggle activates
- Type "part time" → Part Time toggle activates

**Implementation:** `extractLocationsFromSearch()`, `extractProfilesFromSearch()`, `extractDurationsFromSearch()`, `detectWorkFromHome()`, `detectPartTime()` in `filterUtils.js`

### 2. **Smart Filter Preservation**
Manual filter selections persist even when search changes, preventing user frustration from losing filter state.

**Implementation:** `combineFilterItems()` merges search-extracted and manually-selected filters with deduplication using Set data structure.

### 3. **Debounced Search**
300ms debounce prevents excessive filtering operations and improves UI responsiveness.

**Implementation:** `useDebouncedSearch()` custom hook with useCallback for stable function references.

### 4. **Relative Date Formatting**
Dates display as "2 days ago" instead of raw dates, showing recency at a glance.

**Implementation:** `formatDateAgo()` calculates time differences and formats appropriately.

### 5. **Simplified Card Information Architecture**
Cards show only essential information to reduce cognitive load:
- Company avatar + title
- Location, stipend, duration in single row
- Top 2 skills with "+X more" indicator
- Action buttons for save/view/apply

### 6. **Complete Clear Functionality**
"Clear Filters" button resets both filter state AND global search bar, providing true application reset.

**Implementation:** `handleClearAllFilters()` calls both `clearFilters()` and `handleSearchChange('')`.

### 7. **Accessible Tooltips**
Skill requirements display in hover tooltips, reducing visual clutter.

### 8. **Professional Color System**
Custom cyan theme (#00A5CE) with calculated light/dark variants for consistency.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd search-page
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Server runs on `http://localhost:5174/` with Hot Module Replacement enabled.

### Build for Production
```bash
npm run build
```

---

## 📖 Project Walkthrough

### Step 1: Search & Discover
1. Open the application in your browser
2. Start typing in the search bar (e.g., "Delhi")
3. Watch filters auto-populate in real-time
4. Results update instantly

### Step 2: Refine with Filters
1. Use the left sidebar to manually adjust filters
2. Select specific profiles or locations
3. Adjust stipend slider for salary expectations
4. Toggle Work From Home or Part Time options
5. Active filters display count badge

### Step 3: Browse Results
1. View paginated internship cards
2. Each card shows key details at a glance
3. Hover over skills to see requirements
4. Use Sort dropdown to organize results

### Step 4: Save & Apply
1. Click bookmark icon to save internships
2. Saved status persists in session
3. Click "View" to open detailed drawer
4. Click "Apply" to submit application

### Step 5: Clear & Start Over
1. Click "Clear Filters" in empty state or sidebar
2. Both filters AND search bar clear
3. All internships display again

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.2.6** - UI library with Hooks
- **Vite 8.0.12** - Lightning-fast build tool

### UI Components & Styling
- **Material-UI (MUI) 9.0.1** - Professional component library
- **MUI Icons** - Icon library

### State Management
- **React Hooks** - useState, useEffect, useCallback, useMemo
- **Custom Hooks** - Business logic encapsulation

### Performance
- **lodash.debounce 4.0.8** - Search debouncing

### Development
- **ESLint** - Code quality linting
- **Vite HMR** - Hot module replacement

---

## 📊 Performance Optimizations

1. **Memoized Components** - `React.memo` prevents unnecessary re-renders
2. **Debounced Search** - 300ms debounce reduces filter operations
3. **Efficient Filtering** - O(1) lookups with Set data structure
4. **Lazy Rendering** - Pagination prevents rendering all results
5. **Custom Hooks** - Encapsulated state prevents prop drilling
6. **useCallback** - Stable function references prevent child re-renders
7. **useMemo** - Memoized suggestions prevent duplicate filtering

---

## 🎯 Key Components

### SearchHeader
**Purpose:** Navigation bar with logo, search input, and mobile controls
- Sticky positioning for constant visibility
- Responsive design with mobile filter toggle
- Brand logo and navigation links

### FilterSidebar
**Purpose:** Comprehensive filter controls
- Profile multi-select with custom input
- Location multi-select with custom input
- Keyword search field
- Duration checkboxes (collapsible)
- Stipend range slider (collapsible)
- Work Mode toggles (always visible)
- Active filter count badge
- Clear button with smart opacity

### InternshipCard
**Purpose:** Individual job listing display
- Company avatar with initials
- Job title and company name
- Badge indicators (Actively Hiring, WFH, Part Time)
- Key details in icon-labeled rows
- Skill preview with tooltips
- Action buttons (Save, View, Apply)
- Hover effects for interactivity

### JobDetailsDrawer
**Purpose:** Full internship information in modal view
- Scrollable content area
- Complete job description
- Full skill list with tooltips
- Company information
- Application actions

### InternshipList
**Purpose:** Pagination and result management
- Pagination controls
- Sort dropdown
- Result count display
- Empty state with helpful messaging
- Loading skeleton placeholder

---

## 📝 State Management Flow

```javascript
// App.jsx manages:
const { filters, updateFilter, clearFilters } = useFilters()
const { searchQuery, debouncedQuery, handleSearchChange } = useDebouncedSearch(300)

// useEffect watches debouncedQuery and auto-extracts:
- Locations from search
- Profiles from search
- Durations from search
- Work From Home detection
- Part Time detection

// Combined with manual selections to create final filter state
// Passed down to FilterSidebar and InternshipList
```

---

## 🔐 Features Validation

✅ **Tested Scenarios:**
- Searching "delhi" auto-adds Delhi location
- Searching "administration" auto-adds Administration profile
- Searching "3 month" auto-selects 3 Months duration
- Searching "work from home" activates WFH toggle
- Clear button clears filters AND search bar
- Filter count badge shows accurate count
- Manual selections preserved when search changes
- Relative dates display correctly ("2 days ago")
- Responsive layout adapts to mobile/tablet

---

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Material-UI Documentation](https://mui.com)
- [Vite Guide](https://vitejs.dev)
- [React Hooks Best Practices](https://react.dev/reference/react/hooks)

---

## 📧 Support

For issues, questions, or suggestions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, Material-UI, and Vite**
