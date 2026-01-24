export const faqCategories = [
  { id: 'general', name: 'General Questions' },
  { id: 'programs', name: 'Programs & Courses' },
  { id: 'payment', name: 'Payment & Pricing' },
  { id: 'career', name: 'Career Support' },
  { id: 'technical', name: 'Technical Requirements' },
]

export const faqs = [
  {
    id: 1,
    category: 'general',
    question: 'What is Smart Plus Innovation?',
    answer: 'Smart Plus Innovation is a leading online education platform that provides industry-aligned tech courses taught by expert instructors from top companies like Google, Microsoft, Apple, and Amazon. We focus on practical, hands-on learning that prepares you for real-world careers in technology.'
  },
  {
    id: 2,
    category: 'general',
    question: 'How is Smart Plus different from other learning platforms?',
    answer: 'Unlike traditional courses, we offer: 1) Live mentorship sessions with industry experts, 2) Real-world projects that go into your portfolio, 3) Dedicated career support including resume reviews and mock interviews, 4) A thriving community of 10,000+ learners, and 5) Job placement assistance with our 200+ partner companies.'
  },
  {
    id: 3,
    category: 'general',
    question: 'Do I get a certificate after completing a program?',
    answer: 'Yes! Upon successful completion of any program, you receive an industry-recognized certificate that you can add to your LinkedIn profile and resume. Our certificates are valued by employers and demonstrate your practical skills and knowledge.'
  },
  {
    id: 4,
    category: 'programs',
    question: 'How long are the programs?',
    answer: 'Program duration varies from 8 to 18 weeks depending on the complexity and depth of the curriculum. Each program page shows the exact duration. You can learn at your own pace, and most students complete programs while working full-time.'
  },
  {
    id: 5,
    category: 'programs',
    question: 'What if I have no prior experience in tech?',
    answer: 'Many of our programs are designed for beginners with no prior experience. Our Web Development, Digital Marketing, and Graphic Design programs start from the fundamentals. We clearly mark the required level (Beginner, Intermediate, Advanced) on each program page.'
  },
  {
    id: 6,
    category: 'programs',
    question: 'Can I take multiple programs simultaneously?',
    answer: 'While technically possible, we recommend focusing on one program at a time to maximize your learning outcomes. Our programs are intensive and require 15-20 hours per week of dedicated study. Once you complete one program, you can enroll in another.'
  },
  {
    id: 7,
    category: 'programs',
    question: 'What happens if I fall behind on the coursework?',
    answer: 'Life happens, and we understand! You have lifetime access to all course materials, so you can catch up at your own pace. Additionally, our mentors and community are always available to help you get back on track.'
  },
  {
    id: 8,
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and bank transfers. For our Indian students, we also accept UPI and net banking.'
  },
  {
    id: 9,
    category: 'payment',
    question: 'Do you offer payment plans or EMI options?',
    answer: 'Yes! We offer flexible payment plans that allow you to pay in 3 or 6 monthly installments with no interest. EMI options are available through our payment partners. Contact our support team for detailed payment plan information.'
  },
  {
    id: 10,
    category: 'payment',
    question: 'Is there a refund policy?',
    answer: 'We offer a 7-day money-back guarantee for all programs. If you\'re not satisfied with the course within the first 7 days of enrollment, you can request a full refund—no questions asked. After 7 days, refunds are evaluated on a case-by-case basis.'
  },
  {
    id: 11,
    category: 'payment',
    question: 'Do you offer scholarships or discounts?',
    answer: 'Yes! We offer: 1) Early bird discounts for upcoming batches, 2) Referral discounts when you bring a friend, 3) Scholarships for students from underrepresented backgrounds, and 4) Special discounts for military veterans and educators. Contact us to learn about current offers.'
  },
  {
    id: 12,
    category: 'career',
    question: 'How does the job placement assistance work?',
    answer: 'Our career services team provides: 1) Resume and LinkedIn profile optimization, 2) Mock interviews with industry professionals, 3) Job referrals to our 200+ partner companies, 4) Salary negotiation coaching, and 5) Ongoing support until you land your dream job. Our placement rate is 95% within 6 months of graduation.'
  },
  {
    id: 13,
    category: 'career',
    question: 'What companies hire Smart Plus graduates?',
    answer: 'Our graduates work at companies including Google, Microsoft, Amazon, Apple, Meta, Netflix, Uber, Airbnb, Stripe, and hundreds of innovative startups. We have partnerships with both Fortune 500 companies and fast-growing tech startups looking for skilled talent.'
  },
  {
    id: 14,
    category: 'career',
    question: 'Do you help with career transitions from non-tech backgrounds?',
    answer: 'Absolutely! About 60% of our students come from non-tech backgrounds. We have dedicated resources for career changers, including how to leverage your existing experience, craft your narrative, and position yourself for tech roles. Many of our success stories feature career changers.'
  },
  {
    id: 15,
    category: 'technical',
    question: 'What are the technical requirements for the programs?',
    answer: 'You need: 1) A computer (Windows, Mac, or Linux) with at least 8GB RAM, 2) Stable internet connection, 3) A modern web browser (Chrome, Firefox, or Safari), and 4) Basic computer literacy. Specific programs may have additional requirements listed on their pages.'
  },
  {
    id: 16,
    category: 'technical',
    question: 'Are the courses live or pre-recorded?',
    answer: 'Our programs combine both: 1) Pre-recorded video lessons you can watch anytime, 2) Live weekly sessions with mentors for Q&A and project reviews, and 3) Live workshops for hands-on practice. This hybrid approach gives you flexibility while ensuring personal attention.'
  },
  {
    id: 17,
    category: 'technical',
    question: 'What software do I need to install?',
    answer: 'Most programs require free software that we guide you to install during onboarding. For example, Web Development uses VS Code (free), Data Science uses Python and Jupyter (free), and Design uses Figma (free tier available). Some programs include paid tool subscriptions as part of the enrollment.'
  },
  {
    id: 18,
    category: 'technical',
    question: 'How do I access the course materials?',
    answer: 'All course materials are available through our learning platform, accessible via web browser. You can also download videos for offline viewing through our mobile app. Your access begins immediately upon enrollment and continues for lifetime—even after you complete the program.'
  }
]

export const getFaqsByCategory = (category) => {
  if (category === 'all') return faqs
  return faqs.filter(faq => faq.category === category)
}
