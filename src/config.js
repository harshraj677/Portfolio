// 📝 CUSTOMIZATION GUIDE
// Replace these values with your own information

export const PERSONAL_INFO = {
  name: "Harsh Raj",
  title: "MERN Stack Developer | CSE Student | Innovator",
  tagline: "Transforming ideas into interactive digital realities.",
  email: "harshraj@gmail.com",
  location: "India",
  college: "PES Institute of Technology and Management",
  
  // Social Links - Update with your actual profiles
  social: {
    github: "https://github.com/harshraj",
    linkedin: "https://linkedin.com/in/harshraj",
    twitter: "https://twitter.com/harshraj",
    instagram: "https://instagram.com/harshraj"
  },
  
  // Hero Section Stats
  stats: {
    projects: "15+",
    technologies: "5+",
    achievements: "10+"
  }
}

export const ABOUT_ME = {
  description: [
    "Hello! I'm Harsh Raj, a passionate Computer Science Engineering student at PES Institute of Technology and Management.",
    "I specialize in MERN Stack Development, creating dynamic and responsive web applications. My journey in tech has been driven by curiosity and a desire to build solutions that make a difference.",
    "Beyond coding, I'm exploring AI & Machine Learning, participating in hackathons, and serving as an Anveasana Student Ambassador, helping bridge innovation and education."
  ],
  badges: [
    "MERN Stack Developer",
    "AI & ML Learner", 
    "Anveasana Ambassador",
    "Problem Solver"
  ]
}

export const SKILLS = {
  frontend: [
    { name: 'React.js', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Tailwind CSS', level: 88 }
  ],
  backend: [
    { name: 'Node.js', level: 82 },
    { name: 'Express.js', level: 80 },
    { name: 'MongoDB', level: 78 }
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'Python', level: 75 }
  ],
  additional: ['HTML5', 'CSS3', 'REST APIs', 'Postman', 'VS Code', 'GitHub', 'Figma', 'AI Tools']
}

export const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack MERN e-commerce application with payment integration, admin dashboard, and real-time inventory management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    liveLink: '#', // Update with actual link
    githubLink: '#', // Update with actual repo
    features: ['Payment Gateway', 'Admin Panel', 'Cart Management', 'Order Tracking']
  },
  // Add more projects...
]

export const EXPERIENCE = [
  {
    type: 'work',
    title: 'Anveasana Student Ambassador',
    organization: 'Anveasana Platform',
    duration: '2024 - Present',
    description: 'Representing the platform at college level, organizing events, and promoting innovative learning initiatives among students.',
    skills: ['Leadership', 'Event Management', 'Communication']
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science Engineering',
    organization: 'PES Institute of Technology and Management',
    duration: '2022 - 2026',
    description: 'Pursuing Computer Science Engineering with focus on full-stack development, data structures, algorithms, and AI/ML.',
    skills: ['DSA', 'MERN Stack', 'AI/ML', 'Software Engineering']
  },
  // Add more experiences...
]

// 📧 EMAIL JS CONFIGURATION
// Sign up at https://www.emailjs.com/ and add your credentials
export const EMAILJS_CONFIG = {
  serviceId: 'service_50mn4th',
  templateId: 'template_svhhre8',
  publicKey: 'N4x7EQ9nFvFViVyeP'
}

// 🎨 THEME COLORS (Edit tailwind.config.js for custom colors)
export const THEME = {
  primary: '#0ea5e9', // Cyan/Blue
  accent: '#a855f7',  // Purple
  dark: '#0a0d14'     // Dark background
}

// 📝 SEO & META INFO (Update in index.html)
export const SEO = {
  title: "Harsh Raj - MERN Stack Developer | Portfolio",
  description: "Professional portfolio showcasing web development projects and achievements",
  keywords: "Harsh Raj, MERN Stack, Web Developer, React, Node.js, Portfolio, CSE Student",
  ogImage: "/og-image.jpg" //YOUR_TEM Add your OG image to public folder
}
