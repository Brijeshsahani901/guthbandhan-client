import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  
  const plans = [
    {
      name: 'Basic',
      description: 'Essential features to start your journey',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Create your profile',
        'Browse profiles',
        'See who liked you',
        'Limited messaging (5 per day)',
        '1 saved profile',
      ],
      cta: 'Start For Free',
      popular: false,
    },
    {
      name: 'Premium',
      description: 'Full access to find your perfect match',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        'All Basic features',
        'Unlimited messaging',
        'See who viewed your profile',
        'Advanced filters',
        'Up to 50 saved profiles',
        'Priority in search results',
      ],
      cta: 'Get Premium',
      popular: true,
    },
    {
      name: 'VIP',
      description: 'Enhanced experience with personalized support',
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      features: [
        'All Premium features',
        'Personal matchmaking consultant',
        'Unlimited saved profiles',
        'Profile verification badge',
        'Featured in "Top Picks"',
        'Read receipts for messages',
        'Priority customer support',
      ],
      cta: 'Go VIP',
      popular: false,
    },
  ]
  
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Select the perfect plan to enhance your matchmaking experience.
          </p>
          
          {/* Toggle */}
          <div className="inline-flex items-center bg-neutral-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Yearly <span className="text-accent-500 font-bold">Save 16%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden ${
                plan.popular
                  ? 'border-2 border-primary-500 shadow-lg relative'
                  : 'border border-neutral-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="bg-primary-500 text-white text-sm font-bold py-1 px-4 absolute top-0 right-0 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-neutral-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${billingCycle === 'monthly' ? plan.monthlyPrice.toFixed(2) : plan.yearlyPrice.toFixed(2)}
                  </span>
                  <span className="text-neutral-500">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/plans"
                  className={`w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPlans