export const categories = [
  { id: 'all', name: 'All Programs' },
  { id: 'development', name: 'Development' },
  { id: 'data-ai', name: 'Data & AI' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'cloud', name: 'Cloud & DevOps' },
  { id: 'business', name: 'Business' },
]

export const programs = [
  {
    id: 'web-development',
    title: 'Full Stack Web Development',
    shortDescription: 'Master modern web technologies including React, Node.js, and more.',
    description: `Become a complete web developer with our comprehensive Full Stack Web Development program. This intensive course covers everything from HTML, CSS, and JavaScript fundamentals to advanced React.js frontend development and Node.js backend architecture.

You'll build real-world projects, work with databases like MongoDB and PostgreSQL, learn RESTful API design, and deploy applications to cloud platforms. Our industry-expert mentors will guide you through modern development practices, version control with Git, and agile methodologies.

By the end of this program, you'll have a portfolio of production-ready projects and the skills to land your dream job in tech.`,
    duration: '12 Weeks',
    level: 'Beginner to Advanced',
    price: 49999,
    originalPrice: 79999,
    category: 'development',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'HTML/CSS', 'Git', 'REST APIs'],
    features: [
      '60+ hours of video content',
      '15 real-world projects',
      'Live mentorship sessions',
      'Career guidance & resume review',
      'Industry-recognized certificate',
      'Lifetime access to materials'
    ],
    instructor: {
      name: 'Alex Thompson',
      title: 'Senior Software Engineer at Google',
      experience: '10+ years'
    },
    rating: 4.9,
    students: 2450,
    image: 'web-dev',
    color: 'primary'
  },
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    shortDescription: 'Learn Python, machine learning, and data visualization to become a data expert.',
    description: `Unlock the power of data with our comprehensive Data Science program. You'll master Python programming, statistical analysis, and machine learning algorithms used by leading tech companies.

This program covers data wrangling with Pandas, visualization with Matplotlib and Seaborn, machine learning with Scikit-learn, and deep learning fundamentals with TensorFlow. You'll work on real datasets from various industries including finance, healthcare, and e-commerce.

Our expert instructors from top tech companies will teach you to extract insights, build predictive models, and communicate findings effectively to stakeholders.`,
    duration: '16 Weeks',
    level: 'Intermediate',
    price: 59999,
    originalPrice: 99999,
    category: 'data-ai',
    skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL', 'TensorFlow', 'Statistics', 'Pandas', 'NumPy'],
    features: [
      '80+ hours of video content',
      '20 hands-on projects',
      'Real-world datasets',
      'Kaggle competition guidance',
      'Interview preparation',
      'Job placement assistance'
    ],
    instructor: {
      name: 'Dr. Sarah Chen',
      title: 'Data Science Lead at Microsoft',
      experience: '12+ years'
    },
    rating: 4.8,
    students: 1890,
    image: 'data-science',
    color: 'secondary'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Mastery',
    shortDescription: 'Create stunning user interfaces and seamless experiences using industry tools.',
    description: `Transform your creative vision into beautiful, functional designs with our UI/UX Design Mastery program. Learn the complete design process from user research and wireframing to high-fidelity prototypes and design systems.

Master industry-standard tools like Figma, Adobe XD, and Sketch. Understand user psychology, accessibility principles, and design thinking methodologies that drive successful products.

You'll build a professional portfolio with projects spanning mobile apps, web applications, and enterprise software, preparing you for roles at top design studios and tech companies.`,
    duration: '10 Weeks',
    level: 'All Levels',
    price: 44999,
    originalPrice: 69999,
    category: 'design',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility', 'UI Animation'],
    features: [
      '50+ hours of content',
      '12 portfolio projects',
      'Design system creation',
      'Figma certification prep',
      'Portfolio review sessions',
      'Design community access'
    ],
    instructor: {
      name: 'Emily Rodriguez',
      title: 'Principal Designer at Apple',
      experience: '8+ years'
    },
    rating: 4.9,
    students: 1650,
    image: 'ui-ux',
    color: 'accent'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Pro',
    shortDescription: 'Master SEO, social media, and content marketing strategies for the digital age.',
    description: `Become a digital marketing expert with our comprehensive program covering all aspects of modern marketing. Learn to create data-driven campaigns that deliver measurable results across multiple channels.

Master search engine optimization (SEO), pay-per-click advertising (PPC), social media marketing, email marketing, and content strategy. Understand analytics tools like Google Analytics 4, Meta Business Suite, and marketing automation platforms.

Our instructors bring real-world experience from leading agencies and brands, teaching you practical strategies that work in today's competitive landscape.`,
    duration: '8 Weeks',
    level: 'Beginner',
    price: 34999,
    originalPrice: 54999,
    category: 'marketing',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Email Marketing', 'Analytics', 'Copywriting', 'Marketing Automation'],
    features: [
      '40+ hours of content',
      'Live campaign exercises',
      'Google certifications prep',
      'Real client projects',
      'Marketing toolkit access',
      'Industry networking events'
    ],
    instructor: {
      name: 'James Wilson',
      title: 'CMO at Growth Labs',
      experience: '15+ years'
    },
    rating: 4.7,
    students: 2100,
    image: 'marketing',
    color: 'primary'
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing & AWS',
    shortDescription: 'Get certified in AWS and learn to deploy and manage cloud infrastructure.',
    description: `Master cloud computing with our AWS-focused program designed to prepare you for the most in-demand cloud certifications. Learn to architect, deploy, and manage scalable applications on Amazon Web Services.

Cover core AWS services including EC2, S3, RDS, Lambda, and more. Understand cloud security, networking, and cost optimization strategies used by enterprise organizations.

This program includes hands-on labs, real-world scenarios, and exam preparation materials for AWS Solutions Architect and Developer certifications.`,
    duration: '14 Weeks',
    level: 'Intermediate',
    price: 54999,
    originalPrice: 84999,
    category: 'cloud',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    features: [
      '70+ hours of content',
      'AWS sandbox environment',
      'Certification exam voucher',
      'Practice exams included',
      'Real infrastructure projects',
      'DevOps tool mastery'
    ],
    instructor: {
      name: 'Michael Park',
      title: 'Cloud Architect at Amazon',
      experience: '11+ years'
    },
    rating: 4.8,
    students: 1420,
    image: 'cloud',
    color: 'secondary'
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    shortDescription: 'Build cross-platform mobile apps with React Native and Flutter frameworks.',
    description: `Create stunning mobile applications for iOS and Android with our comprehensive Mobile Development program. Learn both React Native and Flutter to maximize your career opportunities.

Build apps with native performance, implement complex features like push notifications, offline storage, and in-app purchases. Understand mobile UI patterns, app store optimization, and deployment processes.

Graduate with published apps in both app stores and the skills to build any mobile application from concept to launch.`,
    duration: '12 Weeks',
    level: 'Intermediate',
    price: 47999,
    originalPrice: 74999,
    category: 'development',
    skills: ['React Native', 'Flutter', 'Dart', 'Mobile UI', 'API Integration', 'App Store Deployment', 'Firebase', 'State Management'],
    features: [
      '55+ hours of content',
      '8 complete app projects',
      'App store publishing guide',
      'Code review sessions',
      'Performance optimization',
      'Monetization strategies'
    ],
    instructor: {
      name: 'David Kim',
      title: 'Mobile Lead at Meta',
      experience: '9+ years'
    },
    rating: 4.8,
    students: 1780,
    image: 'mobile',
    color: 'accent'
  },
  {
    id: 'artificial-intelligence',
    title: 'AI & Deep Learning',
    shortDescription: 'Master neural networks, NLP, and computer vision for cutting-edge AI applications.',
    description: `Dive deep into artificial intelligence with our advanced program covering neural networks, natural language processing, and computer vision. Build AI systems that solve real-world problems.

Learn deep learning frameworks like TensorFlow and PyTorch, understand transformer architectures, and implement state-of-the-art models. Work on projects including image recognition, chatbots, and recommendation systems.

This program is designed for those ready to push the boundaries of what's possible with AI and machine learning.`,
    duration: '18 Weeks',
    level: 'Advanced',
    price: 74999,
    originalPrice: 119999,
    category: 'data-ai',
    skills: ['Deep Learning', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Neural Networks', 'GPT/LLMs', 'MLOps'],
    features: [
      '100+ hours of content',
      'GPU cloud access included',
      'Research paper implementations',
      'AI ethics coverage',
      'Industry mentorship',
      'Capstone project showcase'
    ],
    instructor: {
      name: 'Dr. Priya Sharma',
      title: 'AI Research Lead at OpenAI',
      experience: '14+ years'
    },
    rating: 4.9,
    students: 920,
    image: 'ai',
    color: 'primary'
  },
  {
    id: 'product-management',
    title: 'Product Management',
    shortDescription: 'Learn to build products users love with strategic thinking and execution skills.',
    description: `Become a product leader with our comprehensive Product Management program. Learn the frameworks, tools, and mindset needed to drive successful products from ideation to launch.

Master product discovery, user research, roadmap planning, and stakeholder management. Understand metrics-driven decision making, A/B testing, and agile product development methodologies.

Learn from product leaders at top tech companies and build a portfolio of product cases that demonstrate your strategic thinking.`,
    duration: '10 Weeks',
    level: 'All Levels',
    price: 49999,
    originalPrice: 79999,
    category: 'business',
    skills: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile/Scrum', 'Data Analysis', 'Stakeholder Management', 'PRDs', 'Go-to-Market'],
    features: [
      '45+ hours of content',
      'Real product case studies',
      'Mock PM interviews',
      'Product analytics tools',
      'Networking with PMs',
      'Portfolio building'
    ],
    instructor: {
      name: 'Lisa Chang',
      title: 'VP Product at Airbnb',
      experience: '13+ years'
    },
    rating: 4.7,
    students: 1340,
    image: 'product',
    color: 'secondary'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Fundamentals',
    shortDescription: 'Protect systems and data with essential security skills and ethical hacking.',
    description: `Enter the critical field of cybersecurity with our comprehensive program covering defensive and offensive security techniques. Learn to protect organizations from modern cyber threats.

Master network security, penetration testing, incident response, and security compliance frameworks. Understand cryptography, secure coding practices, and vulnerability assessment methodologies.

Prepare for industry certifications like CompTIA Security+ and CEH while building hands-on experience with industry-standard security tools.`,
    duration: '14 Weeks',
    level: 'Beginner to Intermediate',
    price: 57999,
    originalPrice: 89999,
    category: 'cloud',
    skills: ['Network Security', 'Ethical Hacking', 'Penetration Testing', 'SIEM', 'Incident Response', 'Cryptography', 'Compliance', 'Security Tools'],
    features: [
      '65+ hours of content',
      'Virtual lab environment',
      'CTF challenges',
      'Security+ exam prep',
      'Real threat simulations',
      'Security community access'
    ],
    instructor: {
      name: 'Robert Martinez',
      title: 'CISO at Fortune 500',
      experience: '16+ years'
    },
    rating: 4.8,
    students: 1150,
    image: 'security',
    color: 'accent'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Branding',
    shortDescription: 'Create compelling visual identities and marketing materials that stand out.',
    description: `Master the art of visual communication with our Graphic Design & Branding program. Learn to create impactful designs that tell stories and build memorable brands.

Become proficient in Adobe Creative Suite including Photoshop, Illustrator, and InDesign. Understand color theory, typography, composition, and brand strategy principles.

Build a diverse portfolio spanning logo design, marketing materials, social media graphics, and complete brand identity systems.`,
    duration: '10 Weeks',
    level: 'Beginner',
    price: 39999,
    originalPrice: 64999,
    category: 'design',
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Brand Identity', 'Typography', 'Color Theory', 'Print Design', 'Social Media Design'],
    features: [
      '50+ hours of content',
      'Adobe CC subscription included',
      '15 portfolio projects',
      'Client project simulation',
      'Design critique sessions',
      'Freelance business guide'
    ],
    instructor: {
      name: 'Amanda Foster',
      title: 'Creative Director at Pentagram',
      experience: '12+ years'
    },
    rating: 4.8,
    students: 1890,
    image: 'graphic',
    color: 'primary'
  }
]

export const getProgramById = (id) => {
  return programs.find(program => program.id === id)
}

export const getProgramsByCategory = (category) => {
  if (category === 'all') return programs
  return programs.filter(program => program.category === category)
}

export const searchPrograms = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return programs.filter(program => 
    program.title.toLowerCase().includes(lowercaseQuery) ||
    program.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    program.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
  )
}

export const getFeaturedPrograms = () => {
  return programs.slice(0, 6)
}
