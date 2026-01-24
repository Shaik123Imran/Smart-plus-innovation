import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import Modal from '../components/common/Modal'

function ProgramDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProgram } = useData()
  const { user, isEnrolled, enroll } = useAuth()
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [enrolling, setEnrolling] = useState(false)

  const program = getProgram(id)

  if (!program) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text mb-4">Program not found</h1>
            <Button to="/programs">Back to Programs</Button>
          </div>
        </div>
      </Layout>
    )
  }

  const enrolled = user && isEnrolled(program.id)

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/programs/${id}` } })
      return
    }

    setEnrolling(true)
    const result = await enroll(program.id)
    setEnrolling(false)

    if (result.success) {
      setShowEnrollModal(true)
    }
  }

  return (
    <Layout>
      <section className="py-12 lg:py-20 bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <Button to="/programs" variant="ghost" className="mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Programs
                </Button>

                <Badge variant={program.color}>{program.category.replace('-', ' & ').toUpperCase()}</Badge>
                
                <h1 className="text-3xl lg:text-4xl font-extrabold text-text mt-4 mb-4">
                  {program.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-text/60">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {program.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {program.rating} ({program.students} students)
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-bold text-text mb-4">About This Program</h2>
                <div className="text-text/70 whitespace-pre-line leading-relaxed">
                  {program.description}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-text mb-4">Skills You'll Learn</h2>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill, index) => (
                    <Badge key={index} variant="gray">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-text mb-4">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {program.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-text/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-2xl p-6">
                <h2 className="text-xl font-bold text-text mb-4">Your Instructor</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {program.instructor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-text">{program.instructor.name}</h3>
                    <p className="text-text/60">{program.instructor.title}</p>
                    <p className="text-text/40 text-sm">{program.instructor.experience} experience</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-extrabold text-text">₹{program.price.toLocaleString('en-IN')}</span>
                    {program.originalPrice && (
                      <span className="text-xl text-text/40 line-through">₹{program.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  {program.originalPrice && (
                    <Badge variant="success">
                      Save ₹{(program.originalPrice - program.price).toLocaleString('en-IN')} ({Math.round((1 - program.price / program.originalPrice) * 100)}% off)
                    </Badge>
                  )}
                </div>

                {enrolled ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 text-green-700 rounded-xl p-4 text-center">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-semibold">You're enrolled!</p>
                    </div>
                    <Button to="/dashboard" className="w-full">
                      Go to Dashboard
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleEnroll} loading={enrolling} className="w-full" size="lg">
                    {user ? 'Enroll Now' : 'Login to Enroll'}
                  </Button>
                )}

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center gap-3 text-text/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{program.duration} program</span>
                  </div>
                  <div className="flex items-center gap-3 text-text/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Certificate included</span>
                  </div>
                  <div className="flex items-center gap-3 text-text/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-text/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>7-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title="Enrollment Successful! 🎉"
      >
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-text mb-2">Welcome to {program.title}!</h3>
          <p className="text-text/60 mb-6">
            You've successfully enrolled in this program. Head to your dashboard to start learning!
          </p>
          <Button to="/dashboard" className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </Modal>
    </Layout>
  )
}

export default ProgramDetail
