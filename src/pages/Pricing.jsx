import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useData } from '../context/DataContext'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'

function Pricing() {
  const { pricingPlans, annualDiscount } = useData()
  const [isAnnual, setIsAnnual] = useState(false)

  const getPrice = (plan) => {
    if (plan.price === 0) return 'Free'
    const price = isAnnual ? Math.round(plan.price * (1 - annualDiscount / 100)) : plan.price
    return `₹${price.toLocaleString('en-IN')}`
  }

  return (
    <Layout>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              Pricing
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-text mb-4">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-text/60 max-w-xl mx-auto">
              Choose the plan that fits your learning goals
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`font-medium ${!isAnnual ? 'text-text' : 'text-text/50'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-0.5'}`}></span>
              </button>
              <span className={`font-medium ${isAnnual ? 'text-text' : 'text-text/50'}`}>
                Annually 
                <Badge variant="success" className="ml-2">Save {annualDiscount}%</Badge>
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.popular 
                    ? 'ring-2 ring-primary shadow-2xl scale-105' 
                    : 'shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="primary">Most Popular</Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>
                  <p className="text-text/60 text-sm mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-text">{getPrice(plan)}</span>
                    {plan.price > 0 && (
                      <span className="text-text/60">/{plan.period}</span>
                    )}
                  </div>
                  {plan.perUser && (
                    <p className="text-text/50 text-sm mt-1">per user (min {plan.minUsers} users)</p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text/70">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-text/40">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  to={plan.id === 'enterprise' ? '/contact' : '/register'}
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text text-center mb-8">Pricing FAQ</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I switch plans later?',
                  a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades.'
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes, we offer a 7-day free trial for the Professional plan. No credit card required to start.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
                },
                {
                  q: 'Can I get a refund?',
                  a: 'We offer a 30-day money-back guarantee for all paid plans if you\'re not satisfied.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-text mb-2">{item.q}</h4>
                  <p className="text-text/60">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Pricing
