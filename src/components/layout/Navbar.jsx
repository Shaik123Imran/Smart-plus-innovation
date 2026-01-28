import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/programs' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowUserMenu(false)
  }, [location])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S+</span>
              </div>
              <span className="text-xl font-bold text-text">Smart <span className="text-primary">Plus Innovation</span></span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors duration-200 relative group ${
                  location.pathname === link.href ? 'text-primary' : 'text-text/70 hover:text-primary'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-200 ${
                  location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="text-text font-medium">{user.displayName || 'User'}</span>
                  <svg className={`w-4 h-4 text-text/60 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link to="/dashboard" className="block px-4 py-2 text-text hover:bg-primary/5 hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/dashboard/profile" className="block px-4 py-2 text-text hover:bg-primary/5 hover:text-primary transition-colors">
                      Profile
                    </Link>
                    <Link to="/blog/write" className="block px-4 py-2 text-text hover:bg-primary/5 hover:text-primary transition-colors">
                      Write Blog
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-text/70 font-medium hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                  Join Now
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-text hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === link.href 
                    ? 'text-primary bg-primary/5' 
                    : 'text-text/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to="/dashboard" className="px-4 py-2 text-text/70 hover:text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/blog/write" className="px-4 py-2 text-text/70 hover:text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors">
                  Write Blog
                </Link>
                <button 
                  onClick={handleLogout}
                  className="mx-4 mt-2 px-6 py-2.5 border-2 border-red-500 text-red-500 font-semibold rounded-full text-center hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-text/70 hover:text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mx-4 mt-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full text-center hover:shadow-lg transition-all"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
