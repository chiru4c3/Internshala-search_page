import axios from 'axios';

/**
 * Transform Internshala API response to our internal format
 */
const transformInternshipData = (apiData) => {
  const { internships_meta } = apiData;
  
  if (!internships_meta) return [];

  return Object.values(internships_meta).map((internship) => {
    // Extract stipend values
    const stipendObj = internship.stipend || {};
    const stipendMin = stipendObj.salaryValue1 || 0;
    const stipendMax = stipendObj.salaryValue2 || stipendObj.salaryValue1 || 0;

    // Extract primary location
    const locationNames = internship.location_names || [];
    const location = locationNames[0] || 'Remote';

    // Extract skills from profile name and other sources
    const skills = internship.profile_name ? [internship.profile_name] : [];
    const description = internship.job_description || 
      `Join ${internship.company_name} as a ${internship.profile_name} intern. ${internship.work_from_home ? 'Work from home opportunity.' : ''} Duration: ${internship.duration}.`;

    // Parse posted date
    const postedDate = internship.postedOnDateTime 
      ? new Date(internship.postedOnDateTime * 1000).toISOString()
      : new Date().toISOString();

    return {
      id: internship.id?.toString() || '',
      title: internship.title || '',
      company: internship.company_name || '',
      location: location,
      profile: internship.profile_name || '',
      duration: internship.duration || '',
      stipendMin: Math.round(stipendMin / 1000) * 1000, // Round to nearest 1000
      stipendMax: Math.round(stipendMax / 1000) * 1000,
      description: description,
      skills: skills,
      postedDate: postedDate,
      activelyHiring: internship.is_active === true,
      workFromHome: internship.work_from_home === true,
      partTime: internship.part_time === true,
      jobOffer: internship.is_ppo === true,
      applicants: internship.application_status_message?.message || '0 applicants'
    };
  }).filter(internship => internship.id && internship.title); // Filter out invalid entries
};

// Mock internship data - fallback
const mockInternships = [
  {
    id: '1',
    title: 'Frontend Development Internship',
    company: 'TechCorp Inc.',
    location: 'Bangalore',
    profile: 'Web Development',
    duration: '3 months',
    stipendMin: 20000,
    stipendMax: 30000,
    description: 'Join our team to build beautiful, responsive user interfaces using cutting-edge web technologies. You will work on real projects, learn industry best practices, and collaborate with experienced developers. This is a great opportunity to gain hands-on experience in modern web development and make an impact on products used by thousands of users.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Figma', 'REST API', 'Git', 'Responsive Design', 'Web Performance', 'Testing', 'TypeScript'],
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: false,
    jobOffer: true,
    applicants: '1.2K',
    logoUrl: 'https://ui-avatars.com/api/?name=TechCorp+Inc&background=1976d2&color=fff&size=200'
  },
  {
    id: '2',
    title: 'Full Stack Development',
    company: 'WebSoft Solutions',
    location: 'Mumbai',
    profile: 'Full Stack',
    duration: '6 months',
    stipendMin: 30000,
    stipendMax: 40000,
    description: 'Work on building scalable web applications from front-end to back-end. This role provides comprehensive exposure to the entire development stack including React, Node.js, and databases. You will develop features, write tests, collaborate with designers and other developers, and deploy applications to production. Perfect for developers looking to expand their full-stack knowledge.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'REST API', 'Git', 'Docker', 'SQL', 'Responsive Design', 'Testing', 'Redux'],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: false,
    jobOffer: false,
    applicants: '856',
    logoUrl: 'https://ui-avatars.com/api/?name=WebSoft+Solutions&background=2e7d32&color=fff&size=200'
  },
  {
    id: '3',
    title: 'Backend Engineering',
    company: 'CloudTech Systems',
    location: 'Hyderabad',
    profile: 'Backend Development',
    duration: '4 months',
    stipendMin: 25000,
    stipendMax: 35000,
    description: 'Build robust backend systems that power our cloud applications. You will design APIs, optimize database queries, implement security measures, and work with modern backend frameworks. This internship offers deep learning in server-side programming, system architecture, and best practices in backend development. Great opportunity to work on challenging technical problems.',
    skills: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Linux', 'Git', 'Docker', 'Database Design', 'API Design', 'Performance Optimization'],
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: false,
    workFromHome: true,
    partTime: false,
    jobOffer: true,
    applicants: '2.1K',
    logoUrl: 'https://ui-avatars.com/api/?name=CloudTech+Systems&background=1565c0&color=fff&size=200'
  },
  {
    id: '4',
    title: 'UI/UX Design',
    company: 'DesignStudio Pro',
    location: 'Delhi',
    profile: 'UI/UX Design',
    duration: '3 months',
    stipendMin: 15000,
    stipendMax: 25000,
    description: 'Create beautiful and intuitive user interfaces that delight users. You will work with Figma, conduct user research, create prototypes, and iterate based on feedback. This role combines creative thinking with user-centered design principles. You will learn design systems, accessibility, and responsive design while working on real products.',
    skills: ['Figma', 'UI Design', 'Prototyping', 'UX Research', 'Wireframing', 'User Testing', 'Design Systems', 'Adobe XD', 'Interaction Design'],
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: true,
    jobOffer: false,
    applicants: '542',
    logoUrl: 'https://ui-avatars.com/api/?name=DesignStudio+Pro&background=d32f2f&color=fff&size=200'
  },
  {
    id: '5',
    title: 'Data Science',
    company: 'AI Innovations Ltd',
    location: 'Bangalore',
    profile: 'Data Science',
    duration: '6 months',
    stipendMin: 40000,
    stipendMax: 50000,
    description: 'Dive into the world of machine learning and data analysis. You will work with real datasets, build predictive models, perform statistical analysis, and create data visualizations. This intensive internship covers everything from data preprocessing to model deployment. Ideal for those passionate about turning data into actionable insights.',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics', 'Deep Learning', 'Scikit-learn'],
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: false,
    jobOffer: true,
    applicants: '1.8K',
    logoUrl: 'https://ui-avatars.com/api/?name=AI+Innovations+Ltd&background=7b1fa2&color=fff&size=200'
  },
  {
    id: '6',
    title: 'Android Development',
    company: 'MobileFirst Apps',
    location: 'Pune',
    profile: 'Android Development',
    duration: '3 months',
    stipendMin: 25000,
    stipendMax: 35000,
    description: 'Build engaging mobile applications for millions of Android users. You will learn native Android development, work with APIs, implement UI components, and optimize app performance. This hands-on experience will give you skills in modern mobile development patterns and Google\'s latest Android technologies.',
    skills: ['Java', 'Kotlin', 'Android SDK', 'Firebase', 'Material Design', 'REST API', 'SQLite', 'Gradle', 'Android Studio'],
    postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: false,
    partTime: false,
    jobOffer: false,
    applicants: '734',
    logoUrl: 'https://ui-avatars.com/api/?name=MobileFirst+Apps&background=f57c00&color=fff&size=200'
  },
  {
    id: '7',
    title: 'DevOps Engineering',
    company: 'InfraTech Solutions',
    location: 'Bangalore',
    profile: 'DevOps',
    duration: '4 months',
    stipendMin: 35000,
    stipendMax: 45000,
    description: 'Manage and optimize our infrastructure and deployment pipelines. You will work with containerization, cloud platforms, CI/CD tools, and monitoring systems. This role teaches you how to build reliable, scalable systems and automate operational tasks. Essential learning for anyone interested in modern infrastructure.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Jenkins', 'Git', 'Terraform', 'Monitoring', 'Bash Scripting'],
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: false,
    workFromHome: true,
    partTime: false,
    jobOffer: true,
    applicants: '621',
    logoUrl: 'https://ui-avatars.com/api/?name=InfraTech+Solutions&background=0097a7&color=fff&size=200'
  },
  {
    id: '8',
    title: 'QA Engineering',
    company: 'QualityAssure Inc',
    location: 'Chennai',
    profile: 'QA Testing',
    duration: '3 months',
    stipendMin: 15000,
    stipendMax: 22000,
    description: 'Ensure software quality through comprehensive testing strategies. You will design test cases, perform manual and automated testing, report bugs, and verify fixes. This role combines technical skills with attention to detail. Learn testing methodologies, automation frameworks, and quality assurance best practices.',
    skills: ['Selenium', 'TestNG', 'API Testing', 'Manual Testing', 'Test Automation', 'JIRA', 'Java', 'SQL', 'Test Planning'],
    postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: false,
    jobOffer: false,
    applicants: '891',
    logoUrl: 'https://ui-avatars.com/api/?name=QualityAssure+Inc&background=c2185b&color=fff&size=200'
  },
  {
    id: '9',
    title: 'Database Administration',
    company: 'DataPro Systems',
    location: 'Bangalore',
    profile: 'Database',
    duration: '5 months',
    stipendMin: 30000,
    stipendMax: 40000,
    description: 'Maintain and optimize databases that serve as the backbone of our applications. You will work on database design, query optimization, backup and recovery procedures, and performance tuning. Learn enterprise database management and develop skills crucial for data-driven organizations.',
    skills: ['MySQL', 'PostgreSQL', 'Database Design', 'SQL', 'Performance Tuning', 'Backup', 'Replication', 'Indexing', 'Query Optimization'],
    postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: false,
    jobOffer: true,
    applicants: '456',
    logoUrl: 'https://ui-avatars.com/api/?name=DataPro+Systems&background=00796b&color=fff&size=200'
  },
  {
    id: '10',
    title: 'Business Analysis',
    company: 'ConsultPro Group',
    location: 'Mumbai',
    profile: 'Business Analysis',
    duration: '6 months',
    stipendMin: 18000,
    stipendMax: 28000,
    description: 'Bridge the gap between business needs and technical solutions. As a business analyst, you will gather requirements, document processes, create specifications, and work with stakeholders. Learn how to analyze data, identify problems, and propose solutions that drive business value.',
    skills: ['Data Analysis', 'Excel', 'SQL', 'Documentation', 'Requirements Analysis', 'Process Mapping', 'Stakeholder Communication', 'Report Writing'],
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: true,
    jobOffer: false,
    applicants: '1.3K',
    logoUrl: 'https://ui-avatars.com/api/?name=ConsultPro+Group&background=6a1b9a&color=fff&size=200'
  },
  {
    id: '11',
    title: 'iOS Development',
    company: 'iAppStudio',
    location: 'Bangalore',
    profile: 'iOS Development',
    duration: '4 months',
    stipendMin: 28000,
    stipendMax: 38000,
    description: 'Create amazing iOS applications that provide delightful user experiences. You will develop native iOS apps using Swift, work with Apple\'s frameworks, and follow Apple\'s design guidelines. This role offers exposure to the latest iOS technologies and best practices in mobile app development.',
    skills: ['Swift', 'Objective-C', 'iOS SDK', 'Xcode', 'Core Data', 'Networking', 'UI Kit', 'Git', 'REST API'],
    postedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: true,
    workFromHome: true,
    partTime: false,
    jobOffer: false,
    applicants: '678',
    logoUrl: 'https://ui-avatars.com/api/?name=iAppStudio&background=455a64&color=fff&size=200'
  },
  {
    id: '12',
    title: 'Cloud Architecture',
    company: 'CloudFirst Tech',
    location: 'Delhi',
    profile: 'Cloud Architecture',
    duration: '5 months',
    stipendMin: 35000,
    stipendMax: 45000,
    description: 'Design and implement scalable cloud infrastructure solutions. You will work with cloud platforms like AWS and Azure, learn about different architectural patterns, and optimize costs and performance. This role is crucial for organizations moving to the cloud.',
    skills: ['AWS', 'Azure', 'Cloud Design', 'Infrastructure', 'Terraform', 'CloudFormation', 'Networking', 'Security', 'Cost Optimization'],
    postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    activelyHiring: false,
    workFromHome: true,
    partTime: false,
    jobOffer: true,
    applicants: '512',
    logoUrl: 'https://ui-avatars.com/api/?name=CloudFirst+Tech&background=37474f&color=fff&size=200'
  }
];

/**
 * Fetch internship data from Internshala API
 * @returns {Promise<{data: Internship[], total: number}>}
 */
export const fetchInternships = async () => {
  try {
    const response = await axios.get('https://internshala.com/hiring/search', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const transformedData = transformInternshipData(response.data);
    
    return {
      data: transformedData,
      total: transformedData.length
    };
  } catch (error) {
    console.error('Error fetching internships from Internshala:', error);
    
    // Fallback to mock data if API fails
    console.log('Using fallback mock data');
    return {
      data: mockInternships,
      total: mockInternships.length
    };
  }
};

/**
 * Fetch internship data with pagination
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {Promise<{data: Internship[], total: number, page: number, pageSize: number}>}
 */
export const fetchInternshipsWithPagination = async (page = 1, pageSize = 10) => {
  try {
    const { data, total } = await fetchInternships();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    };
  } catch (error) {
    console.error('Error fetching paginated internships:', error);
    throw error;
  }
};

/**
 * Get unique values for filter options
 * @param {Internship[]} internships - Array of internships
 * @param {string} field - Field to extract unique values from
 * @returns {string[]}
 */
export const getUniqueFilterValues = (internships, field) => {
  const values = internships
    .map(internship => internship[field])
    .filter(Boolean);
  
  if (field === 'profile') {
    // Profiles are single values
    return [...new Set(values)].sort();
  } else if (field === 'location') {
    // Locations are single values
    return [...new Set(values)].sort();
  } else if (field === 'duration') {
    // Sort durations in a meaningful way
    const durationMap = { '3 months': 3, '4 months': 4, '5 months': 5, '6 months': 6 };
    return [...new Set(values)].sort((a, b) => (durationMap[a] || 0) - (durationMap[b] || 0));
  }
  
  return [...new Set(values)].sort();
};
