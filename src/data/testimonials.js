export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    company: "Google",
    content: "Smart Plus Innovation completely transformed my career. The hands-on projects and mentorship helped me land my dream job at Google. The curriculum is cutting-edge and the community support is incredible. I went from knowing basic HTML to building full-stack applications in just 12 weeks!",
    rating: 5,
    image: "SJ",
    program: "Full Stack Web Development",
    linkedIn: "#"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Data Scientist",
    company: "Microsoft",
    content: "The Data Science program exceeded all my expectations. The instructors are industry experts who provide real-world insights. Within 3 months of completing the course, I received multiple job offers. The Kaggle competition guidance was particularly valuable!",
    rating: 5,
    image: "MC",
    program: "Data Science & Analytics",
    linkedIn: "#"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Senior UX Designer",
    company: "Apple",
    content: "As someone transitioning careers, I was nervous about entering tech. The UI/UX program gave me the confidence and skills I needed. The portfolio projects were instrumental in my hiring process. Now I'm designing products used by millions!",
    rating: 5,
    image: "ER",
    program: "UI/UX Design Mastery",
    linkedIn: "#"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Cloud Architect",
    company: "Amazon",
    content: "The Cloud Computing certification program is world-class. The practical labs and AWS preparation helped me pass my certification on the first attempt. The hands-on experience with real infrastructure was invaluable. Highly recommend!",
    rating: 5,
    image: "DK",
    program: "Cloud Computing & AWS",
    linkedIn: "#"
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Mobile Developer",
    company: "Meta",
    content: "Learning React Native through Smart Plus was the best decision. The project-based approach means you're building real apps from day one. The career support team helped me negotiate a 40% salary increase when I got my offer from Meta!",
    rating: 5,
    image: "PP",
    program: "Mobile App Development",
    linkedIn: "#"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Marketing Director",
    company: "Spotify",
    content: "The Digital Marketing program gave me a complete toolkit for modern marketing. From SEO to paid advertising, I learned strategies that I immediately applied at work. Our team's conversion rates improved by 150% using techniques from this course!",
    rating: 5,
    image: "JW",
    program: "Digital Marketing Pro",
    linkedIn: "#"
  },
  {
    id: 7,
    name: "Anna Kowalski",
    role: "AI Engineer",
    company: "Tesla",
    content: "The AI & Deep Learning program is incredibly comprehensive. Working with PyTorch and implementing research papers gave me the skills to contribute to cutting-edge projects. The mentors are actual researchers who share invaluable insights!",
    rating: 5,
    image: "AK",
    program: "AI & Deep Learning",
    linkedIn: "#"
  },
  {
    id: 8,
    name: "Robert Martinez",
    role: "Product Manager",
    company: "Stripe",
    content: "Transitioning from engineering to product management seemed daunting, but this program made it seamless. The PM frameworks, mock interviews, and real case studies prepared me perfectly. I landed my dream PM role within 2 months of graduation!",
    rating: 5,
    image: "RM",
    program: "Product Management",
    linkedIn: "#"
  }
]

export const getRandomTestimonials = (count = 5) => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
