import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:shadow-primary/30',
  secondary: 'bg-gradient-to-r from-secondary to-accent text-white hover:shadow-xl hover:shadow-secondary/30',
  outline: 'border-2 border-text/20 text-text hover:border-primary hover:text-primary',
  ghost: 'text-text/70 hover:text-primary hover:bg-primary/5',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5',
  lg: 'px-8 py-4 text-lg',
}

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  to, 
  className = '', 
  disabled = false,
  loading = false,
  icon,
  ...props 
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button className={baseClasses} disabled={disabled || loading} {...props}>
      {content}
    </button>
  )
}

export default Button
