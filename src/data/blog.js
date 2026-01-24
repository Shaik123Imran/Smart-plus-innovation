export const blogCategories = [
  { id: 'all', name: 'All Posts' },
  { id: 'technology', name: 'Technology' },
  { id: 'career', name: 'Career Tips' },
  { id: 'tutorials', name: 'Tutorials' },
  { id: 'industry', name: 'Industry News' },
  { id: 'success-stories', name: 'Success Stories' },
]

export const sampleBlogs = [
  {
    id: 'future-of-ai-2026',
    title: 'The Future of AI in 2026: Trends Every Developer Should Know',
    excerpt: 'Artificial Intelligence is evolving rapidly. Discover the key trends shaping the industry and how you can stay ahead of the curve.',
    content: `Artificial Intelligence has moved from science fiction to everyday reality, and 2026 is proving to be a pivotal year for the technology. As developers and tech enthusiasts, understanding these trends is crucial for career growth and staying competitive.

## 1. Multimodal AI Models

The era of single-purpose AI is ending. Modern models like GPT-5 and Google's Gemini can process text, images, audio, and video simultaneously. This opens unprecedented opportunities for developers to create more intuitive and powerful applications.

## 2. AI-Assisted Development

GitHub Copilot was just the beginning. New tools are emerging that can generate entire applications from natural language descriptions, debug complex code, and even architect systems. However, understanding the fundamentals remains crucial—AI assists, it doesn't replace expertise.

## 3. Edge AI and On-Device Processing

With privacy concerns growing, there's a shift toward running AI models directly on devices rather than in the cloud. This requires optimization skills and understanding of model compression techniques.

## 4. Responsible AI and Regulation

Governments worldwide are implementing AI regulations. Understanding AI ethics, bias mitigation, and compliance requirements is becoming essential for every AI practitioner.

## What This Means for Your Career

The demand for AI skills continues to surge, but the type of skills needed is evolving. Focus on:

- Understanding model architectures and their applications
- Learning prompt engineering and fine-tuning techniques
- Building with AI APIs and frameworks
- Understanding AI ethics and responsible development

At Smart Plus Innovation, our AI & Deep Learning program covers all these emerging areas, preparing you for the AI-driven future.`,
    author: {
      name: 'Dr. Priya Sharma',
      role: 'AI Research Lead',
      avatar: 'PS'
    },
    category: 'technology',
    tags: ['AI', 'Machine Learning', 'Career', 'Technology Trends'],
    readTime: '8 min read',
    publishedAt: '2026-01-20',
    image: 'ai-future',
    featured: true
  },
  {
    id: 'land-first-tech-job',
    title: 'How to Land Your First Tech Job in 2026: A Complete Guide',
    excerpt: 'Breaking into tech can feel overwhelming. Here\'s a practical roadmap from application to offer, based on insights from hiring managers.',
    content: `Landing your first tech job is challenging but absolutely achievable with the right strategy. After speaking with hundreds of hiring managers and successful career changers, here's what actually works in 2026.

## Build a Strong Foundation

Before applying anywhere, ensure you have:

**Technical Skills**: Choose your path (frontend, backend, data, etc.) and go deep. Employers prefer specialists over generalists for entry-level roles.

**Portfolio Projects**: Build 3-5 substantial projects that demonstrate your skills. Clone popular applications, solve real problems, or contribute to open source.

**Online Presence**: A polished LinkedIn profile, active GitHub account, and personal website make you discoverable and credible.

## The Job Search Strategy

### 1. Target the Right Companies

Start with companies actively hiring juniors. Look for:
- Startups with mentorship programs
- Mid-size companies with training budgets
- Companies with apprenticeship programs

### 2. Customize Every Application

Generic applications get ignored. For each role:
- Tailor your resume to match keywords
- Write a specific cover letter mentioning the company
- Connect your projects to their tech stack

### 3. Network Strategically

80% of jobs are filled through networking. Attend meetups, engage on Twitter/LinkedIn, and don't be afraid to reach out to developers at target companies.

## Ace the Interview

**Technical Interviews**: Practice on LeetCode and HackerRank, but focus on understanding patterns rather than memorizing solutions.

**Behavioral Interviews**: Use the STAR method and have 5-6 stories ready that demonstrate problem-solving, collaboration, and growth mindset.

**System Design**: Even for junior roles, understand basic concepts like APIs, databases, and caching.

## The Mindset Shift

Rejection is part of the process. Most successful developers applied to 50-100 positions before landing their first role. Stay consistent, keep learning, and celebrate small wins.

Your first tech job is just the beginning. Focus on getting in the door, then let your work speak for itself.`,
    author: {
      name: 'Lisa Chang',
      role: 'Career Coach',
      avatar: 'LC'
    },
    category: 'career',
    tags: ['Career', 'Job Search', 'Interview Tips', 'Tech Industry'],
    readTime: '10 min read',
    publishedAt: '2026-01-18',
    image: 'career-guide',
    featured: true
  },
  {
    id: 'react-hooks-deep-dive',
    title: 'React Hooks Deep Dive: Advanced Patterns for 2026',
    excerpt: 'Master advanced React hooks patterns including custom hooks, performance optimization, and state management techniques.',
    content: `React Hooks revolutionized how we write components, but many developers only scratch the surface. Let's explore advanced patterns that separate junior from senior React developers.

## Custom Hooks: The Power of Abstraction

Custom hooks let you extract component logic into reusable functions. Here's a practical example:

\`\`\`javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

## Performance Optimization Patterns

### useMemo and useCallback

These hooks prevent unnecessary recalculations and re-renders:

\`\`\`javascript
const expensiveCalculation = useMemo(() => {
  return items.reduce((acc, item) => acc + item.value, 0);
}, [items]);

const handleClick = useCallback((id) => {
  setSelectedId(id);
}, []);
\`\`\`

### When NOT to Optimize

Premature optimization is the root of all evil. Only use useMemo/useCallback when:
- You have measurable performance issues
- The computation is genuinely expensive
- The value is passed to memoized children

## State Management Patterns

### useReducer for Complex State

When state logic becomes complex, useReducer provides clarity:

\`\`\`javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    default:
      return state;
  }
};
\`\`\`

## Conclusion

Mastering these patterns takes practice. Build projects that require complex state management, and you'll naturally internalize these concepts.`,
    author: {
      name: 'Alex Thompson',
      role: 'Senior Engineer',
      avatar: 'AT'
    },
    category: 'tutorials',
    tags: ['React', 'JavaScript', 'Frontend', 'Tutorial'],
    readTime: '12 min read',
    publishedAt: '2026-01-15',
    image: 'react-hooks',
    featured: false
  },
  {
    id: 'remote-work-productivity',
    title: '10 Proven Strategies for Remote Work Productivity in Tech',
    excerpt: 'Working from home is the new normal. Learn battle-tested strategies from top remote developers to maximize your productivity.',
    content: `Remote work offers incredible flexibility but comes with unique challenges. After interviewing 50+ successful remote developers, here are the strategies that actually work.

## 1. Create a Dedicated Workspace

Your environment shapes your mindset. Even in a small apartment, designate a specific area for work. When you sit there, your brain knows it's time to focus.

## 2. Time Blocking

Schedule specific blocks for:
- Deep work (coding, problem-solving)
- Meetings and communication
- Learning and development
- Breaks and exercise

## 3. The Two-Minute Rule

If a task takes less than two minutes, do it immediately. This prevents small tasks from piling up and cluttering your mental space.

## 4. Async Communication First

Default to async (email, Slack messages) instead of meetings. This respects everyone's time and allows for thoughtful responses.

## 5. Regular Movement

Set reminders to stand, stretch, or walk every hour. Physical activity is directly linked to cognitive performance.

## 6. Define "Done"

Before starting any task, clearly define what completion looks like. This prevents scope creep and gives you clear wins throughout the day.

## 7. Batch Similar Tasks

Context switching kills productivity. Group similar tasks together—all meetings in one block, all code reviews in another.

## 8. Protect Your Peak Hours

Identify when you do your best work and guard those hours fiercely. No meetings, no Slack—just deep, focused work.

## 9. End-of-Day Ritual

Before logging off, write tomorrow's top 3 priorities. This gives closure and lets you start the next day with clarity.

## 10. Embrace Boundaries

Remote work can blur into all hours. Set firm start and end times, and communicate them to your team.

Remote work is a skill that improves with practice. Start implementing these strategies one at a time, and watch your productivity soar.`,
    author: {
      name: 'Michael Park',
      role: 'Engineering Manager',
      avatar: 'MP'
    },
    category: 'career',
    tags: ['Remote Work', 'Productivity', 'Career Tips', 'Work-Life Balance'],
    readTime: '7 min read',
    publishedAt: '2026-01-12',
    image: 'remote-work',
    featured: false
  },
  {
    id: 'success-story-maria',
    title: 'From Teacher to Tech Lead: Maria\'s Incredible Career Transformation',
    excerpt: 'Maria spent 10 years as a high school teacher before making the bold leap into tech. Here\'s her inspiring journey.',
    content: `Maria Santos never imagined she'd be leading a development team at a Fortune 500 company. For 10 years, she taught high school mathematics in a small town in Texas. But in 2024, everything changed.

## The Spark

"I was teaching my students about algorithms for a math project, and I realized I was more excited about the code than they were," Maria recalls. "That night, I wrote my first 'Hello World' in Python, and I couldn't stop."

## The Decision

Leaving a stable teaching career at 35 with two kids wasn't easy. But Maria had a plan:

1. Save 6 months of expenses
2. Enroll in an intensive bootcamp
3. Commit fully to the transition

She chose Smart Plus Innovation's Full Stack Web Development program because of its flexible schedule and career support.

## The Journey

"The first month was brutal," Maria admits. "I questioned my decision daily. But the mentors kept me going. They believed in me when I didn't believe in myself."

Her teaching background proved surprisingly valuable:
- **Explaining complex concepts** became her superpower in code reviews
- **Patience and persistence** helped her debug challenging problems
- **Classroom management** translated to project management skills

## The Breakthrough

Three months after completing the program, Maria landed her first developer role at a startup. Within two years, she was promoted to Tech Lead.

"The skills I brought from teaching—communication, patience, breaking down complex topics—these are what set me apart. Tech isn't just about code; it's about people."

## Her Advice for Career Changers

1. **Your past experience is an asset**, not a liability
2. **Embrace being a beginner**—it's temporary
3. **Build in public**—share your journey on LinkedIn
4. **Find your community**—you can't do this alone

Today, Maria mentors other career changers through Smart Plus Innovation's community program, paying forward the support she received.

"If a 35-year-old teacher from a small town can do this, anyone can. Your next chapter can be your best chapter."`,
    author: {
      name: 'Smart Plus Team',
      role: 'Editorial',
      avatar: 'SP'
    },
    category: 'success-stories',
    tags: ['Success Story', 'Career Change', 'Inspiration', 'Web Development'],
    readTime: '6 min read',
    publishedAt: '2026-01-08',
    image: 'success-story',
    featured: true
  },
  {
    id: 'cloud-security-best-practices',
    title: 'Cloud Security Best Practices Every Developer Must Know',
    excerpt: 'Security breaches cost companies millions. Learn essential cloud security practices to protect your applications and data.',
    content: `Cloud computing powers modern applications, but with great power comes great responsibility. A single security misconfiguration can expose sensitive data and cost companies millions. Here's what every developer needs to know.

## The Shared Responsibility Model

Cloud providers secure the infrastructure; you secure your applications. Never assume AWS, Azure, or GCP handles everything—they don't.

## Essential Security Practices

### 1. Principle of Least Privilege

Grant only the minimum permissions necessary. An application that only reads from S3 shouldn't have write access. Review and audit IAM policies regularly.

### 2. Encrypt Everything

- **At rest**: Use KMS for encryption keys
- **In transit**: TLS for all communications
- **Application level**: Encrypt sensitive data before storing

### 3. Secret Management

Never hardcode credentials. Use:
- AWS Secrets Manager
- HashiCorp Vault
- Environment variables (minimum)

### 4. Network Security

- Use VPCs to isolate resources
- Implement security groups as firewalls
- Enable VPC Flow Logs for monitoring

### 5. Logging and Monitoring

You can't protect what you can't see:
- Enable CloudTrail for API auditing
- Set up CloudWatch alerts
- Use SIEM tools for analysis

## Common Mistakes to Avoid

1. **Public S3 buckets**—always audit bucket policies
2. **Overly permissive security groups**—no 0.0.0.0/0 access
3. **Unused credentials**—rotate and revoke regularly
4. **Ignoring updates**—patch vulnerabilities promptly

## Security as Culture

Security isn't a one-time task—it's a continuous practice. Build security into your development workflow:

- Code reviews include security checks
- Automated scanning in CI/CD pipelines
- Regular security training for the team

Remember: The cost of prevention is always less than the cost of a breach.`,
    author: {
      name: 'Robert Martinez',
      role: 'Security Architect',
      avatar: 'RM'
    },
    category: 'technology',
    tags: ['Cloud', 'Security', 'AWS', 'DevOps', 'Best Practices'],
    readTime: '9 min read',
    publishedAt: '2026-01-05',
    image: 'cloud-security',
    featured: false
  }
]

export const getBlogById = (id) => {
  return sampleBlogs.find(blog => blog.id === id)
}

export const getBlogsByCategory = (category) => {
  if (category === 'all') return sampleBlogs
  return sampleBlogs.filter(blog => blog.category === category)
}

export const getFeaturedBlogs = () => {
  return sampleBlogs.filter(blog => blog.featured)
}

export const searchBlogs = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return sampleBlogs.filter(blog =>
    blog.title.toLowerCase().includes(lowercaseQuery) ||
    blog.excerpt.toLowerCase().includes(lowercaseQuery) ||
    blog.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
