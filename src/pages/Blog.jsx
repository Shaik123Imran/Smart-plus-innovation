import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import SearchBar from '../components/common/SearchBar'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'

function Blog() {
  const { blogs, blogCategories, featuredBlogs } = useData()
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBlogs = useMemo(() => {
    let result = blogs

    if (activeCategory !== 'all') {
      result = result.filter(blog => blog.category === activeCategory)
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(lowercaseQuery) ||
        blog.excerpt?.toLowerCase().includes(lowercaseQuery) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
    }

    return result
  }, [blogs, activeCategory, searchQuery])

  return (
    <Layout>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
                Our Blog
              </span>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-text mb-4">
                Insights &
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Resources</span>
              </h1>
              <p className="text-text/60 max-w-xl">
                Stay updated with the latest in tech, career tips, and learning resources
              </p>
            </div>
            {user && (
              <Button to="/blog/write" className="mt-4 lg:mt-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Write a Post
              </Button>
            )}
          </div>

          {/* Featured Posts */}
          {featuredBlogs.length > 0 && !searchQuery && activeCategory === 'all' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-text mb-6">Featured Posts</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredBlogs.slice(0, 3).map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.id}`}
                    className="group relative bg-gradient-to-br from-primary to-secondary rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                    <div className="relative p-6 h-64 flex flex-col justify-end text-white">
                      <Badge variant="accent" className="w-fit mb-2">{blog.category}</Badge>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">{blog.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <SearchBar
              placeholder="Search articles..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="lg:w-80"
            />
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-text/70 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="gray">{blog.category}</Badge>
                      <span className="text-text/40 text-sm">{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-text/60 text-sm line-clamp-3 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {blog.author?.avatar || 'SP'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{blog.author?.name || 'Smart Plus Team'}</p>
                        <p className="text-xs text-text/40">{blog.publishedAt}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-text/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-bold text-text mb-2">No articles found</h3>
              <p className="text-text/60">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Blog
