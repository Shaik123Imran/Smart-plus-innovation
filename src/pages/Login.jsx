import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import { Input } from '../components/common/Input'
import Modal from '../components/common/Modal'

function Login() {
  const { login, googleLogin, forgotPassword, error: authError, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from || '/dashboard'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetStatus, setResetStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.email, formData.password)
    
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error || 'Invalid email or password')
    }
  }

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured) {
      setError('Google Sign-In requires Firebase configuration. Please use email/password login, or set up Firebase.')
      return
    }
    
    setLoading(true)
    setError('')
    
    const result = await googleLogin()
    
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error || 'Failed to login with Google')
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!resetEmail) {
      setResetStatus({ type: 'error', message: 'Please enter your email address' })
      return
    }
    
    setResetStatus({ type: 'loading' })
    
    const result = await forgotPassword(resetEmail)
    
    if (result.success) {
      setResetStatus({ type: 'success', message: result.message })
      setTimeout(() => {
        if (!result.demo) {
          setShowForgotPassword(false)
          setResetStatus(null)
          setResetEmail('')
        }
      }, 3000)
    } else {
      setResetStatus({ type: 'error', message: result.error })
    }
  }

  return (
    <Layout hideAnnouncement>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-white min-h-screen">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">S+</span>
              </div>
            </Link>
            <h1 className="text-3xl font-extrabold text-text mb-2">Welcome Back</h1>
            <p className="text-text/60">Sign in to continue your learning journey</p>
          </div>

          {!isFirebaseConfigured && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm">
              <strong>Demo Mode:</strong> Firebase is not configured. You can still register and login with email/password. Your data will be stored locally.
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              onClick={handleGoogleLogin}
              disabled={loading || !isFirebaseConfigured}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl font-medium transition-colors ${
                !isFirebaseConfigured 
                  ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                  : 'text-text hover:bg-gray-50'
              }`}
              title={!isFirebaseConfigured ? 'Requires Firebase configuration' : 'Sign in with Google'}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-text/50">or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-text/70">Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true)
                    setResetEmail(formData.email)
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {(error || authError) && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error || authError}
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            <p className="text-center mt-6 text-text/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPassword}
        onClose={() => {
          setShowForgotPassword(false)
          setResetStatus(null)
          setResetEmail('')
        }}
        title="Reset Password"
      >
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <p className="text-text/60">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <Input
            label="Email Address"
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          {resetStatus?.type === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {resetStatus.message}
            </div>
          )}
          
          {resetStatus?.type === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {resetStatus.message}
            </div>
          )}

          <Button 
            type="submit" 
            loading={resetStatus?.type === 'loading'} 
            className="w-full"
          >
            Send Reset Link
          </Button>
        </form>
      </Modal>
    </Layout>
  )
}

export default Login
