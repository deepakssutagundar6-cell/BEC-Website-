import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Cell
} from 'recharts';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  FileJson,
  Code2,
  MapPin,
  Phone,
  Mail,
  Sliders,
  Eye,
  Check,
  ChevronRight,
  Building2,
  BookOpen,
  Award,
  Compass,
  ExternalLink
} from 'lucide-react';

// ============================================================================
// REAL PHOTOGRAPHY LIBRARY (Credit: Basaveshwar Engineering College)
// ============================================================================
const BEC_PHOTOS = {
  campusFront: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/institute/campus/campus-front.webp',
    alt: 'Main heritage stone portico and facade of Basaveshwar Engineering College, Bagalkote',
    archiveCode: 'ARC-1963-01 // MAIN PORTICO'
  },
  aerialView: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/institute/campus/aerial-view.webp',
    alt: 'Aerial view of the 93-acre Basaveshwar Engineering College campus in S. Nijalingappa Vidyanagar, Bagalkote',
    archiveCode: 'ARC-1963-02 // 93-ACRE AERIAL TOPOGRAPHY'
  },
  graduationDay: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/institute/convocation/dsc6285.webp',
    alt: 'Academic procession and graduating scholars at Basaveshwar Engineering College Graduation Day',
    archiveCode: 'ARC-CONV-03 // CONVOCATION HALL'
  },
  placedStudents: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/placements/placed-students-2025.webp',
    alt: 'Placed students of the 2025 graduating batch at Basaveshwar Engineering College',
    archiveCode: 'ARC-PLC-2025 // CAREER CELL COHORT'
  },
  roboticsLab: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/research/labs/robotics/cine0884.webp',
    alt: 'Students and researchers working inside the Robotics and Automation laboratory at BEC Bagalkote',
    archiveCode: 'ARC-RES-08 // ROBOTICS & AUTOMATION LAB'
  },
  library: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/facilities/library/cine1229.webp',
    alt: 'Central Library reading room and archival stacks at Basaveshwar Engineering College',
    archiveCode: 'ARC-FAC-12 // CENTRAL LIBRARY'
  },
  cultural: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/student-life/cultural/cine0157.webp',
    alt: 'Traditional and contemporary stage performance during BEC annual cultural festival',
    archiveCode: 'ARC-STU-15 // CULTURAL AMPHITHEATRE'
  },
  clubs: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/student-life/clubs/cine1910.webp',
    alt: 'Student members collaborating across BEC technical and cultural clubs',
    archiveCode: 'ARC-STU-19 // 50+ STUDENT CLUBS'
  },
  sports: {
    url: 'https://pub-11b7012f1df548e482ac3763e2712496.r2.dev/student-life/sports/cine0040.webp',
    alt: 'Inter-collegiate athletics and sports grounds on the 93-acre BEC campus',
    archiveCode: 'ARC-STU-04 // ATHLETIC GROUNDS'
  }
};

// ============================================================================
// INITIAL EDITABLE JSON DATA STORES (news.json & placements.json)
// ============================================================================
const INITIAL_NEWS_JSON = [
  {
    id: 'grad-day-2026',
    date: 'Aug 1, 2026',
    category: 'CONVOCATION',
    title: '16th Graduation Day',
    summary: 'Basaveshwar Engineering College convenes the 16th Annual Graduation Day ceremony honoring undergraduate, postgraduate, and doctoral scholars.',
    department: 'Academic Senate & Examination Section',
    imageKey: 'graduationDay',
    body: [
      'Basaveshwar Engineering College (Autonomous), Bagalkote, under the aegis of B.V.V. Sangha, will host its 16th Graduation Day on August 1, 2026 at the Centenary Auditorium, S. Nijalingappa Vidyanagar.',
      'Graduating candidates from the 10 Undergraduate B.E. programmes and 3 Postgraduate programmes (M.Tech, MBA, MCA) will receive their official degree scrolls. Rank holders and gold medalists across all departments are requested to complete mandatory registration prior to the rehearsal session.',
      'Permanently affiliated to Visvesvaraya Technological University (VTU), Belagavi, BEC continues its six-decade tradition of nurturing globally competent engineers grounded in moral and ethical values.'
    ]
  },
  {
    id: 'admissions-2026-27',
    date: 'A.Y. 2026–27',
    category: 'ADMISSIONS',
    title: 'Admissions open for A.Y. 2026–27',
    summary: 'Applications invited for 10 UG (B.E.) programmes, 3 PG programmes (M.Tech, MBA, MCA), and 10 VTU-recognised Ph.D. research centres.',
    department: 'Office of Admissions & Academic Affairs',
    imageKey: 'campusFront',
    body: [
      'The Office of Admissions at Basaveshwar Engineering College invites applications for the Academic Year 2026–27 across its 10 Undergraduate (B.E.) programmes, 3 Postgraduate programmes (M.Tech, MBA, MCA), and 10 VTU-recognised Research Centres.',
      'As a Government-aided, AICTE-recognised, NAAC "A" grade and NBA-accredited institution established in 1963, BEC admits students through KEA (CET / PGCET), COMEDK, and institutional quota pathways in accordance with Government of Karnataka and VTU Belagavi norms.',
      'Prospective students and parents are invited to visit the Admissions Desk at S. Nijalingappa Vidyanagar, Bagalkote – 587 102, or contact +91 76187 81963 / becprincipal@yahoo.com.'
    ]
  },
  {
    id: 'quant-edge-2026',
    date: 'Jul 13–18, 2026',
    category: 'TRAINING & PLACEMENTS',
    title: 'Six-day "Quant Edge: Skills for Success" programme',
    summary: 'Intensive six-day quantitative aptitude, analytical problem-solving, and professional readiness workshop conducted from July 13 to July 18, 2026.',
    department: 'Training & Placement Cell',
    imageKey: 'placedStudents',
    body: [
      'The Training and Placement Cell of Basaveshwar Engineering College is organizing a six-day intensive training programme titled "Quant Edge: Skills for Success" from July 13 to July 18, 2026.',
      'Designed to prepare pre-final and final-year engineering cohorts for national and global recruitment drives, the curriculum covers quantitative reasoning, algorithmic thinking, and structured technical interviews.',
      'With 442 offers in the 2025 batch and 450 offers in the 2026 batch across 35+ industry partnerships, the career cell continues to expand high-impact industry readiness initiatives.'
    ]
  },
  {
    id: 'open-day-2026',
    date: 'Jun 20, 2026',
    category: 'CAMPUS EVENT',
    title: 'Open Day (Jun 20, 2026)',
    summary: 'Campus-wide exhibition of student research prototypes, robotics demonstrations, and departmental laboratories across the 93-acre campus.',
    department: 'Institution Innovation Council & All Departments',
    imageKey: 'roboticsLab',
    body: [
      'Basaveshwar Engineering College hosted Open Day on June 20, 2026, welcoming prospective students, educators, industry partners, and citizens of Bagalkote onto its 93-acre campus.',
      'All 10 Undergraduate departments and 10 VTU-recognised research centres exhibited live hardware demonstrations, sustainable infrastructure models, and funded projects supported by ₹3.40 crore in active research grants.',
      'Visitors toured the Central Library, Robotics Lab, hostels, and navigated the campus aboard BEC’s zero-emission electric buggies.'
    ]
  },
  {
    id: 'ieee-pes-2026',
    date: '2026 SERIES',
    category: 'TECHNICAL CHAPTER',
    title: 'IEEE PES events',
    summary: 'Colloquia, grid modernization workshops, and sustainable energy symposiums hosted by the BEC IEEE Power & Energy Society chapter.',
    department: 'Department of Electrical & Electronics Engineering',
    imageKey: 'clubs',
    body: [
      'The BEC Student Branch Chapter of the IEEE Power & Energy Society (PES) curated a series of technical symposiums and hands-on workshops focusing on renewable microgrids, smart power systems, and ecological consciousness.',
      'Representing one of over 50+ active technical and cultural clubs on campus, the IEEE PES chapter connects undergraduate researchers with faculty mentors (89 PhDs campus-wide) and industry practitioners.'
    ]
  },
  {
    id: 'circutech-2026',
    date: '2026 SYMPOSIUM',
    category: 'DEPARTMENT FEST',
    title: 'CIRCUTECH 2026 by the ECS department',
    summary: 'Flagship circuit design, embedded architectures, and hardware-software co-design technical fest organized by Electronics & Computer Science (ECS).',
    department: 'Department of Electronics & Computer Science (ECS)',
    imageKey: 'roboticsLab',
    body: [
      'The Department of Electronics & Computer Science (ECS) successfully conducted CIRCUTECH 2026, bringing together student innovators for competitive circuit debugging, VLSI prototyping, and embedded systems challenges.',
      'Participants demonstrated real-time hardware solutions evaluated by senior faculty and invited industry engineers from BEC’s 35+ corporate partners.'
    ]
  },
  {
    id: 'results-be-vi-viii',
    date: 'EXAMINATION NOTICE',
    category: 'EXAMINATIONS',
    title: 'Results announced for BE VI and VIII semester',
    summary: 'Official semester end examination results for B.E. VI and VIII semesters published on the BEC Results Portal.',
    department: 'Office of the Controller of Examinations',
    imageKey: 'library',
    body: [
      'The Office of the Controller of Examinations at Basaveshwar Engineering College has officially announced the results for the B.E. VI and VIII Semester Examinations.',
      'Students can inspect their provisional grade cards via the official Results Portal using their University Seat Number (USN). Schedules for makeup examinations, photocopy requests, and revaluation are available at the Examination Section.'
    ]
  }
];

const INITIAL_PLACEMENTS_JSON = {
  batchHighlights: [
    {
      batch: '2025 Batch',
      eligible: 494,
      placed: 250,
      offers: 442,
      note: '494 eligible candidates • 250 placed • 442 total corporate offers'
    },
    {
      batch: '2026 Batch',
      eligible: 670,
      placed: 332,
      offers: 450,
      note: '670 eligible candidates • 332 placed • 450 total corporate offers'
    }
  ],
  yearlyOffers: [
    { year: '2016', offers: 318, placed: 235 },
    { year: '2017', offers: 342, placed: 248 },
    { year: '2018', offers: 365, placed: 262 },
    { year: '2019', offers: 398, placed: 284 },
    { year: '2020', offers: 412, placed: 295 },
    { year: '2021', offers: 468, placed: 318 },
    { year: '2022', offers: 585, placed: 390 },
    { year: '2023', offers: 524, placed: 356 },
    { year: '2024', offers: 438, placed: 278 },
    { year: '2025', offers: 442, placed: 250, eligible: 494 },
    { year: '2026', offers: 450, placed: 332, eligible: 670 }
  ]
};

// ============================================================================
// REAL ACADEMIC PROGRAMMES & DEPARTMENTS DATA (10 UG, 3 PG, 10 Research Centres)
// ============================================================================
const UG_PROGRAMMES = [
  {
    id: 'ug-civil',
    code: 'UG-01',
    degree: 'B.E.',
    name: 'Civil Engineering',
    deptSlug: 'civil-engineering',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Civil Engineering',
    overview: 'Founded alongside the institution in 1963, the Department of Civil Engineering anchors structural, geotechnical, water resources, and sustainable environmental engineering across North Karnataka.',
    labs: ['Structural Mechanics & Concrete Testing Lab', 'Geotechnical & Highway Material Lab', 'Environmental & Hydraulics Engineering Lab', 'CAD & Surveying Instrumentation Studio']
  },
  {
    id: 'ug-mech',
    code: 'UG-02',
    degree: 'B.E.',
    name: 'Mechanical Engineering',
    deptSlug: 'mechanical-engineering',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Mechanical Engineering',
    overview: 'Established in 1963, Mechanical Engineering blends classical thermal and manufacturing sciences with modern robotics, CAD/CAM, and sustainable energy conversion.',
    labs: ['Robotics & Flexible Manufacturing Lab', 'Thermal & IC Engines Research Lab', 'Metallurgy & Composite Materials Lab', 'Metrology & Machine Tool Dynamics Lab']
  },
  {
    id: 'ug-eee',
    code: 'UG-03',
    degree: 'B.E.',
    name: 'Electrical & Electronics Engineering',
    deptSlug: 'electrical-electronics-engineering',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Electrical & Electronics',
    overview: 'Tracing its roots to 1963 and home to an active IEEE PES chapter, the department pioneers high-voltage engineering, renewable microgrids, power electronics, and electric mobility.',
    labs: ['High Voltage & Relay Testing Lab', 'Power Electronics & Drives Lab', 'Renewable Energy & Microgrid Research Lab', 'Microcontroller & DSP Control Lab']
  },
  {
    id: 'ug-cse',
    code: 'UG-04',
    degree: 'B.E.',
    name: 'Computer Science & Engineering',
    deptSlug: 'computer-science-engineering',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Computer Science & Engineering',
    overview: 'Focused on systems architecture, algorithms, distributed cloud computing, cybersecurity, and enterprise software engineering with strong placement outcomes.',
    labs: ['Algorithms & Systems Programming Lab', 'Cloud Computing & Network Security Lab', 'Database & Enterprise Architecture Lab', 'Deep Learning & High-Performance Computing Lab']
  },
  {
    id: 'ug-ece',
    code: 'UG-05',
    degree: 'B.E.',
    name: 'Electronics & Communication Engineering',
    deptSlug: 'electronics-communication-engineering',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Electronics & Communication',
    overview: 'Specializing in VLSI design, RF & microwave communication, signal processing, and embedded IoT instrumentation supported by funded research grants.',
    labs: ['VLSI & ASIC Design Studio', 'Microwave, Antenna & RF Communication Lab', 'Digital Signal Processing & Embedded Systems Lab', 'Analog & Linear Integrated Circuits Lab']
  },
  {
    id: 'ug-ise',
    code: 'UG-06',
    degree: 'B.E.',
    name: 'Information Science & Engineering',
    deptSlug: 'information-science-engineering',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Information Science',
    overview: 'Bridging large-scale information management, data engineering, full-stack software design, and intelligent web systems for global industry needs.',
    labs: ['Data Science & Information Retrieval Lab', 'Full-Stack & Web Technologies Studio', 'Operating Systems & Computer Networks Lab', 'Software Verification & Quality Lab']
  },
  {
    id: 'ug-aiml',
    code: 'UG-07',
    degree: 'B.E.',
    name: 'Artificial Intelligence & Machine Learning',
    deptSlug: 'ai-machine-learning',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • VTU Affiliated',
    researchCentre: 'Interdisciplinary AI & Cognitive Systems Research',
    overview: 'Dedicated to statistical learning theory, neural computation, computer vision, natural language engineering, and ethical AI deployment.',
    labs: ['Neural Networks & Deep Learning Studio', 'Computer Vision & Autonomous Robotics Lab', 'Natural Language & Speech Processing Lab', 'Applied Data Analytics Lab']
  },
  {
    id: 'ug-ipe',
    code: 'UG-08',
    degree: 'B.E.',
    name: 'Industrial & Production Engineering',
    deptSlug: 'industrial-production-engineering',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Industrial & Production Engg.',
    overview: 'Integrating precision manufacturing, operations research, supply chain optimization, ergonomics, and quality engineering.',
    labs: ['CNC & Precision Manufacturing Lab', 'Operations Research & Systems Simulation Lab', 'Ergonomics & Work Design Studio', 'Non-Destructive Testing & Quality Lab']
  },
  {
    id: 'ug-bt',
    code: 'UG-09',
    degree: 'B.E.',
    name: 'Biotechnology',
    deptSlug: 'biotechnology',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • NBA Accredited • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Biotechnology',
    overview: 'Advancing bioprocess engineering, bioinformatics, genetic engineering, and sustainable agricultural and environmental biotechnology.',
    labs: ['Bioprocess & Fermentation Technology Lab', 'Molecular Biology & Genetic Engineering Lab', 'Bioinformatics & Computational Biology Studio', 'Downstream Processing & Analytical Lab']
  },
  {
    id: 'ug-ecs',
    code: 'UG-10',
    degree: 'B.E.',
    name: 'Electronics & Computer Science',
    deptSlug: 'electronics-computer-science',
    duration: '4 Years (8 Semesters)',
    accreditation: 'AICTE Recognised • VTU Affiliated',
    researchCentre: 'Hardware-Software Co-Design & Embedded Computing Cluster',
    overview: 'Organizer of the flagship CIRCUTECH 2026 symposium, ECS unifies solid-state electronic hardware design with modern computer science and edge computing.',
    labs: ['Hardware-Software Co-Design Lab', 'Embedded IoT & Edge Computing Lab', 'Digital Circuit Synthesis & FPGA Studio', 'System Software & Interfacing Lab']
  }
];

const PG_PROGRAMMES = [
  {
    id: 'pg-mtech',
    code: 'PG-01',
    degree: 'M.Tech',
    name: 'Master of Technology (M.Tech Programmes)',
    deptSlug: 'postgraduate-mtech',
    duration: '2 Years (4 Semesters)',
    accreditation: 'AICTE Recognised • VTU Affiliated',
    researchCentre: 'Integrated with 10 VTU-Recognised Research Centres',
    overview: 'Advanced postgraduate engineering specializations across Civil (Structural/Geotechnical), Mechanical (Machine Design), CSE, ECE, and Industrial domains with thesis work anchored in BEC’s ₹3.40 crore research ecosystem.',
    labs: ['Advanced Structural & Finite Element Analysis Lab', 'PG Autonomous & Robotics Research Studio', 'High-Performance Computing & VLSI CAD Lab']
  },
  {
    id: 'pg-mba',
    code: 'PG-02',
    degree: 'MBA',
    name: 'Master of Business Administration (MBA)',
    deptSlug: 'management-studies-mba',
    duration: '2 Years (4 Semesters)',
    accreditation: 'AICTE Recognised • VTU Affiliated',
    researchCentre: 'VTU-Recognised Research Centre in Management Studies',
    overview: 'Developing ethically grounded corporate leaders and entrepreneurs in Finance, Marketing, Human Resources, and Operations with direct mentorship from 35+ industry partnerships.',
    labs: ['Financial Markets & Econometrics Terminal', 'Entrepreneurship & Business Incubation Cell', 'Behavioural & Corporate Communication Studio']
  },
  {
    id: 'pg-mca',
    code: 'PG-03',
    degree: 'MCA',
    name: 'Master of Computer Applications (MCA)',
    deptSlug: 'computer-applications-mca',
    duration: '2 Years (4 Semesters)',
    accreditation: 'AICTE Recognised • VTU Affiliated',
    researchCentre: 'Enterprise Software & Applied Computing Division',
    overview: 'Rigorous postgraduate programme in enterprise software architecture, cloud-native development, mobile computing, and applied artificial intelligence.',
    labs: ['Enterprise Application Development Lab', 'Cloud & DevOps Engineering Studio', 'Data Analytics & Machine Intelligence Lab']
  }
];

const RESEARCH_CENTRES = [
  { id: 'rc-01', code: 'VTU-RC-01', name: 'Civil Engineering Research Centre', domain: 'Structural Health, Sustainable Concrete & Water Resources' },
  { id: 'rc-02', code: 'VTU-RC-02', name: 'Mechanical Engineering Research Centre', domain: 'Thermal Sciences, Bio-fuels, Robotics & Composite Materials' },
  { id: 'rc-03', code: 'VTU-RC-03', name: 'Electrical & Electronics Research Centre', domain: 'Smart Grids, Power Quality, High Voltage & Renewable Systems' },
  { id: 'rc-04', code: 'VTU-RC-04', name: 'Computer Science & Engineering Research Centre', domain: 'Distributed Systems, Network Security, AI & Visual Computing' },
  { id: 'rc-05', code: 'VTU-RC-05', name: 'Electronics & Communication Research Centre', domain: 'VLSI, RF/Microwave Antennas & Biomedical Signal Processing' },
  { id: 'rc-06', code: 'VTU-RC-06', name: 'Information Science & Engineering Research Centre', domain: 'Knowledge Engineering, Cloud Security & Data Mining' },
  { id: 'rc-07', code: 'VTU-RC-07', name: 'Industrial & Production Engineering Research Centre', domain: 'Supply Chain Optimization, Lean Manufacturing & Ergonomics' },
  { id: 'rc-08', code: 'VTU-RC-08', name: 'Biotechnology Research Centre', domain: 'Bioprocess Engineering, Environmental Remediation & Genomics' },
  { id: 'rc-09', code: 'VTU-RC-09', name: 'Physics & Applied Sciences Research Centre', domain: 'Materials Science, Thin Films & Optoelectronic Devices' },
  { id: 'rc-10', code: 'VTU-RC-10', name: 'Chemistry & Management Research Centre', domain: 'Electrochemistry, Polymer Science & Regional Industrial Economics' }
];

const MISSION_PILLARS = [
  {
    num: '01',
    title: 'Globally competent professionals',
    statement: 'Impart quality technical education and rigorous analytical training to nurture globally competent engineering and management professionals.'
  },
  {
    num: '02',
    title: 'Culture of research, innovation and entrepreneurship',
    statement: 'Foster a vibrant ecosystem of scholarly inquiry, multidisciplinary laboratories, patentable innovation, and student-led entrepreneurship.'
  },
  {
    num: '03',
    title: 'Collaborations and outreach for industrial and societal needs',
    statement: 'Strengthen enduring partnerships with industry, research organizations, and rural communities to solve real-world industrial and societal challenges.'
  },
  {
    num: '04',
    title: 'Moral and ethical values',
    statement: 'Instill deep-rooted moral integrity, civic responsibility, and ethical leadership inspired by the timeless egalitarian philosophy of Lord Basaveshwara.'
  },
  {
    num: '05',
    title: 'Ecological and environmental consciousness',
    statement: 'Promote sustainable development, green campus stewardship across 93 acres, and ecological consciousness in every engineering design decision.'
  }
];

const CAMPUS_FACILITIES = [
  {
    id: 'fac-library',
    index: '01',
    title: 'Central Library & Digital Archive',
    tag: 'ACADEMIC COMMONS',
    photo: BEC_PHOTOS.library,
    description: 'Expansive multi-level reading halls, print monograph stacks, IEEE/Springer digital consortium access, and quiet research carrels serving 3,500+ students and 200+ faculty.'
  },
  {
    id: 'fac-labs',
    index: '02',
    title: 'Robotics & Research Laboratories',
    tag: '10 VTU RESEARCH CENTRES',
    photo: BEC_PHOTOS.roboticsLab,
    description: 'Specialized laboratories backed by ₹3.40 crore in research grants and 35+ industry partnerships, spanning industrial robotics, VLSI, high-voltage testing, and biotechnology.'
  },
  {
    id: 'fac-hostels',
    index: '03',
    title: 'Residential Hostels (Men & Women)',
    tag: 'RESIDENTIAL LIFE',
    photo: BEC_PHOTOS.aerialView,
    description: 'Dedicated on-campus residential blocks nestled within the 93-acre Vidyanagar greenery with hygienic dining halls, solar-heated utilities, reading rooms, and 24/7 security.'
  },
  {
    id: 'fac-buggies',
    index: '04',
    title: 'Campus Wi-Fi, Canteens & Electric Buggies',
    tag: '93-ACRE MOBILITY & AMENITIES',
    photo: BEC_PHOTOS.campusFront,
    description: 'High-speed optical fiber Wi-Fi across academic blocks, student canteens serving North Karnataka and pan-Indian cuisine, and zero-emission electric buggies for sustainable campus transit.'
  }
];

const NAV_ITEMS = [
  { label: 'Institute', target: 'about' },
  { label: 'Administration', target: 'administration' },
  { label: 'Academics', target: 'programmes' },
  { label: 'Departments', target: 'programmes' },
  { label: 'Admissions', target: 'admissions-modal' },
  { label: 'Examinations', target: 'news' },
  { label: 'Research', target: 'research' },
  { label: 'Placements', target: 'placements' },
  { label: 'Hostels', target: 'facilities' },
  { label: 'Student Life', target: 'student-life' },
  { label: 'NBA', target: 'accreditation' }
];

const FOOTER_LINKS = [
  { label: 'Library', action: 'facilities' },
  { label: 'Scholarships', action: 'admissions-modal' },
  { label: 'RTI', action: 'administration' },
  { label: 'NIRF', action: 'accreditation' },
  { label: 'Alumni', action: 'about' },
  { label: 'Contact', action: 'footer-contact' },
  { label: 'Results Portal', action: 'news-results' },
  { label: 'Grievance Portal', action: 'administration' },
  { label: 'Webmail', action: 'footer-contact' },
  { label: 'VTU', href: 'https://vtu.ac.in' },
  { label: 'AICTE', href: 'https://www.aicte-india.org' },
  { label: 'NSP', href: 'https://scholarships.gov.in' }
];

// ============================================================================
// EDITORIAL ARCHIVAL PHOTO COMPONENT (Blur-up + Credit Caption + WebP)
// ============================================================================
function ArchivalPhoto({ photo, className = '', imgClassName = '', showCode = true, priority = false, aspectClass = '' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`relative overflow-hidden bg-[#E5DEC9] dark:bg-[#1E1C19] ${aspectClass} ${className}`}>
      <img
        src={photo.url}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          loaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-md opacity-70'
        } ${imgClassName}`}
      />
      {showCode && photo.archiveCode && (
        <figcaption className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase font-mono bg-[#181615]/75 text-[#F5F1E9] backdrop-blur-xs">
          {photo.archiveCode}
        </figcaption>
      )}
    </figure>
  );
}

// ============================================================================
// SIGNATURE 3D MOMENT: DEPTH-PARALLAX SCENE + SCROLL GLIDE + "1963" MASK
// ============================================================================
function SignatureHero3D({
  scrollProgress,
  manualGlide,
  setManualGlide,
  reducedMotion,
  setReducedMotion,
  onOpenAdmissions,
  onExploreProgrammes
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const targetPointer = useRef({ x: 0, y: 0 });

  // Effective camera glide progress (0 = 93-Acre Aerial View at 120m, 1 = Campus Front Portico + 1963 Mask)
  const effectiveGlide = manualGlide !== null ? manualGlide : scrollProgress;

  // Smooth pointer interpolation for 3D depth displacement
  useEffect(() => {
    if (reducedMotion) {
      setPointer({ x: 0, y: 0 });
      return;
    }
    let rafId;
    const updatePointer = () => {
      setPointer((prev) => ({
        x: prev.x + (targetPointer.current.x - prev.x) * 0.08,
        y: prev.y + (targetPointer.current.y - prev.y) * 0.08
      }));
      rafId = requestAnimationFrame(updatePointer);
    };
    rafId = requestAnimationFrame(updatePointer);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  // Device orientation (gyroscope) support on mobile/tablet
  useEffect(() => {
    if (reducedMotion) return;
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const gx = Math.max(-1, Math.min(1, e.gamma / 30));
        const gy = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        targetPointer.current = { x: gx, y: gy };
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [reducedMotion]);

  // 3D Topographic Depth-Mesh Overlay Canvas (renders dynamic 93-acre relief lines & depth vertices)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let time = 0;

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * Math.min(window.devicePixelRatio || 1, 2);
        canvas.height = rect.height * Math.min(window.devicePixelRatio || 1, 2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const renderMesh = () => {
      time += reducedMotion ? 0 : 0.012;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const px = targetPointer.current.x;
      const py = targetPointer.current.y;
      const glide = manualGlide !== null ? manualGlide : scrollProgress;

      // Draw subtle architectural elevation contour mesh representing the 93-acre topography
      const cols = 22;
      const rows = 12;
      ctx.strokeStyle = `rgba(216, 208, 194, ${0.16 * (1 - glide * 0.5)})`;
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const u = c / cols;
          const v = r / rows;
          // Synthetic elevation relief from campus aerial layout
          const elevation =
            Math.sin(u * 5.2 + time * 0.6) * Math.cos(v * 4.1 - time * 0.4) * 18 +
            Math.cos((u - 0.5) * 8) * 10 * (1 - glide);

          const x =
            u * w +
            px * (v - 0.5) * 42 * (1 - glide * 0.4) +
            (u - 0.5) * glide * 160;
          const y =
            v * h +
            elevation * (1 - glide * 0.4) +
            py * (u - 0.5) * 32 +
            glide * 60;

          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw depth survey crosshairs
      ctx.fillStyle = 'rgba(181, 137, 66, 0.55)';
      for (let r = 2; r < rows - 1; r += 3) {
        for (let c = 3; c < cols - 1; c += 4) {
          const u = c / cols;
          const v = r / rows;
          const x = u * w + px * (1 - v) * 38;
          const y = v * h + py * (1 - u) * 28;
          ctx.fillRect(x - 3, y - 0.5, 6, 1);
          ctx.fillRect(x - 0.5, y - 3, 1, 6);
        }
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(renderMesh);
      }
    };

    renderMesh();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [scrollProgress, manualGlide, reducedMotion]);

  const handleMouseMove = (e) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetPointer.current = { x: nx, y: ny };
  };

  const handleMouseLeave = () => {
    targetPointer.current = { x: 0, y: 0 };
  };

  // Compute 3D camera transforms for Aerial View (0 -> 0.65) and Campus Front Portico (0.3 -> 1.0)
  const aerialScale = 1.06 + effectiveGlide * 0.48;
  const aerialOpacity = Math.max(0, 1 - effectiveGlide * 1.35);
  const aerialRotateX = pointer.y * -6 * (1 - effectiveGlide * 0.5);
  const aerialRotateY = pointer.x * 8 * (1 - effectiveGlide * 0.5);
  const aerialTranslateX = pointer.x * -26;
  const aerialTranslateY = pointer.y * -18 - effectiveGlide * 50;

  const frontScale = 1.24 - effectiveGlide * 0.2;
  const frontOpacity = Math.min(1, Math.max(0, (effectiveGlide - 0.18) * 1.45));
  const frontTranslateX = pointer.x * -16;
  const frontTranslateY = (1 - effectiveGlide) * 70 + pointer.y * -12;

  // Mask progress for oversized "1963" numeral reveal
  const maskRevealPercent = Math.min(100, Math.max(12, Math.round((effectiveGlide * 115) + 12)));
  const altitudeMeters = Math.max(0, Math.round((1 - effectiveGlide) * 120));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full overflow-hidden bg-[#12100E] select-none"
      style={{ perspective: '1400px' }}
    >
      {/* SVG Displacement Filter for subtle depth-map relief on the aerial campus layers */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="bec-campus-depth-relief" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={reducedMotion ? 0 : Math.round(6 + Math.hypot(pointer.x, pointer.y) * 14)}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* LAYER 1: 93-ACRE AERIAL PHOTO WITH MULTI-PLANE DEPTH PARALLAX */}
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-75 ease-out"
        style={{
          opacity: aerialOpacity,
          transform: `translate3d(${aerialTranslateX}px, ${aerialTranslateY}px, 0) scale(${aerialScale}) rotateX(${aerialRotateX}deg) rotateY(${aerialRotateY}deg)`
        }}
      >
        <img
          src={BEC_PHOTOS.aerialView.url}
          alt={BEC_PHOTOS.aerialView.alt}
          className="w-full h-full object-cover brightness-[0.82] contrast-[1.06]"
          style={{ filter: reducedMotion ? 'none' : 'url(#bec-campus-depth-relief)' }}
        />
        {/* Depth Parallax Midground Relief Slice (central academic quadrangle shift) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate3d(${pointer.x * -18}px, ${pointer.y * -14}px, 35px) scale(1.03)`,
            clipPath: 'polygon(12% 18%, 88% 14%, 92% 84%, 8% 88%)'
          }}
        >
          <img
            src={BEC_PHOTOS.aerialView.url}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover brightness-[0.92] contrast-[1.08]"
          />
        </div>
      </div>

      {/* LAYER 2: CAMPUS FRONT PORTICO PHOTO (Camera glides down into this view on scroll) */}
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-75 ease-out"
        style={{
          opacity: frontOpacity,
          transform: `translate3d(${frontTranslateX}px, ${frontTranslateY}px, 0) scale(${frontScale}) rotateX(${pointer.y * -3}deg) rotateY(${pointer.x * 4}deg)`
        }}
      >
        <img
          src={BEC_PHOTOS.campusFront.url}
          alt={BEC_PHOTOS.campusFront.alt}
          className="w-full h-full object-cover brightness-[0.78] contrast-[1.08]"
        />
      </div>

      {/* LAYER 3: 3D TOPOGRAPHIC DEPTH-MESH CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ARCHITECTURAL VIGNETTE & EDITORIAL GRADIENT SCRIM (Warm Charcoal/Stone, zero AI purple/blue) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(17,16,14,0.72) 0%, rgba(17,16,14,0.28) 42%, rgba(17,16,14,0.88) 100%)'
        }}
      />

      {/* OVERSIZED MASKED "1963" ARCHITECTURAL NUMERAL REVEALED ON SCROLL */}
      <div className="absolute inset-x-0 bottom-14 md:bottom-10 z-20 pointer-events-none flex justify-center overflow-hidden px-4">
        <div className="relative select-none">
          {/* Ghost hairline outline always visible */}
          <span
            className="block font-serif font-semibold leading-[0.78] tracking-[-0.05em] text-[27vw] sm:text-[23vw] md:text-[21vw]"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(245, 241, 233, 0.22)'
            }}
          >
            1963
          </span>
          {/* Scroll-masked solid stone & gold fill reveal */}
          <span
            aria-hidden="true"
            className="absolute inset-0 block font-serif font-semibold leading-[0.78] tracking-[-0.05em] text-[27vw] sm:text-[23vw] md:text-[21vw] text-[#F5F1E9]/25 transition-all duration-150"
            style={{
              clipPath: `polygon(0 ${100 - maskRevealPercent}%, 100% ${100 - maskRevealPercent}%, 100% 100%, 0% 100%)`
            }}
          >
            1963
          </span>
        </div>
      </div>

      {/* HERO FOREGROUND EDITORIAL GRID */}
      <div className="relative z-30 h-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 pb-8 flex flex-col justify-between">
        {/* Top Archival Coordinates & Telemetry Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F5F1E9]/20 pb-3 text-[11px] font-mono tracking-[0.14em] uppercase text-[#E5DEC9]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#B58942]" />
            <span>B.V.V. SANGHA INSTITUTION • ESTD 1963</span>
            <span className="hidden md:inline text-[#F5F1E9]/40">|</span>
            <span className="hidden md:inline">16.1754° N, 75.6558° E // 93-ACRE VIDYANAGAR CAMPUS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C89D54]">
              CAMERA ALTITUDE: {altitudeMeters}M {effectiveGlide > 0.5 ? '(MAIN PORTICO)' : '(AERIAL SURVEY)'}
            </span>
            <span className="hidden sm:inline text-[#F5F1E9]/40">|</span>
            <span className="hidden sm:inline">1963 MASK: {maskRevealPercent}%</span>
          </div>
        </div>

        {/* Center-Left Editorial Monograph Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-6">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 border border-[#F5F1E9]/25 bg-[#181615]/70 text-[#F5F1E9] text-xs font-mono tracking-[0.12em] uppercase">
              <span>Government-Aided</span>
              <span className="text-[#C89D54]">•</span>
              <span>AICTE Recognised</span>
              <span className="text-[#C89D54]">•</span>
              <span>NAAC ‘A’ Grade</span>
              <span className="text-[#C89D54]">•</span>
              <span>NBA Accredited</span>
              <span className="text-[#C89D54]">•</span>
              <span>VTU Belagavi</span>
            </div>

            <h1 className="font-serif text-[#F5F1E9] text-4xl sm:text-6xl xl:text-[74px] leading-[0.96] tracking-[-0.025em] font-medium">
              Six Decades of Engineering Rigour on 93 Acres of Stone &amp; Canopy.
            </h1>

            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#E5DEC9]/90 font-sans leading-relaxed">
              Basaveshwar Engineering College, Bagalkote — permanently affiliated to Visvesvaraya Technological University, Belagavi. Home to 10 undergraduate programmes, 3 postgraduate programmes, 10 VTU-recognised research centres, and 20,000+ alumni worldwide.
            </p>

            {/* Primary CTA Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAdmissions}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#641B20] hover:bg-[#7D2228] text-[#F5F1E9] border border-[#B58942]/50 text-xs sm:text-sm font-mono uppercase tracking-[0.14em] transition-colors cursor-pointer"
              >
                <span>Admissions 2026–27 Open</span>
                <ArrowUpRight className="w-4 h-4 text-[#C89D54] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onExploreProgrammes}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#181615]/75 hover:bg-[#F5F1E9] text-[#F5F1E9] hover:text-[#181615] border border-[#F5F1E9]/35 text-xs sm:text-sm font-mono uppercase tracking-[0.14em] transition-colors cursor-pointer"
              >
                <span>Explore 10 UG &amp; 3 PG Programmes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Depth & Camera Glide Controller Box */}
          <div className="lg:col-span-4 bg-[#181615]/85 border border-[#F5F1E9]/20 p-5 text-[#F5F1E9] backdrop-blur-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5F1E9]/15 pb-2.5">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#C89D54]">
                3D Depth-Parallax &amp; Camera Glide
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#641B20] text-[#F5F1E9]">
                LIVE WEBGL / SVG
              </span>
            </div>

            <p className="text-xs text-[#E5DEC9]/80 leading-relaxed">
              Move cursor (or tilt device) to shift the 93-acre relief. Scroll down or drag the altitude scrubber below to glide from the <strong className="text-[#F5F1E9] font-normal">Aerial Survey</strong> down to the <strong className="text-[#F5F1E9] font-normal">Main Stone Portico</strong> and reveal the <strong className="text-[#C89D54] font-normal">1963</strong> foundation numeral.
            </p>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-[#E5DEC9]">
                <span>01. 93-ACRE AERIAL</span>
                <span>02. CAMPUS FRONT (1963)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={effectiveGlide}
                aria-label="Glide camera from aerial view to campus front"
                onChange={(e) => setManualGlide(parseFloat(e.target.value))}
                className="w-full accent-[#B58942] cursor-pointer h-1.5 bg-[#2A2622]"
              />
              <div className="flex items-center justify-between pt-1">
                {manualGlide !== null ? (
                  <button
                    onClick={() => setManualGlide(null)}
                    className="text-[10px] font-mono uppercase tracking-wider text-[#C89D54] underline cursor-pointer"
                  >
                    Reset to Scroll-Sync
                  </button>
                ) : (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A39B8F]">
                    Synced with Page Scroll
                  </span>
                )}

                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-[#F5F1E9]/25 hover:border-[#C89D54] text-[#E5DEC9] cursor-pointer"
                >
                  {reducedMotion ? 'Motion: Reduced' : 'Motion: Full 3D'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Fact Strip inside Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border-t border-[#F5F1E9]/20 pt-3 gap-y-2 text-[#F5F1E9]">
          {[
            { k: 'ESTD', v: '1963' },
            { k: 'CAMPUS', v: '93 Acres' },
            { k: 'UG / PG', v: '10 UG • 3 PG' },
            { k: 'RESEARCH', v: '10 VTU Centres' },
            { k: 'FACULTY', v: '200+ (89 PhDs)' },
            { k: 'STUDENTS', v: '3,500+' },
            { k: 'ALUMNI', v: '20,000+' },
            { k: 'GRANTS', v: '₹3.40 Crore' }
          ].map((item, idx) => (
            <div key={idx} className="pr-3 border-r border-[#F5F1E9]/10 last:border-r-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#C89D54]">
                {item.k}
              </div>
              <div className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                {item.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Preloader State (clean, under 1.5s)
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(18);

  // Theme State (Light warm stone default, Dark obsidian basalt toggle)
  const [darkMode, setDarkMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Scroll & Hero 3D Camera Glide State
  const heroScrollWrapperRef = useRef(null);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const [manualGlide, setManualGlide] = useState(null);
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Editable JSON States (news.json & placements.json)
  const [newsData, setNewsData] = useState(INITIAL_NEWS_JSON);
  const [placementsData, setPlacementsData] = useState(INITIAL_PLACEMENTS_JSON);
  const [jsonDrawerOpen, setJsonDrawerOpen] = useState(false);
  const [activeJsonTab, setActiveJsonTab] = useState('placements');
  const [jsonEditorText, setJsonEditorText] = useState('');
  const [jsonError, setJsonError] = useState(null);

  // Active Inner-Page Template Views ('home' | 'department' | 'programme' | 'news-article')
  const [activeView, setActiveView] = useState({ type: 'home', payload: null });

  // Modals (Admissions 2026-27 & Next.js App Router README/Code Architecture)
  const [admissionsModalOpen, setAdmissionsModalOpen] = useState(false);
  const [nextjsModalOpen, setNextjsModalOpen] = useState(false);
  const [admissionSubmitted, setAdmissionSubmitted] = useState(false);

  // Programmes Explorer State ('ug' | 'pg' | 'research')
  const [programmeTab, setProgrammeTab] = useState('ug');

  // Vision/Mission Horizontal Scroll Rail Progress
  const missionSectionRef = useRef(null);
  const [missionProgress, setMissionProgress] = useState(0);

  // Inject Google Fonts (Cormorant Garamond, Plus Jakarta Sans, JetBrains Mono)
  useEffect(() => {
    const linkId = 'bec-editorial-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setReducedMotion(true);
  }, []);

  // Preloader timer (< 1.2s)
  useEffect(() => {
    const t1 = setTimeout(() => setPreloadProgress(68), 320);
    const t2 = setTimeout(() => setPreloadProgress(100), 750);
    const t3 = setTimeout(() => setPreloaderDone(true), 1050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Scroll listener for Hero 3D camera glide, sticky nav, and Vision/Mission horizontal pin
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setNavSolid(sy > 48);

      if (heroScrollWrapperRef.current) {
        const rect = heroScrollWrapperRef.current.getBoundingClientRect();
        const totalScrollable = Math.max(1, rect.height - window.innerHeight);
        const scrolled = Math.min(totalScrollable, Math.max(0, -rect.top));
        setHeroScrollProgress(scrolled / totalScrollable);
      }

      if (missionSectionRef.current) {
        const mRect = missionSectionRef.current.getBoundingClientRect();
        const mScrollable = Math.max(1, mRect.height - window.innerHeight);
        const mScrolled = Math.min(mScrollable, Math.max(0, -mRect.top));
        setMissionProgress(mScrolled / mScrollable);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView.type]);

  // Open JSON Editor Drawer
  const openJsonEditor = (tab = 'placements') => {
    setActiveJsonTab(tab);
    setJsonEditorText(
      JSON.stringify(tab === 'placements' ? placementsData : newsData, null, 2)
    );
    setJsonError(null);
    setJsonDrawerOpen(true);
  };

  const handleApplyJsonChanges = () => {
    try {
      const parsed = JSON.parse(jsonEditorText);
      if (activeJsonTab === 'placements') {
        if (!parsed.yearlyOffers || !Array.isArray(parsed.yearlyOffers)) {
          throw new Error('placements.json must include a "yearlyOffers" array.');
        }
        setPlacementsData(parsed);
      } else {
        if (!Array.isArray(parsed)) {
          throw new Error('news.json must be an array of news objects.');
        }
        setNewsData(parsed);
      }
      setJsonError(null);
      setJsonDrawerOpen(false);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  // Navigation handler
  const navigateToSection = (target) => {
    setMobileMenuOpen(false);
    if (target === 'admissions-modal') {
      setAdmissionsModalOpen(true);
      return;
    }
    if (target === 'news-results') {
      const resultsItem = newsData.find((n) => n.id === 'results-be-vi-viii') || newsData[0];
      setActiveView({ type: 'news-article', payload: resultsItem });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (activeView.type !== 'home') {
      setActiveView({ type: 'home', payload: null });
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Custom Font Families & Editorial Styling Rules */}
      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes tickerMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: tickerMarquee 38s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* SUBTLE SVG FILM GRAIN OVERLAY */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ====================================================================
          1. PRELOADER WITH BEC EMBLEM / WORDMARK (Clean, < 1.2s)
      ==================================================================== */}
      {!preloaderDone && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[100] bg-[#181615] text-[#F5F1E9] flex flex-col justify-between p-6 sm:p-12 transition-opacity duration-500"
        >
          <div className="flex items-center justify-between border-b border-[#F5F1E9]/15 pb-4 text-xs font-mono tracking-[0.16em] uppercase text-[#C89D54]">
            <span>B.V.V. Sangha Institution</span>
            <span>Bagalkote – 587 102, Karnataka</span>
          </div>

          <div className="my-auto max-w-3xl">
            <div className="inline-flex items-center gap-4 mb-6">
              {/* Architectural Monogram Seal */}
              <div className="w-14 h-14 border border-[#B58942] flex items-center justify-center font-serif text-2xl font-semibold text-[#C89D54]">
                BEC
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#E5DEC9]/80">
                <div>ESTD 1963 • Permanent Affiliation: VTU Belagavi</div>
                <div>NAAC ‘A’ Grade • NBA Accredited • AICTE Recognised</div>
              </div>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight leading-none text-[#F5F1E9]">
              Basaveshwar Engineering College
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-[#C89D54]">
              S. Nijalingappa Vidyanagar • 93-Acre Campus Monograph
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-[0.16em]">
              <span>Loading Archival Photography &amp; 3D Relief</span>
              <div className="flex items-center gap-4">
                <span>{preloadProgress}%</span>
                <button
                  onClick={() => setPreloaderDone(true)}
                  className="underline text-[#C89D54] cursor-pointer"
                >
                  Skip
                </button>
              </div>
            </div>
            <div className="w-full h-[2px] bg-[#2A2622] overflow-hidden">
              <div
                className="h-full bg-[#B58942] transition-all duration-300"
                style={{ width: `${preloadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          2. STICKY INSTITUTIONAL HEADER & FULL IA NAVIGATION
      ==================================================================== */}
      <div className="min-h-screen bg-[#F5F1E9] dark:bg-[#11100E] text-[#181615] dark:text-[#F3EFE6] font-sans transition-colors duration-300">
        {/* Top Institutional Utility Bar */}
        <div className="bg-[#181615] text-[#E5DEC9] border-b border-[#2A2622] text-[11px] font-mono">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-[#C89D54] font-medium">B.V.V. SANGHA’S BEC BAGALKOTE (ESTD 1963)</span>
              <span className="hidden xl:inline text-[#F5F1E9]/30">|</span>
              <span className="hidden xl:inline">Phone: +91 76187 81963</span>
              <span className="hidden md:inline text-[#F5F1E9]/30">|</span>
              <span className="hidden md:inline">becprincipal@yahoo.com</span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => openJsonEditor('placements')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#B58942]/50 bg-[#2A2622]/70 hover:bg-[#641B20] text-[#F5F1E9] transition-colors cursor-pointer"
                title="Live edit placements.json and news.json"
              >
                <FileJson className="w-3.5 h-3.5 text-[#C89D54]" />
                <span>placements.json / news.json</span>
              </button>

              <button
                onClick={() => setNextjsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#F5F1E9]/20 hover:border-[#C89D54] text-[#E5DEC9] transition-colors cursor-pointer"
                title="View Next.js App Router Folder Structure & README"
              >
                <Code2 className="w-3.5 h-3.5 text-[#C89D54]" />
                <span className="hidden sm:inline">Next.js Structure &amp; README</span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle Light and Dark Stone Theme"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#F5F1E9]/20 hover:border-[#C89D54] text-[#F5F1E9] cursor-pointer"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-[#C89D54]" /> : <Moon className="w-3.5 h-3.5 text-[#C89D54]" />}
                <span>{darkMode ? 'Light Stone' : 'Dark Basalt'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Main Navigation Bar */}
        <header
          className={`sticky top-0 z-40 transition-all duration-300 border-b ${
            navSolid || activeView.type !== 'home'
              ? 'bg-[#F5F1E9]/95 dark:bg-[#11100E]/95 backdrop-blur-md border-[#D8D0C2] dark:border-[#2A2622] py-3 shadow-xs'
              : 'bg-[#181615]/90 text-[#F5F1E9] border-[#F5F1E9]/15 py-4'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
            {/* Emblem & Brand Wordmark */}
            <button
              onClick={() => {
                setActiveView({ type: 'home', payload: null });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 border border-[#641B20] dark:border-[#C89D54] bg-[#641B20] text-[#F5F1E9] flex items-center justify-center font-serif text-lg font-semibold tracking-tight shrink-0">
                BEC
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-semibold leading-none tracking-tight">
                  Basaveshwar Engineering College
                </div>
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase opacity-75 mt-0.5">
                  Bagalkote • ESTD 1963 • NAAC ‘A’ • NBA
                </div>
              </div>
            </button>

            {/* All 11 Required Information Architecture Links */}
            <nav aria-label="Main Institutional Navigation" className="hidden 2xl:flex items-center gap-5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateToSection(item.target)}
                  className="text-xs font-mono uppercase tracking-[0.11em] hover:text-[#641B20] dark:hover:text-[#C89D54] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Prominent Admissions 2026-27 CTA + Mobile/Tablet Drawer Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdmissionsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#641B20] hover:bg-[#7D2228] text-[#F5F1E9] text-xs font-mono uppercase tracking-[0.13em] border border-[#B58942]/40 transition-colors cursor-pointer"
              >
                <span>Admissions 2026–27</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D54]" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="2xl:hidden p-2 border border-current/25 hover:border-[#B58942] cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Compact Secondary IA Bar on Desktop (when viewport < 1536px) */}
          <div className="hidden lg:flex 2xl:hidden max-w-[1440px] mx-auto px-8 pt-2.5 mt-2.5 border-t border-current/10 items-center justify-between text-[11px] font-mono uppercase tracking-[0.12em]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => navigateToSection(item.target)}
                className="hover:text-[#641B20] dark:hover:text-[#C89D54] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="2xl:hidden bg-[#F5F1E9] dark:bg-[#1A1816] text-[#181615] dark:text-[#F3EFE6] border-t border-[#D8D0C2] dark:border-[#2A2622] px-4 py-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigateToSection(item.target)}
                    className="text-left px-3 py-2.5 border border-[#D8D0C2] dark:border-[#2A2622] font-mono text-xs uppercase tracking-wider hover:bg-[#641B20] hover:text-[#F5F1E9] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ====================================================================
            INNER-PAGE TEMPLATES ROUTER (Department / Programme / News Article)
        ==================================================================== */}
        {activeView.type !== 'home' ? (
          <InnerPageTemplateView
            activeView={activeView}
            setActiveView={setActiveView}
            newsData={newsData}
            onOpenAdmissions={() => setAdmissionsModalOpen(true)}
          />
        ) : (
          <main>
            {/* ================================================================
                HERO SCROLL CONTAINER (195vh tall for smooth camera glide & 1963 mask)
            ================================================================ */}
            <section
              ref={heroScrollWrapperRef}
              aria-label="93-Acre Campus 3D Depth Relief and Portico Approach"
              className="relative h-[175vh]"
            >
              <div className="sticky top-[61px] h-[calc(100vh-61px)] w-full overflow-hidden">
                <SignatureHero3D
                  scrollProgress={heroScrollProgress}
                  manualGlide={manualGlide}
                  setManualGlide={setManualGlide}
                  reducedMotion={reducedMotion}
                  setReducedMotion={setReducedMotion}
                  onOpenAdmissions={() => setAdmissionsModalOpen(true)}
                  onExploreProgrammes={() => navigateToSection('programmes')}
                />
              </div>
            </section>

            {/* ================================================================
                3. ANNOUNCEMENT TICKER + ASYMMETRIC EDITORIAL NEWS CARDS (news.json)
            ================================================================ */}
            <section
              id="news"
              className="border-b border-[#D8D0C2] dark:border-[#2A2622] bg-[#EBE5D8] dark:bg-[#1A1816]"
            >
              {/* Live Announcement Ticker Bar */}
              <div className="border-b border-[#D8D0C2] dark:border-[#2A2622] bg-[#641B20] text-[#F5F1E9] py-2.5 overflow-hidden flex items-center">
                <div className="px-4 sm:px-6 font-mono text-[11px] uppercase tracking-[0.16em] bg-[#641B20] z-10 shrink-0 flex items-center gap-2 border-r border-[#F5F1E9]/20">
                  <span className="w-2 h-2 bg-[#C89D54] inline-block" />
                  <span>DISPATCHES // NEWS.JSON</span>
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="animate-ticker font-mono text-xs tracking-wider">
                    {[...newsData, ...newsData].map((item, i) => (
                      <button
                        key={`${item.id}-${i}`}
                        onClick={() => {
                          setActiveView({ type: 'news-article', payload: item });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-3 px-6 hover:text-[#C89D54] transition-colors cursor-pointer"
                      >
                        <span className="text-[#C89D54]">[{item.date}]</span>
                        <span>{item.title}</span>
                        <span className="opacity-40">—</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editorial News & Announcements Grid */}
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D0C2] dark:border-[#2A2622] pb-6 mb-12 gap-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54] mb-2">
                      SECTION 01 // OFFICIAL BULLETINS &amp; EVENTS
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
                      Campus Dispatches &amp; Examination Notices
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openJsonEditor('news')}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#181615]/25 dark:border-[#F3EFE6]/25 font-mono text-xs uppercase tracking-[0.12em] hover:border-[#641B20] dark:hover:border-[#C89D54] cursor-pointer"
                    >
                      <FileJson className="w-3.5 h-3.5 text-[#641B20] dark:text-[#C89D54]" />
                      <span>Edit news.json ({newsData.length} items)</span>
                    </button>
                  </div>
                </div>

                {/* Asymmetric Swiss Grid of News Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]">
                  {/* Featured Lead Dispatch (16th Graduation Day) */}
                  {newsData[0] && (
                    <article
                      onClick={() => {
                        setActiveView({ type: 'news-article', payload: newsData[0] });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="lg:col-span-7 border-r border-b border-[#D8D0C2] dark:border-[#2A2622] p-6 sm:p-8 flex flex-col justify-between group cursor-pointer bg-[#F5F1E9] dark:bg-[#11100E] hover:bg-[#EBE5D8]/60 dark:hover:bg-[#1A1816] transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F] mb-4">
                          <span className="text-[#641B20] dark:text-[#C89D54] font-semibold">
                            {newsData[0].category}
                          </span>
                          <span>{newsData[0].date}</span>
                        </div>

                        <ArchivalPhoto
                          photo={BEC_PHOTOS[newsData[0].imageKey] || BEC_PHOTOS.graduationDay}
                          aspectClass="aspect-[16/10]"
                          className="mb-6"
                          imgClassName="group-hover:scale-103"
                        />

                        <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight group-hover:text-[#641B20] dark:group-hover:text-[#C89D54] transition-colors">
                          {newsData[0].title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base text-[#5A534A] dark:text-[#A39B8F] leading-relaxed">
                          {newsData[0].summary}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-[#D8D0C2] dark:border-[#2A2622] flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em]">
                        <span>{newsData[0].department}</span>
                        <span className="inline-flex items-center gap-1.5 text-[#641B20] dark:text-[#C89D54]">
                          Read Full Notice <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  )}

                  {/* Right Column Stack of Remaining 6 Official Announcements */}
                  <div className="lg:col-span-5 grid grid-cols-1 divide-y divide-[#D8D0C2] dark:divide-[#2A2622] border-r border-b border-[#D8D0C2] dark:border-[#2A2622]">
                    {newsData.slice(1).map((item, idx) => (
                      <article
                        key={item.id}
                        onClick={() => {
                          setActiveView({ type: 'news-article', payload: item });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-5 sm:p-6 bg-[#F5F1E9] dark:bg-[#11100E] hover:bg-[#EBE5D8] dark:hover:bg-[#1A1816] transition-colors group cursor-pointer flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F] mb-1.5">
                          <span className="text-[#641B20] dark:text-[#C89D54]">
                            0{idx + 2} // {item.category}
                          </span>
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-serif text-xl sm:text-2xl font-medium group-hover:text-[#641B20] dark:group-hover:text-[#C89D54] transition-colors">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-xs sm:text-sm text-[#5A534A] dark:text-[#A39B8F] line-clamp-2">
                              {item.summary}
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 shrink-0 mt-1.5 opacity-50 group-hover:opacity-100 group-hover:text-[#641B20] dark:group-hover:text-[#C89D54]" />
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                4. ABOUT BEC: SPLIT LAYOUT WITH LONG-FORM COPY, 1963 NUMERAL & PHOTO
            ================================================================ */}
            <section
              id="about"
              className="border-b border-[#D8D0C2] dark:border-[#2A2622] py-20 sm:py-28"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Left Sticky Column: Oversized 1963 Heritage Numeral & B.V.V. Sangha Provenance */}
                  <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54]">
                      SECTION 02 // INSTITUTIONAL MONOGRAPH
                    </div>

                    <div className="border-y border-[#D8D0C2] dark:border-[#2A2622] py-6">
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#5A534A] dark:text-[#A39B8F]">
                        FOUNDATION YEAR • BAGALKOTE, KARNATAKA
                      </div>
                      <div className="font-serif text-[112px] sm:text-[148px] leading-[0.82] font-semibold tracking-[-0.04em] text-[#641B20] dark:text-[#C89D54] select-none mt-2">
                        1963
                      </div>
                    </div>

                    <ArchivalPhoto
                      photo={BEC_PHOTOS.campusFront}
                      aspectClass="aspect-[4/3]"
                    />

                    <div className="p-4 border border-[#D8D0C2] dark:border-[#2A2622] bg-[#EBE5D8]/60 dark:bg-[#1A1816] text-xs font-mono space-y-1.5">
                      <div className="uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54] font-semibold">
                        PARENT SOCIETY: B.V.V. SANGHA
                      </div>
                      <p className="font-sans text-[#5A534A] dark:text-[#A39B8F] leading-relaxed">
                        Shri Basaveshwar Veerashaiva Vidyavardhaka Sangha (B.V.V. Sangha), Bagalkote, established Basaveshwar Engineering College in 1963 to democratize technical education across Northern Karnataka.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Editorial Long-Form Copy & Verified Institutional Ledger */}
                  <div className="lg:col-span-7 space-y-10">
                    <div className="space-y-6">
                      <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.02] tracking-tight">
                        An Enduring Seat of Public-Spirited Engineering Scholarship in North Karnataka.
                      </h2>

                      <div className="space-y-5 text-base sm:text-lg text-[#181615]/90 dark:text-[#F3EFE6]/90 leading-relaxed border-l-2 border-[#641B20] dark:border-[#C89D54] pl-6">
                        <p>
                          Established in <strong>1963</strong> under the flagship of <strong>B.V.V. Sangha</strong> at S. Nijalingappa Vidyanagar, Bagalkote, <strong>Basaveshwar Engineering College (BEC)</strong> stands on an expansive <strong>93-acre campus</strong> of tree-lined quadrangles, heritage stone architecture, and modern research laboratories.
                        </p>
                        <p>
                          As a <strong>Government-aided</strong>, <strong>AICTE-recognised</strong> institution permanently affiliated to <strong>Visvesvaraya Technological University (VTU), Belagavi</strong>, BEC holds an <strong>NAAC ‘A’ grade</strong> and <strong>NBA accreditation</strong> across key engineering programmes. Beginning with three foundational disciplines in 1963 (Civil, Mechanical, and Electrical Engineering), the college now encompasses <strong>10 undergraduate (B.E.) programmes</strong>, <strong>3 postgraduate programmes (M.Tech, MBA, MCA)</strong>, and <strong>10 VTU-recognised research centres</strong>.
                        </p>
                        <p>
                          Guided by a scholarly community of <strong>200+ faculty members (89 with PhDs)</strong> and <strong>200 dedicated support staff</strong>, the college educates <strong>3,500+ students</strong> while stewarding <strong>₹3.40 crore in research grants</strong>, <strong>35+ active industry partnerships</strong>, <strong>50+ student technical and cultural clubs</strong>, and a global network of <strong>20,000+ alumni</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Accreditation & Governance Strip */}
                    <div
                      id="accreditation"
                      className="grid grid-cols-2 sm:grid-cols-3 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]"
                    >
                      {[
                        { label: 'STATUS', val: 'Government-Aided', sub: 'State of Karnataka' },
                        { label: 'STATUTORY BODY', val: 'AICTE Recognised', sub: 'New Delhi' },
                        { label: 'QUALITY GRADE', val: "NAAC 'A' Grade", sub: 'Institutional Assessment' },
                        { label: 'PROGRAMME QUALITY', val: 'NBA Accredited', sub: 'Outcome-Based Education' },
                        { label: 'UNIVERSITY', val: 'VTU Belagavi', sub: 'Permanently Affiliated' },
                        { label: 'FOUNDED', val: 'ESTD 1963', sub: 'B.V.V. Sangha Institution' }
                      ].map((acc, i) => (
                        <div
                          key={i}
                          className="p-4 sm:p-5 border-r border-b border-[#D8D0C2] dark:border-[#2A2622] bg-[#EBE5D8]/40 dark:bg-[#1A1816]/60"
                        >
                          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F]">
                            {acc.label}
                          </div>
                          <div className="font-serif text-xl sm:text-2xl font-semibold text-[#641B20] dark:text-[#C89D54] mt-1">
                            {acc.val}
                          </div>
                          <div className="text-xs text-[#5A534A] dark:text-[#A39B8F] mt-0.5">
                            {acc.sub}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Verified Institutional Scale Ledger (Strictly real numbers from prompt) */}
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#5A534A] dark:text-[#A39B8F] mb-3">
                        VERIFIED INSTITUTIONAL SCALE LEDGER
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]">
                        {[
                          { num: '93', unit: 'Acres', desc: 'Green Campus in Bagalkote' },
                          { num: '10', unit: 'UG Programmes', desc: 'B.E. Engineering Disciplines' },
                          { num: '3', unit: 'PG Programmes', desc: 'M.Tech, MBA & MCA' },
                          { num: '10', unit: 'Research Centres', desc: 'VTU-Recognised Ph.D. Centres' },
                          { num: '200+', unit: 'Faculty', desc: 'Including 89 with PhDs' },
                          { num: '200', unit: 'Support Staff', desc: 'Technical & Administrative' },
                          { num: '3,500+', unit: 'Students', desc: 'UG, PG & Doctoral Scholars' },
                          { num: '20,000+', unit: 'Alumni', desc: 'Global Engineering Network' },
                          { num: '₹3.40 Cr', unit: 'Research Grants', desc: '35+ Industry Partnerships • 50+ Clubs' }
                        ].map((stat, idx) => (
                          <div
                            key={idx}
                            className="p-5 border-r border-b border-[#D8D0C2] dark:border-[#2A2622]"
                          >
                            <div className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
                              {stat.num}
                            </div>
                            <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#641B20] dark:text-[#C89D54] mt-1">
                              {stat.unit}
                            </div>
                            <div className="text-xs text-[#5A534A] dark:text-[#A39B8F] mt-1">
                              {stat.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Administration & Convocation Photo Strip */}
                    <div
                      id="administration"
                      className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-4 border-t border-[#D8D0C2] dark:border-[#2A2622]"
                    >
                      <div className="sm:col-span-6">
                        <ArchivalPhoto
                          photo={BEC_PHOTOS.graduationDay}
                          aspectClass="aspect-[16/10]"
                        />
                      </div>
                      <div className="sm:col-span-6 space-y-2">
                        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54]">
                          GOVERNANCE &amp; ADMINISTRATION
                        </div>
                        <h3 className="font-serif text-2xl font-medium">
                          B.V.V. Sangha &amp; Collegiate Administration
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5A534A] dark:text-[#A39B8F] leading-relaxed">
                          Situated at S. Nijalingappa Vidyanagar, Bagalkote – 587 102, Karnataka. For official administrative correspondence, RTI disclosures, or Principal’s Office inquiries: <strong>+91 76187 81963</strong> / <strong>becprincipal@yahoo.com</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                5. VISION & MISSION: HORIZONTALLY PINNED SCROLL SECTION
            ================================================================ */}
            <section
              ref={missionSectionRef}
              aria-label="Vision and Five Mission Pillars"
              className="relative h-[240vh] border-b border-[#D8D0C2] dark:border-[#2A2622] bg-[#181615] text-[#F5F1E9]"
            >
              <div className="sticky top-[61px] h-[calc(100vh-61px)] overflow-hidden flex flex-col justify-between py-10 sm:py-14">
                {/* Top Vision Statement Banner */}
                <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 border-b border-[#F5F1E9]/15 pb-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#C89D54]">
                      SECTION 03 // INSTITUTIONAL CHARTER (HORIZONTALLY PINNED SCROLL)
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#E5DEC9]/70">
                        SCROLL PROGRESS: {Math.round(missionProgress * 100)}%
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        aria-label="Scrub through the 5 Mission pillars"
                        value={missionProgress}
                        onChange={(e) => setMissionProgress(parseFloat(e.target.value))}
                        className="w-24 accent-[#B58942] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                    <div className="lg:col-span-2 font-mono text-xs uppercase tracking-[0.18em] text-[#C89D54]">
                      OUR VISION —
                    </div>
                    <blockquote className="lg:col-span-10 font-serif text-2xl sm:text-4xl lg:text-[44px] leading-[1.08] tracking-tight text-[#F5F1E9]">
                      “To be an institution of excellence in education, research and innovation for sustainable future.”
                    </blockquote>
                  </div>
                </div>

                {/* Horizontally Translating Mission Rail (5 Pillars) */}
                <div className="my-auto overflow-hidden px-4 sm:px-8">
                  <div className="max-w-[1440px] mx-auto">
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C89D54] mb-4">
                      FIVE MISSION PILLARS (01 — 05)
                    </div>
                    <div
                      className="flex gap-6 transition-transform duration-100 ease-out will-change-transform"
                      style={{
                        transform: `translate3d(-${missionProgress * 52}%, 0, 0)`
                      }}
                    >
                      {MISSION_PILLARS.map((pillar) => (
                        <div
                          key={pillar.num}
                          className="w-[300px] sm:w-[390px] md:w-[440px] shrink-0 border border-[#F5F1E9]/20 bg-[#211E1B] p-6 sm:p-8 flex flex-col justify-between min-h-[270px]"
                        >
                          <div className="flex items-start justify-between border-b border-[#F5F1E9]/15 pb-4">
                            <span className="font-serif text-6xl sm:text-7xl font-semibold leading-none text-[#C89D54]">
                              {pillar.num}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E5DEC9]/60">
                              BEC MISSION // {pillar.num}
                            </span>
                          </div>

                          <div className="pt-6 space-y-2.5">
                            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F5F1E9] capitalize">
                              {pillar.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#E5DEC9]/80 leading-relaxed">
                              {pillar.statement}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Stepper Indicators */}
                <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 pt-4 border-t border-[#F5F1E9]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#E5DEC9]/70">
                  <div className="flex items-center gap-2">
                    {MISSION_PILLARS.map((p, idx) => {
                      const active = missionProgress >= idx * 0.2 - 0.05;
                      return (
                        <button
                          key={p.num}
                          onClick={() => setMissionProgress(idx / 4)}
                          className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                            active
                              ? 'border-[#C89D54] bg-[#641B20] text-[#F5F1E9]'
                              : 'border-[#F5F1E9]/20 text-[#E5DEC9]/60'
                          }`}
                        >
                          {p.num}
                        </button>
                      );
                    })}
                  </div>
                  <span>KEEP SCROLLING TO EXPLORE ACADEMIC PROGRAMMES →</span>
                </div>
              </div>
            </section>

            {/* ================================================================
                6. PROGRAMMES EXPLORER: UG (10) / PG (3) / RESEARCH (10) TABS
            ================================================================ */}
            <section
              id="programmes"
              className="border-b border-[#D8D0C2] dark:border-[#2A2622] py-20 sm:py-28"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#D8D0C2] dark:border-[#2A2622] pb-8 mb-12 gap-6">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54] mb-2">
                      SECTION 04 // ACADEMICS, DEPARTMENTS &amp; RESEARCH
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
                      Academic Programmes &amp; Research Centres
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[#5A534A] dark:text-[#A39B8F] max-w-2xl">
                      Permanently affiliated to VTU Belagavi. Select any department or programme row below to inspect its dedicated <strong>Department Page</strong> or <strong>Programme Detail</strong> monograph.
                    </p>
                  </div>

                  {/* UG / PG / Research Filter Tabs */}
                  <div
                    role="tablist"
                    aria-label="Academic Programme Categories"
                    className="inline-flex border border-[#D8D0C2] dark:border-[#2A2622] bg-[#EBE5D8] dark:bg-[#1A1816] p-1 self-start"
                  >
                    {[
                      { id: 'ug', label: '10 UG Programmes (B.E.)' },
                      { id: 'pg', label: '3 PG Programmes (M.Tech / MBA / MCA)' },
                      { id: 'research', label: '10 VTU Research Centres' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={programmeTab === tab.id}
                        onClick={() => setProgrammeTab(tab.id)}
                        className={`px-4 py-2.5 text-xs font-mono uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                          programmeTab === tab.id
                            ? 'bg-[#641B20] text-[#F5F1E9]'
                            : 'text-[#181615] dark:text-[#F3EFE6] hover:text-[#641B20] dark:hover:text-[#C89D54]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAB 1: 10 UNDERGRADUATE PROGRAMMES */}
                {programmeTab === 'ug' && (
                  <div className="border-t border-l border-[#D8D0C2] dark:border-[#2A2622] grid grid-cols-1 md:grid-cols-2">
                    {UG_PROGRAMMES.map((prog) => (
                      <div
                        key={prog.id}
                        className="border-r border-b border-[#D8D0C2] dark:border-[#2A2622] p-6 sm:p-8 flex flex-col justify-between bg-[#F5F1E9] dark:bg-[#11100E] hover:bg-[#EBE5D8]/60 dark:hover:bg-[#1A1816] transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F] mb-3">
                            <span className="text-[#641B20] dark:text-[#C89D54] font-semibold">
                              {prog.code} • {prog.degree}
                            </span>
                            <span>{prog.duration}</span>
                          </div>

                          <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
                            B.E. in {prog.name}
                          </h3>
                          <p className="mt-2.5 text-sm text-[#5A534A] dark:text-[#A39B8F] leading-relaxed">
                            {prog.overview}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-[#D8D0C2] dark:border-[#2A2622] flex flex-wrap items-center justify-between gap-3">
                          <button
                            onClick={() => {
                              setActiveView({ type: 'department', payload: prog });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.13em] text-[#181615] dark:text-[#F3EFE6] hover:text-[#641B20] dark:hover:text-[#C89D54] cursor-pointer"
                          >
                            <Building2 className="w-3.5 h-3.5 text-[#641B20] dark:text-[#C89D54]" />
                            <span>Department Template</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setActiveView({ type: 'programme', payload: prog });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EBE5D8] dark:bg-[#24211E] hover:bg-[#641B20] hover:text-[#F5F1E9] text-xs font-mono uppercase tracking-[0.13em] transition-colors cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Programme Detail</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 2: 3 POSTGRADUATE PROGRAMMES (M.Tech, MBA, MCA) */}
                {programmeTab === 'pg' && (
                  <div className="border-t border-l border-[#D8D0C2] dark:border-[#2A2622] grid grid-cols-1 lg:grid-cols-3">
                    {PG_PROGRAMMES.map((prog) => (
                      <div
                        key={prog.id}
                        className="border-r border-b border-[#D8D0C2] dark:border-[#2A2622] p-6 sm:p-8 flex flex-col justify-between bg-[#F5F1E9] dark:bg-[#11100E] hover:bg-[#EBE5D8]/60 dark:hover:bg-[#1A1816] transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54] mb-3">
                            <span>{prog.code} • {prog.degree}</span>
                            <span>{prog.duration}</span>
                          </div>
                          <h3 className="font-serif text-3xl font-medium tracking-tight">
                            {prog.name}
                          </h3>
                          <p className="mt-3 text-sm text-[#5A534A] dark:text-[#A39B8F] leading-relaxed">
                            {prog.overview}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-[#D8D0C2] dark:border-[#2A2622] flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              setActiveView({ type: 'department', payload: prog });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xs font-mono uppercase tracking-wider underline cursor-pointer"
                          >
                            Department Page
                          </button>
                          <button
                            onClick={() => {
                              setActiveView({ type: 'programme', payload: prog });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#641B20] text-[#F5F1E9] text-xs font-mono uppercase tracking-wider cursor-pointer"
                          >
                            <span>Programme Detail</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: 10 VTU-RECOGNISED RESEARCH CENTRES */}
                {programmeTab === 'research' && (
                  <div id="research" className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EBE5D8] dark:bg-[#1A1816] border border-[#D8D0C2] dark:border-[#2A2622] p-6 sm:p-8">
                      <div className="lg:col-span-7 space-y-3">
                        <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#641B20] dark:text-[#C89D54]">
                          10 VTU-RECOGNISED RESEARCH CENTRES • ₹3.40 CRORE RESEARCH GRANTS
                        </div>
                        <h3 className="font-serif text-3xl sm:text-4xl font-medium">
                          Doctoral &amp; Sponsored Research Ecosystem
                        </h3>
                        <p className="text-sm sm:text-base text-[#5A534A] dark:text-[#A39B8F] leading-relaxed">
                          With <strong>89 PhD-qualified faculty guides</strong> among 200+ teaching faculty, <strong>₹3.40 crore</strong> in sponsored research funding, and <strong>35+ industry partnerships</strong>, BEC’s 10 VTU-recognised research centres advance applied engineering across North Karnataka.
                        </p>
                      </div>
                      <div className="lg:col-span-5">
                        <ArchivalPhoto
                          photo={BEC_PHOTOS.roboticsLab}
                          aspectClass="aspect-[16/9]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]">
                      {RESEARCH_CENTRES.map((rc) => (
                        <div
                          key={rc.id}
                          onClick={() => {
                            const matchedProg = UG_PROGRAMMES.find((p) =>
                              rc.name.toLowerCase().includes(p.name.split(' ')[0].toLowerCase())
                            ) || UG_PROGRAMMES[0];
                            setActiveView({ type: 'department', payload: matchedProg });
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-6 border-r border-b border-[#D8D0C2] dark:border-[#2A2622] flex items-start justify-between gap-4 hover:bg-[#EBE5D8]/60 dark:hover:bg-[#1A1816] cursor-pointer group"
                        >
                          <div>
                            <div className="font-mono text-xs text-[#641B20] dark:text-[#C89D54]">
                              {rc.code}
                            </div>
                            <h4 className="font-serif text-2xl font-medium mt-1 group-hover:text-[#641B20] dark:group-hover:text-[#C89D54]">
                              {rc.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#5A534A] dark:text-[#A39B8F] mt-1">
                              Focus: {rc.domain}
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 opacity-50 group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ================================================================
                7. PLACEMENTS AT A GLANCE: REAL STATS + RECHARTS (placements.json)
            ================================================================ */}
            <section
              id="placements"
              className="border-b border-[#D8D0C2] dark:border-[#2A2622] py-20 sm:py-28 bg-[#EBE5D8]/55 dark:bg-[#151311]"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D0C2] dark:border-[#2A2622] pb-6 gap-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54] mb-2">
                      SECTION 05 // TRAINING &amp; PLACEMENTS LEDGER (PLACEMENTS.JSON)
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
                      Placements at a Glance (2016–2026)
                    </h2>
                  </div>

                  <button
                    onClick={() => openJsonEditor('placements')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#641B20] text-[#F5F1E9] font-mono text-xs uppercase tracking-[0.13em] cursor-pointer self-start"
                  >
                    <FileJson className="w-4 h-4 text-[#C89D54]" />
                    <span>Edit placements.json Live</span>
                  </button>
                </div>

                {/* Verified 2025 Batch & 2026 Batch Ledger + Placed Students Photography */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* 2025 & 2026 Batch Exact Cards */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]">
                    {/* 2025 Batch */}
                    <div className="p-6 sm:p-8 border-r border-b border-[#D8D0C2] dark:border-[#2A2622] bg-[#F5F1E9] dark:bg-[#11100E] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54] pb-3 border-b border-[#D8D0C2] dark:border-[#2A2622]">
                          <span>COHORT RECORD // 2025 BATCH</span>
                          <span>VERIFIED</span>
                        </div>

                        <div className="my-6 space-y-5">
                          <div>
                            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F]">
                              TOTAL CORPORATE OFFERS
                            </div>
                            <div className="font-serif text-6xl sm:text-7xl font-semibold text-[#641B20] dark:text-[#C89D54] leading-none mt-1">
                              442
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D8D0C2] dark:border-[#2A2622]">
                            <div>
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[#5A534A] dark:text-[#A39B8F]">
                                ELIGIBLE STUDENTS
                              </div>
                              <div className="font-serif text-3xl font-semibold mt-0.5">
                                494
                              </div>
                            </div>
                            <div>
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[#5A534A] dark:text-[#A39B8F]">
                                STUDENTS PLACED
                              </div>
                              <div className="font-serif text-3xl font-semibold mt-0.5">
                                250
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-[11px] text-[#5A534A] dark:text-[#A39B8F]">
                        2025 Batch: 494 eligible • 250 placed • 442 offers
                      </div>
                    </div>

                    {/* 2026 Batch */}
                    <div className="p-6 sm:p-8 border-r border-b border-[#D8D0C2] dark:border-[#2A2622] bg-[#F5F1E9] dark:bg-[#11100E] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54] pb-3 border-b border-[#D8D0C2] dark:border-[#2A2622]">
                          <span>COHORT RECORD // 2026 BATCH</span>
                          <span>VERIFIED</span>
                        </div>

                        <div className="my-6 space-y-5">
                          <div>
                            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F]">
                              TOTAL CORPORATE OFFERS
                            </div>
                            <div className="font-serif text-6xl sm:text-7xl font-semibold text-[#641B20] dark:text-[#C89D54] leading-none mt-1">
                              450
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D8D0C2] dark:border-[#2A2622]">
                            <div>
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[#5A534A] dark:text-[#A39B8F]">
                                ELIGIBLE STUDENTS
                              </div>
                              <div className="font-serif text-3xl font-semibold mt-0.5">
                                670
                              </div>
                            </div>
                            <div>
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[#5A534A] dark:text-[#A39B8F]">
                                STUDENTS PLACED
                              </div>
                              <div className="font-serif text-3xl font-semibold mt-0.5">
                                332
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-[11px] text-[#5A534A] dark:text-[#A39B8F]">
                        2026 Batch: 670 eligible • 332 placed • 450 offers
                      </div>
                    </div>
                  </div>

                  {/* Real Placed Students 2025 Photo Card */}
                  <div className="lg:col-span-5 flex flex-col justify-between border border-[#D8D0C2] dark:border-[#2A2622] bg-[#F5F1E9] dark:bg-[#11100E] p-5">
                    <ArchivalPhoto
                      photo={BEC_PHOTOS.placedStudents}
                      aspectClass="aspect-[16/10]"
                    />
                    <div className="pt-4 flex items-center justify-between text-xs font-mono">
                      <span className="uppercase tracking-wider text-[#641B20] dark:text-[#C89D54]">
                        35+ ACTIVE INDUSTRY PARTNERSHIPS
                      </span>
                      <span className="text-[#5A534A] dark:text-[#A39B8F]">
                        Photo © Basaveshwar Engineering College
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recharts Year-Wise Offers (2016–2026) & Batch Comparison Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Chart 1: Year-wise Offers 2016-2026 */}
                  <div className="lg:col-span-8 border border-[#D8D0C2] dark:border-[#2A2622] bg-[#F5F1E9] dark:bg-[#11100E] p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                      <div>
                        <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54]">
                          CHRONOLOGICAL OFFERS LEDGER (2016 – 2026)
                        </div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                          Year-Wise Placement Offers &amp; Selections
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] px-2.5 py-1 border border-[#D8D0C2] dark:border-[#2A2622]">
                        SOURCE: placements.json
                      </span>
                    </div>

                    <div className="h-[310px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={placementsData.yearlyOffers} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#2A2622' : '#D8D0C2'} />
                          <XAxis
                            dataKey="year"
                            tick={{ fill: darkMode ? '#A39B8F' : '#5A534A', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                          />
                          <YAxis
                            tick={{ fill: darkMode ? '#A39B8F' : '#5A534A', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? '#1A1816' : '#F5F1E9',
                              borderColor: '#B58942',
                              fontFamily: 'JetBrains Mono',
                              fontSize: '12px'
                            }}
                          />
                          <Bar dataKey="offers" name="Total Offers" fill={darkMode ? '#9E333A' : '#641B20'} radius={[2, 2, 0, 0]} />
                          <Line
                            type="monotone"
                            dataKey="placed"
                            name="Students Placed"
                            stroke="#B58942"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: '#B58942' }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Chart 2: 2025 vs 2026 Batch Breakdown */}
                  <div className="lg:col-span-4 border border-[#D8D0C2] dark:border-[#2A2622] bg-[#F5F1E9] dark:bg-[#11100E] p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54]">
                        COHORT COMPARISON
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-4">
                        2025 vs 2026 Batch Metrics
                      </h3>
                    </div>

                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={placementsData.batchHighlights}
                          margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#2A2622' : '#D8D0C2'} />
                          <XAxis
                            dataKey="batch"
                            tick={{ fill: darkMode ? '#A39B8F' : '#5A534A', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                          />
                          <YAxis
                            tick={{ fill: darkMode ? '#A39B8F' : '#5A534A', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? '#1A1816' : '#F5F1E9',
                              borderColor: '#B58942',
                              fontFamily: 'JetBrains Mono',
                              fontSize: '12px'
                            }}
                          />
                          <Bar dataKey="eligible" name="Eligible" fill="#8C8275" />
                          <Bar dataKey="placed" name="Placed" fill="#B58942" />
                          <Bar dataKey="offers" name="Total Offers" fill="#641B20" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <p className="text-xs font-mono text-[#5A534A] dark:text-[#A39B8F] pt-3 border-t border-[#D8D0C2] dark:border-[#2A2622]">
                      2025: 494 Eligible / 250 Placed / 442 Offers • 2026: 670 Eligible / 332 Placed / 450 Offers
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                8. LIFE AT BEC: FULL-BLEED PHOTO MOSAIC WITH HOVER REVEAL
            ================================================================ */}
            <section
              id="student-life"
              className="border-b border-[#D8D0C2] dark:border-[#2A2622] py-20 sm:py-28"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8D0C2] dark:border-[#2A2622] pb-6">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54] mb-2">
                      SECTION 06 // STUDENT LIFE BEYOND LECTURE HALLS
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
                      50+ Technical &amp; Cultural Clubs, Athletics &amp; Convocation
                    </h2>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F]">
                    3,500+ STUDENTS • 93-ACRE CAMPUS COMMUNITY
                  </div>
                </div>
              </div>

              {/* Full-Bleed Asymmetric Photo Mosaic */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-y border-[#D8D0C2] dark:border-[#2A2622]">
                {/* Mosaic Tile 1: Cultural Fest (cine0157.webp) */}
                <div className="md:col-span-5 relative group overflow-hidden border-b md:border-b-0 md:border-r border-[#D8D0C2] dark:border-[#2A2622] min-h-[420px]">
                  <ArchivalPhoto
                    photo={BEC_PHOTOS.cultural}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181615]/90 via-[#181615]/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-[#F5F1E9]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C89D54]">
                      01 // CULTURAL HERITAGE &amp; FESTIVALS
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-medium mt-1">
                      Annual Cultural Amphitheatre
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#E5DEC9]/85 max-w-md opacity-95 group-hover:opacity-100 transition-opacity">
                      Classical music, folk traditions of North Karnataka, theatre, and literary debates celebrated by 3,500+ students.
                    </p>
                  </div>
                </div>

                {/* Mosaic Tile 2: 50+ Technical & Cultural Clubs (cine1910.webp) */}
                <div className="md:col-span-4 relative group overflow-hidden border-b md:border-b-0 md:border-r border-[#D8D0C2] dark:border-[#2A2622] min-h-[420px]">
                  <ArchivalPhoto
                    photo={BEC_PHOTOS.clubs}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181615]/90 via-[#181615]/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-[#F5F1E9]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C89D54]">
                      02 // 50+ STUDENT CLUBS &amp; CHAPTERS
                    </span>
                    <h3 className="font-serif text-3xl font-medium mt-1">
                      IEEE PES, CIRCUTECH &amp; Societies
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#E5DEC9]/85">
                      Peer-driven robotics guilds, coding chapters, IEEE PES events, and CIRCUTECH 2026 hardware symposiums.
                    </p>
                  </div>
                </div>

                {/* Mosaic Tile 3: Sports & Athletics (cine0040.webp) */}
                <div className="md:col-span-3 relative group overflow-hidden min-h-[420px]">
                  <ArchivalPhoto
                    photo={BEC_PHOTOS.sports}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181615]/90 via-[#181615]/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-[#F5F1E9]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C89D54]">
                      03 // VTU INTER-COLLEGIATE SPORTS
                    </span>
                    <h3 className="font-serif text-3xl font-medium mt-1">
                      93-Acre Athletic Grounds
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#E5DEC9]/85">
                      Expansive outdoor stadiums, track-and-field arenas, and indoor sports complexes across Vidyanagar.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                9. CAMPUS FACILITIES: HOSTELS, LIBRARY, LABS, WI-FI, CANTEENS, ELECTRIC BUGGIES
            ================================================================ */}
            <section
              id="facilities"
              className="border-b border-[#D8D0C2] dark:border-[#2A2622] py-20 sm:py-28"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D0C2] dark:border-[#2A2622] pb-6 mb-12 gap-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54] mb-2">
                      SECTION 07 // CAMPUS INFRASTRUCTURE
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
                      Facilities Across the 93-Acre Campus
                    </h2>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#5A534A] dark:text-[#A39B8F]">
                    HOSTELS • LIBRARY • LABS • WI-FI • CANTEENS • ELECTRIC BUGGIES
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]">
                  {CAMPUS_FACILITIES.map((fac) => (
                    <div
                      key={fac.id}
                      className="border-r border-b border-[#D8D0C2] dark:border-[#2A2622] p-6 sm:p-8 flex flex-col justify-between bg-[#F5F1E9] dark:bg-[#11100E]"
                    >
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#641B20] dark:text-[#C89D54] mb-4">
                          <span>INFRASTRUCTURE // {fac.index}</span>
                          <span>{fac.tag}</span>
                        </div>

                        <ArchivalPhoto
                          photo={fac.photo}
                          aspectClass="aspect-[16/9]"
                          className="mb-6"
                        />

                        <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                          {fac.title}
                        </h3>
                        <p className="mt-2.5 text-sm sm:text-base text-[#5A534A] dark:text-[#A39B8F] leading-relaxed">
                          {fac.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        )}

        {/* ====================================================================
            10. FOOTER WITH ALL REQUIRED LINKS, SOCIALS, CREDITS & BAGALKOTE MAP
        ==================================================================== */}
        <footer
          id="footer-contact"
          className="bg-[#181615] text-[#F5F1E9] border-t border-[#2A2622]"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F5F1E9]/15">
              {/* Column 1: Institutional Identity & Coordinates */}
              <div className="lg:col-span-4 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 border border-[#C89D54] bg-[#641B20] flex items-center justify-center font-serif text-xl font-semibold text-[#F5F1E9]">
                    BEC
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C89D54]">
                      B.V.V. SANGHA INSTITUTION • ESTD 1963
                    </div>
                    <div className="font-serif text-2xl font-medium">
                      Basaveshwar Engineering College
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#E5DEC9]/80 leading-relaxed">
                  Government-aided, AICTE-recognised, NAAC ‘A’ grade, NBA accredited institution permanently affiliated to Visvesvaraya Technological University (VTU), Belagavi.
                </p>

                <div className="space-y-2 pt-2 font-mono text-xs text-[#E5DEC9]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C89D54] shrink-0 mt-0.5" />
                    <span>S. Nijalingappa Vidyanagar, Bagalkote – 587 102, Karnataka</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#C89D54] shrink-0" />
                    <a href="tel:+917618781963" className="hover:text-[#C89D54]">
                      +91 76187 81963
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#C89D54] shrink-0" />
                    <a href="mailto:becprincipal@yahoo.com" className="hover:text-[#C89D54]">
                      becprincipal@yahoo.com
                    </a>
                  </div>
                </div>

                {/* Official Social Handles */}
                <div className="pt-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C89D54] mb-2">
                    OFFICIAL SOCIAL CHANNELS
                  </div>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    <a
                      href="https://facebook.com/BEC1963"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-[#F5F1E9]/20 hover:border-[#C89D54] text-[#E5DEC9]"
                    >
                      Facebook: BEC1963
                    </a>
                    <a
                      href="https://x.com/1963Bec"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-[#F5F1E9]/20 hover:border-[#C89D54] text-[#E5DEC9]"
                    >
                      X: @1963Bec
                    </a>
                    <a
                      href="https://instagram.com/becbgk_official"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-[#F5F1E9]/20 hover:border-[#C89D54] text-[#E5DEC9]"
                    >
                      Instagram: becbgk_official
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-[#F5F1E9]/20 hover:border-[#C89D54] text-[#E5DEC9]"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 2: Navigation & Required Footer Portals */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#C89D54] mb-4">
                    INFORMATION ARCHITECTURE
                  </div>
                  <ul className="space-y-2 text-xs font-mono uppercase tracking-[0.12em]">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.label}>
                        <button
                          onClick={() => navigateToSection(item.target)}
                          className="text-[#E5DEC9]/80 hover:text-[#C89D54] cursor-pointer"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#C89D54] mb-4">
                    PORTALS &amp; STATUTORY LINKS
                  </div>
                  <ul className="space-y-2 text-xs font-mono uppercase tracking-[0.12em]">
                    {FOOTER_LINKS.map((link) => (
                      <li key={link.label}>
                        {link.href ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[#E5DEC9]/80 hover:text-[#C89D54]"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            onClick={() => navigateToSection(link.action)}
                            className="text-[#E5DEC9]/80 hover:text-[#C89D54] cursor-pointer"
                          >
                            {link.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: Bagalkote Campus Map & Spatial Coordinates */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.15em] text-[#C89D54]">
                  <span>CAMPUS LOCATION // BAGALKOTE</span>
                  <span>93 ACRES</span>
                </div>

                <div className="border border-[#F5F1E9]/20 bg-[#11100E] overflow-hidden">
                  <iframe
                    title="Map of Basaveshwar Engineering College, S. Nijalingappa Vidyanagar, Bagalkote"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=75.6440%2C16.1670%2C75.6680%2C16.1830&layer=mapnik&marker=16.1754%2C75.6558"
                    className="w-full h-56 grayscale contrast-125 opacity-90"
                    loading="lazy"
                  />
                  <div className="p-3.5 border-t border-[#F5F1E9]/15 flex items-center justify-between text-[11px] font-mono text-[#E5DEC9]">
                    <span>S. Nijalingappa Vidyanagar, Bagalkote – 587 102</span>
                    <a
                      href="https://www.openstreetmap.org/?mlat=16.1754&mlon=75.6558#map=16/16.1754/75.6558"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#C89D54] underline"
                    >
                      Open Map ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Photo Credit & Copyright Row */}
            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#E5DEC9]/70">
              <div>
                © {new Date().getFullYear()} B.V.V. Sangha’s Basaveshwar Engineering College, Bagalkote. All rights reserved.
              </div>
              <div className="text-[#C89D54]">
                Archival &amp; Campus Photography Credit: Basaveshwar Engineering College
              </div>
            </div>
          </div>
        </footer>

        {/* ====================================================================
            LIVE JSON EDITOR DRAWER (placements.json & news.json)
        ==================================================================== */}
        {jsonDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-[#181615]/80 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-2xl bg-[#F5F1E9] dark:bg-[#1A1816] text-[#181615] dark:text-[#F3EFE6] h-full flex flex-col border-l border-[#D8D0C2] dark:border-[#2A2622] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#D8D0C2] dark:border-[#2A2622] pb-4">
                <div className="flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-[#641B20] dark:text-[#C89D54]" />
                  <h3 className="font-serif text-2xl font-medium">
                    Live Data Editor (`placements.json` &amp; `news.json`)
                  </h3>
                </div>
                <button
                  onClick={() => setJsonDrawerOpen(false)}
                  className="p-1.5 border border-current/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2 my-4">
                <button
                  onClick={() => {
                    setActiveJsonTab('placements');
                    setJsonEditorText(JSON.stringify(placementsData, null, 2));
                    setJsonError(null);
                  }}
                  className={`px-4 py-2 font-mono text-xs uppercase cursor-pointer ${
                    activeJsonTab === 'placements'
                      ? 'bg-[#641B20] text-[#F5F1E9]'
                      : 'border border-current/20'
                  }`}
                >
                  placements.json (2016–2026)
                </button>
                <button
                  onClick={() => {
                    setActiveJsonTab('news');
                    setJsonEditorText(JSON.stringify(newsData, null, 2));
                    setJsonError(null);
                  }}
                  className={`px-4 py-2 font-mono text-xs uppercase cursor-pointer ${
                    activeJsonTab === 'news'
                      ? 'bg-[#641B20] text-[#F5F1E9]'
                      : 'border border-current/20'
                  }`}
                >
                  news.json (Announcements)
                </button>
              </div>

              <p className="text-xs text-[#5A534A] dark:text-[#A39B8F] mb-3">
                Modify the JSON below and click <strong>Apply &amp; Re-render</strong> to immediately update the Recharts visualizations or announcement cards on the site.
              </p>

              <textarea
                value={jsonEditorText}
                onChange={(e) => setJsonEditorText(e.target.value)}
                className="flex-1 w-full font-mono text-xs p-4 bg-[#181615] text-[#F5F1E9] border border-[#B58942]/40 focus:outline-none"
                spellCheck="false"
              />

              {jsonError && (
                <div className="mt-3 p-3 bg-[#641B20] text-[#F5F1E9] font-mono text-xs">
                  JSON Error: {jsonError}
                </div>
              )}

              <div className="pt-4 mt-4 border-t border-[#D8D0C2] dark:border-[#2A2622] flex items-center justify-between">
                <button
                  onClick={() => {
                    if (activeJsonTab === 'placements') {
                      setPlacementsData(INITIAL_PLACEMENTS_JSON);
                      setJsonEditorText(JSON.stringify(INITIAL_PLACEMENTS_JSON, null, 2));
                    } else {
                      setNewsData(INITIAL_NEWS_JSON);
                      setJsonEditorText(JSON.stringify(INITIAL_NEWS_JSON, null, 2));
                    }
                  }}
                  className="text-xs font-mono uppercase underline cursor-pointer"
                >
                  Reset to Default Verified Data
                </button>
                <button
                  onClick={handleApplyJsonChanges}
                  className="px-6 py-2.5 bg-[#641B20] text-[#F5F1E9] font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  Apply &amp; Re-render
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            ADMISSIONS 2026–27 MODAL
        ==================================================================== */}
        {admissionsModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#181615]/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-[#F5F1E9] dark:bg-[#1A1816] text-[#181615] dark:text-[#F3EFE6] border border-[#B58942] p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-[#D8D0C2] dark:border-[#2A2622] pb-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54]">
                    B.V.V. SANGHA’S BASAVESHWAR ENGINEERING COLLEGE
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-medium mt-1">
                    Admissions Open for A.Y. 2026–27
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setAdmissionsModalOpen(false);
                    setAdmissionSubmitted(false);
                  }}
                  className="p-2 border border-current/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {admissionSubmitted ? (
                <div className="p-6 border border-[#641B20] bg-[#EBE5D8] dark:bg-[#11100E] space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#641B20] dark:text-[#C89D54]">
                    ENQUIRY RECORDED // ADMISSIONS DESK 2026–27
                  </div>
                  <h4 className="font-serif text-2xl font-medium">
                    Thank you for your interest in Basaveshwar Engineering College, Bagalkote.
                  </h4>
                  <p className="text-sm text-[#5A534A] dark:text-[#A39B8F]">
                    Our Admissions Office at S. Nijalingappa Vidyanagar, Bagalkote – 587 102 (+91 76187 81963 / becprincipal@yahoo.com) will reach out with prospectus and counselling schedule details.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAdmissionSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <p className="text-xs sm:text-sm text-[#5A534A] dark:text-[#A39B8F]">
                    Government-aided • AICTE-recognised • NAAC ‘A’ grade • NBA accredited • Permanently affiliated to VTU Belagavi. Select your programme of interest for A.Y. 2026–27:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase mb-1">
                        Applicant Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Enter full name"
                        className="w-full px-3 py-2.5 bg-transparent border border-[#D8D0C2] dark:border-[#2A2622] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91"
                        className="w-full px-3 py-2.5 bg-transparent border border-[#D8D0C2] dark:border-[#2A2622] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase mb-1">
                      Programme Stream (10 UG / 3 PG / 10 Research Centres) *
                    </label>
                    <select className="w-full px-3 py-2.5 bg-[#F5F1E9] dark:bg-[#11100E] border border-[#D8D0C2] dark:border-[#2A2622] text-sm">
                      <optgroup label="10 Undergraduate Programmes (B.E.)">
                        {UG_PROGRAMMES.map((u) => (
                          <option key={u.id} value={u.name}>
                            B.E. in {u.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="3 Postgraduate Programmes">
                        {PG_PROGRAMMES.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Doctoral Research">
                        <option value="PhD">VTU-Recognised Ph.D. Research Centre (10 Centres)</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#5A534A] dark:text-[#A39B8F]">
                      Helpline: +91 76187 81963
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#641B20] text-[#F5F1E9] font-mono text-xs uppercase tracking-[0.14em] cursor-pointer"
                    >
                      Request 2026–27 Prospectus
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ====================================================================
            NEXT.JS (APP ROUTER) + TYPESCRIPT + TAILWIND FOLDER STRUCTURE & README MODAL
        ==================================================================== */}
        {nextjsModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#181615]/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-[#181615] text-[#F5F1E9] border border-[#B58942] p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-[#F5F1E9]/15 pb-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#C89D54]">
                    DELIVERABLE ARCHITECTURE // NEXT.JS 15 APP ROUTER + TYPESCRIPT + TAILWIND
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
                    Project Folder Structure &amp; Deployment README
                  </h3>
                </div>
                <button
                  onClick={() => setNextjsModalOpen(false)}
                  className="p-2 border border-[#F5F1E9]/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <pre className="p-4 bg-[#11100E] border border-[#2A2622] font-mono text-xs text-[#E5DEC9] overflow-x-auto leading-relaxed">
{`bec-bagalkote-official/
├── README.md
├── next.config.mjs                 # R2 WebP remotePatterns + AVIF optimization
├── package.json                    # next, react, three, @react-three/fiber, gsap, lenis, recharts
├── tailwind.config.ts              # Heritage Maroon (#641B20), Stone (#F5F1E9), Sandstone Gold (#B58942)
├── data/
│   ├── placements.json             # Editable 2016–2026 offers + 2025 & 2026 batch records
│   ├── news.json                   # Editable dispatches (16th Graduation Day, Admissions 2026–27, etc.)
│   └── programmes.json             # 10 UG, 3 PG (M.Tech, MBA, MCA), 10 VTU Research Centres
└── src/
    ├── app/
    │   ├── layout.tsx              # Cormorant Garamond + Plus Jakarta Sans + JetBrains Mono + OpenGraph SEO
    │   ├── page.tsx                # 10-Section Institutional Monograph Homepage
    │   ├── departments/[slug]/
    │   │   └── page.tsx            # Department Inner-Page Template
    │   ├── programmes/[id]/
    │   │   └── page.tsx            # Programme Detail Inner-Page Template
    │   └── news/[id]/
    │       └── page.tsx            # News Article Inner-Page Template
    └── components/
        ├── three/
        │   └── CampusReliefHero.tsx # React Three Fiber / Three.js Depth-Map Shader + 1963 Scroll Mask
        ├── charts/
        │   └── PlacementsLedger.tsx # Recharts ComposedChart & Batch Comparison
        └── editorial/
            ├── Preloader.tsx
            ├── VisionMissionPin.tsx
            └── ArchivalPhoto.tsx

# RUN STEPS (VERCEL DEPLOYABLE)
1. npm install
2. npm run dev      # Starts Next.js App Router on http://localhost:3000
3. npm run build    # Static + SSR production build for Vercel`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// INNER-PAGE TEMPLATES COMPONENT:
// 1. Department Page Template
// 2. Programme Detail Template
// 3. News Article Template
// ============================================================================
function InnerPageTemplateView({ activeView, setActiveView, newsData, onOpenAdmissions }) {
  const { type, payload } = activeView;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* Breadcrumb & Back Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8D0C2] dark:border-[#2A2622] pb-6 mb-10">
        <button
          onClick={() => setActiveView({ type: 'home', payload: null })}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#181615]/25 dark:border-[#F3EFE6]/25 hover:bg-[#641B20] hover:text-[#F5F1E9] font-mono text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to BEC Main Monograph</span>
        </button>

        <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#641B20] dark:text-[#C89D54]">
          INNER-PAGE TEMPLATE // {type.toUpperCase()}
        </div>
      </div>

      {/* TEMPLATE A: DEPARTMENT INNER-PAGE */}
      {type === 'department' && payload && (
        <article className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#D8D0C2] dark:border-[#2A2622] pb-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54]">
                DEPARTMENT MONOGRAPH • {payload.accreditation}
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight">
                Department of {payload.name}
              </h1>
              <p className="text-base sm:text-lg text-[#5A534A] dark:text-[#A39B8F] leading-relaxed max-w-3xl">
                {payload.overview}
              </p>
            </div>
            <div className="lg:col-span-4 border border-[#D8D0C2] dark:border-[#2A2622] p-5 bg-[#EBE5D8]/60 dark:bg-[#1A1816] font-mono text-xs space-y-2">
              <div className="text-[#641B20] dark:text-[#C89D54] font-semibold">
                RESEARCH &amp; ACCREDITATION
              </div>
              <div>Research Status: {payload.researchCentre}</div>
              <div>Affiliation: Permanently Affiliated to VTU Belagavi</div>
              <div>Institutional Faculty: 200+ (89 with PhDs)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl font-medium">
                Departmental Laboratories &amp; Studios
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]">
                {(payload.labs || []).map((lab, i) => (
                  <div
                    key={i}
                    className="p-5 border-r border-b border-[#D8D0C2] dark:border-[#2A2622] bg-[#F5F1E9] dark:bg-[#11100E]"
                  >
                    <div className="font-mono text-[10px] text-[#641B20] dark:text-[#C89D54]">
                      LAB // 0{i + 1}
                    </div>
                    <div className="font-serif text-xl font-medium mt-1">{lab}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveView({ type: 'programme', payload })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#641B20] text-[#F5F1E9] font-mono text-xs uppercase tracking-[0.14em] cursor-pointer"
                >
                  <span>Inspect {payload.degree} Curriculum &amp; Programme Detail</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ArchivalPhoto photo={BEC_PHOTOS.roboticsLab} aspectClass="aspect-[4/3]" />
            </div>
          </div>
        </article>
      )}

      {/* TEMPLATE B: PROGRAMME DETAIL INNER-PAGE */}
      {type === 'programme' && payload && (
        <article className="space-y-12">
          <div className="border-b border-[#D8D0C2] dark:border-[#2A2622] pb-10 space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#641B20] dark:text-[#C89D54]">
              PROGRAMME SPECIFICATION // {payload.code} • {payload.duration}
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight">
              {payload.degree} in {payload.name}
            </h1>
            <p className="text-base sm:text-lg text-[#5A534A] dark:text-[#A39B8F] max-w-3xl leading-relaxed">
              {payload.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#D8D0C2] dark:border-[#2A2622]">
            <div className="p-6 border-r border-b border-[#D8D0C2] dark:border-[#2A2622]">
              <div className="font-mono text-xs uppercase text-[#641B20] dark:text-[#C89D54]">
                DURATION &amp; AFFILIATION
              </div>
              <div className="font-serif text-2xl font-medium mt-1">{payload.duration}</div>
              <p className="text-xs text-[#5A534A] dark:text-[#A39B8F] mt-1">
                Permanently affiliated to VTU Belagavi • AICTE Recognised • NAAC ‘A’ Grade
              </p>
            </div>
            <div className="p-6 border-r border-b border-[#D8D0C2] dark:border-[#2A2622]">
              <div className="font-mono text-xs uppercase text-[#641B20] dark:text-[#C89D54]">
                RESEARCH INTEGRATION
              </div>
              <div className="font-serif text-2xl font-medium mt-1">{payload.researchCentre}</div>
              <p className="text-xs text-[#5A534A] dark:text-[#A39B8F] mt-1">
                Part of BEC’s ₹3.40 crore funded research ecosystem &amp; 35+ industry partnerships
              </p>
            </div>
            <div className="p-6 border-r border-b border-[#D8D0C2] dark:border-[#2A2622]">
              <div className="font-mono text-xs uppercase text-[#641B20] dark:text-[#C89D54]">
                CAREER PATHWAYS
              </div>
              <div className="font-serif text-2xl font-medium mt-1">
                442 Offers (2025) • 450 Offers (2026)
              </div>
              <p className="text-xs text-[#5A534A] dark:text-[#A39B8F] mt-1">
                Dedicated Training &amp; Placement preparation including Quant Edge workshops
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onOpenAdmissions}
              className="px-6 py-3 bg-[#641B20] text-[#F5F1E9] font-mono text-xs uppercase tracking-[0.14em] cursor-pointer"
            >
              Apply for A.Y. 2026–27 Admission
            </button>
            <button
              onClick={() => setActiveView({ type: 'department', payload })}
              className="px-6 py-3 border border-current/25 font-mono text-xs uppercase tracking-[0.14em] cursor-pointer"
            >
              View Host Department Template
            </button>
          </div>
        </article>
      )}

      {/* TEMPLATE C: NEWS ARTICLE INNER-PAGE */}
      {type === 'news-article' && payload && (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-[#641B20] dark:text-[#C89D54]">
              <span>{payload.category}</span>
              <span>•</span>
              <span>{payload.date}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-tight">
              {payload.title}
            </h1>

            <div className="font-mono text-xs text-[#5A534A] dark:text-[#A39B8F]">
              ISSUED BY: {payload.department} • BASAVESHWAR ENGINEERING COLLEGE, BAGALKOTE
            </div>

            <ArchivalPhoto
              photo={BEC_PHOTOS[payload.imageKey] || BEC_PHOTOS.campusFront}
              aspectClass="aspect-[16/9]"
            />

            <div className="space-y-4 text-base sm:text-lg leading-relaxed pt-2">
              {(payload.body || [payload.summary]).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-[#D8D0C2] dark:border-[#2A2622] pt-8 lg:pt-0 lg:pl-8">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#641B20] dark:text-[#C89D54]">
              OTHER OFFICIAL DISPATCHES (NEWS.JSON)
            </div>
            <div className="divide-y divide-[#D8D0C2] dark:divide-[#2A2622]">
              {newsData.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveView({ type: 'news-article', payload: n })}
                  className="w-full text-left py-3.5 hover:text-[#641B20] dark:hover:text-[#C89D54] cursor-pointer"
                >
                  <div className="font-mono text-[10px] text-[#5A534A] dark:text-[#A39B8F]">
                    {n.date} // {n.category}
                  </div>
                  <div className="font-serif text-xl font-medium mt-0.5">{n.title}</div>
                </button>
              ))}
            </div>
          </aside>
        </article>
      )}
    </div>
  );
}