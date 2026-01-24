import { useState } from 'react'

function SearchBar({ 
  placeholder = 'Search...', 
  onSearch, 
  className = '',
  value: controlledValue,
  onChange: controlledOnChange
}) {
  const [internalValue, setInternalValue] = useState('')
  
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  
  const handleChange = (e) => {
    const newValue = e.target.value
    if (isControlled) {
      controlledOnChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleClear = () => {
    if (isControlled) {
      controlledOnChange('')
    } else {
      setInternalValue('')
    }
    if (onSearch) {
      onSearch('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <svg 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-text/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none bg-white"
        />
        
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-4 h-4 text-text/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchBar
