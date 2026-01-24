import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import Button from '../common/Button'
import ProgramCard from '../programs/ProgramCard'

function FeaturedPrograms() {
  const { featuredPrograms } = useData()

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-text mb-4">
            Choose Your Path to
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto text-lg">
            Industry-aligned programs designed to transform beginners into professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/programs" size="lg">
            View All Programs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPrograms
