function ProgramFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-primary text-white shadow-lg shadow-primary/30'
              : 'bg-white text-text/70 hover:bg-primary/10 hover:text-primary'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default ProgramFilter
