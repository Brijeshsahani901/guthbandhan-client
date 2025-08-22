import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SubscriptionPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  
  useEffect(() => {
    document.title = 'Subscription Plans | Guthbandhan'
  }, [])
  
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
      limitations: [
        'Limited search filters',
        'No profile boosts',
        'No read receipts',
        'Ads displayed',
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
        'No ads',
        '1 profile boost per month',
      ],
      limitations: [
        'No personal matchmaking',
        'Limited profile boosts',
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
        'Weekly profile boosts',
        'Access to exclusive events',
      ],
      limitations: [],
      cta: 'Go VIP',
      popular: false,
    },
  ]
  
  const faqs = [
    {
      question: 'Can I change my subscription plan later?',
      answer: 'Yes, you can upgrade or downgrade your subscription at any time. If you upgrade, you will be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. Your premium features will remain active until the end of your current billing period.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard encryption and secure payment processors to ensure your financial information is always protected.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 7-day money-back guarantee for new Premium and VIP subscriptions if you are not satisfied with the service.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and Apple Pay for subscription payments.'
    },
    {
      question: 'What happens to my matches if I downgrade my plan?',
      answer: 'Your existing connections and conversations will remain accessible, but some premium features may no longer be available depending on which plan you downgrade to.'
    },
  ]
  
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              Choose Your Perfect Plan
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-700 mb-8"
            >
              Find the subscription that best fits your needs and start your journey to finding meaningful connections.
            </motion.p>
            
            {/* Toggle */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center bg-neutral-100 p-1 rounded-lg"
            >
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Yearly <span className="text-accent-500 font-bold">Save 16%</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Plans */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
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
                  
                  <h4 className="font-semibold mb-3 text-neutral-800">What's included:</h4>
                  <ul className="space-y-3 mb-6">
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
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-3 text-neutral-800">Limitations:</h4>
                      <ul className="space-y-3 mb-8">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            <span className="text-neutral-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  <Link
                    to={plan.price === 0 ? "/auth/register" : "/auth/register?plan=" + plan.name.toLowerCase()}
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
      
      {/* Feature Comparison */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Detailed Plan Comparison</h2>
            <p className="text-neutral-700">
              Compare all features to find the perfect plan for your needs.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left p-4 font-semibold text-neutral-800">Feature</th>
                  <th className="p-4 font-semibold text-neutral-800">Basic</th>
                  <th className="p-4 font-semibold text-neutral-800 bg-primary-50">Premium</th>
                  <th className="p-4 font-semibold text-neutral-800">VIP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Profile Creation', basic: true, premium: true, vip: true },
                  { name: 'Browse Profiles', basic: true, premium: true, vip: true },
                  { name: 'See Who Liked You', basic: true, premium: true, vip: true },
                  { name: 'Daily Messages', basic: '5', premium: 'Unlimited', vip: 'Unlimited' },
                  { name: 'Saved Profiles', basic: '1', premium: '50', vip: 'Unlimited' },
                  { name: 'Advanced Search Filters', basic: false, premium: true, vip: true },
                  { name: 'See Profile Visitors', basic: false, premium: true, vip: true },
                  { name: 'Ad-Free Experience', basic: false, premium: true, vip: true },
                  { name: 'Profile Boost', basic: false, premium: '1/month', vip: 'Weekly' },
                  { name: 'Personal Matchmaking', basic: false, premium: false, vip: true },
                  { name: 'Verification Badge', basic: false, premium: false, vip: true },
                  { name: 'Featured in Top Picks', basic: false, premium: false, vip: true },
                  { name: 'Read Receipts', basic: false, premium: false, vip: true },
                  { name: 'Priority Support', basic: false, premium: false, vip: true },
                  { name: 'Exclusive Events', basic: false, premium: false, vip: true },
                ].map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                    <td className="text-left p-4 font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.basic === 'boolean' ? (
                        feature.basic ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        )
                      ) : (
                        feature.basic
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary-50">
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        )
                      ) : (
                        <span className="font-medium">{feature.premium}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.vip === 'boolean' ? (
                        feature.vip ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        )
                      ) : (
                        <span className="font-medium">{feature.vip}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-700">
              Get answers to common questions about our subscription plans.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Join thousands of members who have already found their special someone.
            </p>
            <Link to="/auth/register" className="btn-primary">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubscriptionPlans