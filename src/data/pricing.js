export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for exploring and getting started with tech learning',
    price: 0,
    period: 'forever',
    features: [
      'Access to 5 free mini-courses',
      'Community forum access',
      'Weekly newsletter',
      'Career resources library',
      'Basic certificate on completion'
    ],
    notIncluded: [
      'Live mentorship sessions',
      'Project reviews',
      'Career coaching',
      'Job referrals',
      'Full program access'
    ],
    cta: 'Get Started Free',
    popular: false,
    color: 'gray'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for serious learners ready to transform their careers',
    price: 4999,
    period: 'month',
    features: [
      'Access to all programs',
      'Live mentorship sessions',
      'Unlimited project reviews',
      'Career coaching (2 sessions/month)',
      'Resume & LinkedIn review',
      'Mock interviews',
      'Priority support',
      'Industry-recognized certificate',
      'Slack community access'
    ],
    notIncluded: [
      'Dedicated success manager',
      'Guaranteed job placement'
    ],
    cta: 'Start Learning',
    popular: true,
    color: 'primary'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For teams and organizations investing in talent development',
    price: 14999,
    period: 'month',
    perUser: true,
    minUsers: 5,
    features: [
      'Everything in Professional',
      'Dedicated success manager',
      'Custom learning paths',
      'Team analytics dashboard',
      'Priority job referrals',
      'Guaranteed job placement*',
      'On-site workshops available',
      'API access for LMS integration',
      'Invoice billing',
      'Custom certificates'
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
    color: 'secondary'
  }
]

export const annualDiscount = 20 // 20% off for annual billing

export const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. If you upgrade, you\'ll be charged the prorated difference. If you downgrade, the change takes effect at your next billing cycle.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer a 7-day free trial for the Professional plan. You can explore all features and cancel anytime before the trial ends without being charged.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, UPI, Net Banking, PayPal, and bank transfers. For Enterprise plans, we also offer invoice billing with NET 30 terms.'
  },
  {
    question: 'Can I get a refund?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us within 30 days for a full refund.'
  },
  {
    question: 'What does "Guaranteed job placement" mean?',
    answer: 'For Enterprise plan members who complete at least one program, we guarantee a job offer within 6 months of graduation, or we refund 50% of your fees. Terms and conditions apply.'
  }
]
