function Input({ 
  label, 
  error, 
  icon, 
  className = '', 
  type = 'text',
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-text mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`w-full px-4 py-3 rounded-xl border border-text/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none bg-white ${
            icon ? 'pl-12' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

function Textarea({ 
  label, 
  error, 
  className = '', 
  rows = 4,
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-text mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border border-text/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none bg-white resize-none ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

function Select({ 
  label, 
  error, 
  options = [], 
  className = '',
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-text mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 rounded-xl border border-text/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none bg-white ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export { Input, Textarea, Select }
export default Input
