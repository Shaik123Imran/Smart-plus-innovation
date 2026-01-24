import { Link } from 'react-router-dom'

function Card({ 
  children, 
  className = '', 
  hover = true,
  to,
  onClick,
  ...props 
}) {
  const baseClasses = `bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-transparent ${
    hover ? 'hover:shadow-xl hover:-translate-y-2 hover:border-primary/20 transition-all duration-300' : ''
  } ${className}`

  if (to) {
    return (
      <Link to={to} className={`block ${baseClasses}`} {...props}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <div className={`cursor-pointer ${baseClasses}`} onClick={onClick} {...props}>
        {children}
      </div>
    )
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  )
}

export default Card
