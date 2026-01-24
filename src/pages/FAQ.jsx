import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useData } from '../context/DataContext'
import Button from '../components/common/Button'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-text pr-4">{faq.question}</span>
        <svg 
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-text/60 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  )
}

function FAQ() {
  const { faqs, faqCategories, getFaqsByCategory } = useData()
  const [activeCategory, setActiveCategory] = useState('general')
  const [openItems, setOpenItems] = useState({})

  const filteredFaqs = getFaqsByCategory(activeCategory)

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <Layout>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              FAQ
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-text mb-4">
              Frequently Asked
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-text/60 max-w-xl mx-auto">
              Find answers to common questions about our programs and services
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text/70 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            {filteredFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItems[faq.id]}
                onToggle={() => toggleItem(faq.id)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-text mb-2">Still have questions?</h3>
            <p className="text-text/60 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <Button to="/contact">
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default FAQ
