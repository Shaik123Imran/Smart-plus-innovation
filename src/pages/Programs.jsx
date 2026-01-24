import { useState, useMemo } from 'react'
import Layout from '../components/layout/Layout'
import { useData } from '../context/DataContext'
import ProgramCard from '../components/programs/ProgramCard'
import ProgramFilter from '../components/programs/ProgramFilter'
import SearchBar from '../components/common/SearchBar'

function Programs() {
  const { programs, categories } = useData()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPrograms = useMemo(() => {
    let result = programs

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(program => program.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      result = result.filter(program =>
        program.title.toLowerCase().includes(lowercaseQuery) ||
        program.shortDescription.toLowerCase().includes(lowercaseQuery) ||
        program.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
      )
    }

    return result
  }, [programs, activeCategory, searchQuery])

  return (
    <Layout>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              All Programs
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-text mb-4">
              Explore Our
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Learning Programs
              </span>
            </h1>
            <p className="text-text/60 max-w-2xl mx-auto text-lg">
              Choose from our comprehensive range of industry-aligned programs
            </p>
          </div>

          <div className="mb-8">
            <SearchBar
              placeholder="Search programs by name or skill..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="max-w-md mx-auto"
            />
          </div>

          <div className="mb-12">
            <ProgramFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {filteredPrograms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-text/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-text mb-2">No programs found</h3>
              <p className="text-text/60">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Programs
