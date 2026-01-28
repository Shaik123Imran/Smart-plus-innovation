import Button from '../common/Button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-white to-primary/5 py-16 lg:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              <span className="text-primary font-medium text-sm">Transform Your Future Today</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text leading-tight">
              Unlock Your
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Full Potential
              </span>
              With Smart Plus Innovation
            </h1>

            <p className="text-lg text-text/60 max-w-xl leading-relaxed">
              Join thousands of learners who have transformed their careers with our industry-leading programs. 
              Get hands-on experience with real-world projects and expert mentorship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/programs" size="lg">
                Explore Programs
              </Button>
              <Button to="/about" variant="outline" size="lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {['S', 'M', 'E', 'D'].map((letter, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-primary">{letter}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-text">10,000+</p>
                <p className="text-sm text-text/60">Happy Students</p>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:-rotate-1 transition-transform duration-500">
                <div className="aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full p-8">
                    <div className="absolute top-8 left-8 w-24 h-24 bg-primary/20 rounded-2xl animate-pulse"></div>
                    <div className="absolute top-16 right-12 w-20 h-20 bg-secondary/20 rounded-full animate-pulse delay-75"></div>
                    <div className="absolute bottom-16 left-16 w-16 h-16 bg-accent/20 rounded-xl animate-pulse delay-150"></div>
                    <div className="absolute bottom-8 right-8 w-28 h-28 bg-primary/10 rounded-3xl animate-pulse delay-200"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        to="/programs"
                        className="group text-center space-y-4 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-primary/30 hover:bg-white/40 transition-colors"
                        aria-label="Start Learning - Browse Programs"
                      >
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-text font-bold text-lg group-hover:text-primary transition-colors">Start Learning</p>
                        <p className="text-text/60 text-sm">100+ Courses Available</p>
                        <p className="text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Browse Programs →
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-bounce">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-text text-sm">Certification</p>
                  <p className="text-xs text-text/60">Industry Recognized</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-text text-sm">Fast Track</p>
                  <p className="text-xs text-text/60">Learn at Your Pace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
