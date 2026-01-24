import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import Button from '../components/common/Button'
import { Input, Textarea, Select } from '../components/common/Input'

function WriteBlog() {
  const { user } = useAuth()
  const { blogCategories, addBlogPost } = useData()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'technology',
    tags: '',
  })
  const [status, setStatus] = useState(null)

  if (!user) {
    navigate('/login', { state: { from: '/blog/write' } })
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: {
        name: user.displayName || 'Anonymous',
        role: 'Community Member',
        avatar: user.displayName?.charAt(0) || 'A'
      },
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min read`
    }

    const result = await addBlogPost(postData)

    if (result.success) {
      setStatus('success')
      setTimeout(() => navigate('/blog'), 2000)
    } else {
      setStatus('error')
    }
  }

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button to="/blog" variant="ghost" className="mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-text mb-2">Write a Blog Post</h1>
            <p className="text-text/60">Share your knowledge with the community</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title..."
                required
              />

              <Textarea
                label="Excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a brief summary of your post (2-3 sentences)..."
                rows={3}
                required
              />

              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={blogCategories.filter(c => c.id !== 'all').map(c => ({
                  value: c.id,
                  label: c.name
                }))}
              />

              <Input
                label="Tags (comma-separated)"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, JavaScript, Tutorial..."
              />

              <Textarea
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your full blog post here. You can use markdown formatting..."
                rows={15}
                required
              />

              <div className="flex gap-4">
                <Button type="submit" loading={status === 'loading'} className="flex-1">
                  Publish Post
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/blog')}>
                  Cancel
                </Button>
              </div>

              {status === 'success' && (
                <p className="text-green-600 text-center font-medium">
                  ✓ Post published successfully! Redirecting...
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center font-medium">
                  Failed to publish post. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default WriteBlog
