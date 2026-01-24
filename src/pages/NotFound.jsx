import Layout from '../components/layout/Layout'
import Button from '../components/common/Button'

function NotFound() {
  return (
    <Layout hideAnnouncement>
      <section className="py-24 lg:py-32 bg-background min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-9xl font-extrabold text-primary/20 mb-4">404</div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-text mb-4">
            Page Not Found
          </h1>
          <p className="text-text/60 text-lg mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/" size="lg">
              Go Home
            </Button>
            <Button to="/programs" variant="outline" size="lg">
              Browse Programs
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NotFound
