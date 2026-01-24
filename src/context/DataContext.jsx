import { createContext, useContext, useState, useEffect } from 'react'
import { programs, categories, getProgramById, getProgramsByCategory, searchPrograms, getFeaturedPrograms } from '../data/programs'
import { testimonials } from '../data/testimonials'
import { sampleBlogs, blogCategories, getBlogById, getBlogsByCategory, getFeaturedBlogs, searchBlogs } from '../data/blog'
import { faqs, faqCategories, getFaqsByCategory } from '../data/faq'
import { team, stats, values } from '../data/team'
import { pricingPlans, annualDiscount } from '../data/pricing'
import { 
  getBlogPosts, 
  createBlogPost, 
  getApprovedTestimonials,
  submitTestimonial,
  submitContactForm,
  subscribeNewsletter
} from '../services/firebase'

const DataContext = createContext()

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export function DataProvider({ children }) {
  const [dynamicBlogs, setDynamicBlogs] = useState([])
  const [dynamicTestimonials, setDynamicTestimonials] = useState([])
  const [loading, setLoading] = useState(false)

  // Combine static and dynamic blogs
  const allBlogs = [...sampleBlogs, ...dynamicBlogs]
  const allTestimonials = [...testimonials, ...dynamicTestimonials]

  // Fetch dynamic data from Firebase
  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const [blogs, reviews] = await Promise.all([
          getBlogPosts(),
          getApprovedTestimonials()
        ])
        setDynamicBlogs(blogs)
        setDynamicTestimonials(reviews)
      } catch (error) {
        console.log('Using static data only:', error.message)
      }
    }
    fetchDynamicData()
  }, [])

  // Program functions
  const getProgram = (id) => getProgramById(id)
  const filterProgramsByCategory = (category) => getProgramsByCategory(category)
  const searchProgramsQuery = (query) => searchPrograms(query)
  const featuredPrograms = getFeaturedPrograms()

  // Blog functions
  const getBlog = (id) => {
    const staticBlog = getBlogById(id)
    if (staticBlog) return staticBlog
    return dynamicBlogs.find(blog => blog.id === id)
  }
  
  const filterBlogsByCategory = (category) => {
    if (category === 'all') return allBlogs
    return allBlogs.filter(blog => blog.category === category)
  }
  
  const searchBlogsQuery = (query) => {
    const lowercaseQuery = query.toLowerCase()
    return allBlogs.filter(blog =>
      blog.title.toLowerCase().includes(lowercaseQuery) ||
      blog.excerpt?.toLowerCase().includes(lowercaseQuery) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }
  
  const addBlogPost = async (postData) => {
    setLoading(true)
    try {
      const id = await createBlogPost(postData)
      setDynamicBlogs(prev => [{ id, ...postData }, ...prev])
      return { success: true, id }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Testimonial functions
  const addTestimonial = async (testimonialData) => {
    setLoading(true)
    try {
      const id = await submitTestimonial(testimonialData)
      return { success: true, id }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Contact & Newsletter
  const submitContact = async (formData) => {
    try {
      await submitContactForm(formData)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const subscribe = async (email) => {
    try {
      const isNew = await subscribeNewsletter(email)
      return { success: true, isNew }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    // Programs
    programs,
    categories,
    getProgram,
    filterProgramsByCategory,
    searchProgramsQuery,
    featuredPrograms,
    
    // Blogs
    blogs: allBlogs,
    blogCategories,
    getBlog,
    filterBlogsByCategory,
    searchBlogsQuery,
    featuredBlogs: getFeaturedBlogs(),
    addBlogPost,
    
    // Testimonials
    testimonials: allTestimonials,
    addTestimonial,
    
    // FAQ
    faqs,
    faqCategories,
    getFaqsByCategory,
    
    // Team & About
    team,
    stats,
    values,
    
    // Pricing
    pricingPlans,
    annualDiscount,
    
    // Actions
    submitContact,
    subscribe,
    
    // State
    loading
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
