import { useState } from 'react'
import { useData } from '../../context/DataContext'
import Button from '../common/Button'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const { subscribe } = useData()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    const result = await subscribe(email)

    if (result.success) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }

    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Stay Updated with Latest Tech Trends
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Subscribe to our newsletter and get weekly insights, course updates, and career tips delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full text-text focus:outline-none focus:ring-4 focus:ring-white/30"
              required
            />
            <Button 
              type="submit" 
              variant="outline" 
              size="lg"
              loading={status === 'loading'}
              className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary"
            >
              Subscribe
            </Button>
          </form>

          {status === 'success' && (
            <p className="mt-4 text-white font-medium">
              🎉 Thank you for subscribing! Check your inbox for confirmation.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-white/80">
              You're already subscribed or something went wrong. Please try again.
            </p>
          )}

          <p className="mt-4 text-white/60 text-sm">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
