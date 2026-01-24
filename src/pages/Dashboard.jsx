import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import Modal from '../components/common/Modal'
import { Input, Textarea } from '../components/common/Input'

function Dashboard() {
  const { user, userData, logout, unenroll, updateProfile } = useAuth()
  const { programs, testimonials, addTestimonial } = useData()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('courses')
  const [showTestimonialModal, setShowTestimonialModal] = useState(false)
  const [testimonialData, setTestimonialData] = useState({
    content: '',
    rating: 5,
    program: ''
  })
  const [testimonialStatus, setTestimonialStatus] = useState(null)

  if (!user) {
    navigate('/login')
    return null
  }

  const enrolledPrograms = (userData?.enrolledCourses || [])
    .map(id => programs.find(p => p.id === id))
    .filter(Boolean)

  const handleUnenroll = async (courseId) => {
    if (window.confirm('Are you sure you want to unenroll from this course?')) {
      await unenroll(courseId)
    }
  }

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault()
    setTestimonialStatus('loading')
    
    const result = await addTestimonial({
      ...testimonialData,
      name: user.displayName || 'Anonymous',
      image: user.displayName?.charAt(0) || 'A',
      role: 'Student',
      company: 'Smart Plus Innovation'
    })
    
    if (result.success) {
      setTestimonialStatus('success')
      setTestimonialData({ content: '', rating: 5, program: '' })
      setTimeout(() => {
        setShowTestimonialModal(false)
        setTestimonialStatus(null)
      }, 2000)
    } else {
      setTestimonialStatus('error')
    }
  }

  const tabs = [
    { id: 'courses', name: 'My Courses', icon: '📚' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ]

  return (
    <Layout hideAnnouncement>
      <section className="py-8 lg:py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-text">
                Welcome back, {user.displayName || 'Learner'}! 👋
              </h1>
              <p className="text-text/60 mt-1">Track your progress and continue learning</p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button to="/programs" variant="outline">
                Browse Programs
              </Button>
              <Button onClick={() => setShowTestimonialModal(true)} variant="secondary">
                Write Review
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <h3 className="font-bold text-text">{user.displayName || 'User'}</h3>
                  <p className="text-text/60 text-sm">{user.email}</p>
                  <Badge variant="primary" className="mt-2">Free Plan</Badge>
                </div>

                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-text/70 hover:bg-primary/5 hover:text-primary'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>

                <hr className="my-4" />

                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <span>🚪</span>
                  Logout
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-3xl font-bold text-primary">{enrolledPrograms.length}</div>
                      <div className="text-text/60 text-sm">Enrolled Courses</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-3xl font-bold text-secondary">0</div>
                      <div className="text-text/60 text-sm">Completed</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-3xl font-bold text-accent">0</div>
                      <div className="text-text/60 text-sm">Certificates</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-text mb-6">My Courses</h2>
                    
                    {enrolledPrograms.length > 0 ? (
                      <div className="space-y-4">
                        {enrolledPrograms.map((program) => (
                          <div key={program.id} className="flex items-center gap-4 p-4 bg-background rounded-xl">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-text">{program.title}</h3>
                              <p className="text-text/60 text-sm">{program.duration} • {program.level}</p>
                              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-0 rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button to={`/programs/${program.id}`} size="sm">
                                Continue
                              </Button>
                              <button
                                onClick={() => handleUnenroll(program.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto text-text/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-xl font-bold text-text mb-2">No courses yet</h3>
                        <p className="text-text/60 mb-6">Start your learning journey by enrolling in a program</p>
                        <Button to="/programs">Browse Programs</Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-text mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-1">Name</label>
                      <p className="text-text font-medium">{user.displayName || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-1">Email</label>
                      <p className="text-text font-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text/70 mb-1">Member Since</label>
                      <p className="text-text font-medium">
                        {userData?.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently joined'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-text mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-text mb-2">Email Notifications</h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-primary" />
                        <span className="text-text/70">Course updates and announcements</span>
                      </label>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-2">Newsletter</h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-primary" />
                        <span className="text-text/70">Weekly tips and industry insights</span>
                      </label>
                    </div>
                    <hr />
                    <div>
                      <h3 className="font-semibold text-red-500 mb-2">Danger Zone</h3>
                      <Button variant="danger" onClick={() => alert('Contact support to delete your account')}>
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      <Modal
        isOpen={showTestimonialModal}
        onClose={() => setShowTestimonialModal(false)}
        title="Write a Review"
      >
        <form onSubmit={handleTestimonialSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setTestimonialData(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${star <= testimonialData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Program (optional)"
            name="program"
            value={testimonialData.program}
            onChange={(e) => setTestimonialData(prev => ({ ...prev, program: e.target.value }))}
            placeholder="Which program did you take?"
          />

          <Textarea
            label="Your Review"
            name="content"
            value={testimonialData.content}
            onChange={(e) => setTestimonialData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Share your experience with Smart Plus Innovation..."
            rows={5}
            required
          />

          <Button type="submit" loading={testimonialStatus === 'loading'} className="w-full">
            Submit Review
          </Button>

          {testimonialStatus === 'success' && (
            <p className="text-green-600 text-center">Thank you! Your review has been submitted.</p>
          )}
          {testimonialStatus === 'error' && (
            <p className="text-red-600 text-center">Failed to submit review. Please try again.</p>
          )}
        </form>
      </Modal>
    </Layout>
  )
}

export default Dashboard
