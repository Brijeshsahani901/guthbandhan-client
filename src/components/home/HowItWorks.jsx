import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up and build your detailed profile including photos, personal information, and preferences.'
  },
  {
    number: '02',
    title: 'Discover Matches',
    description: 'Browse through potential matches filtered according to your preferences and compatibility.'
  },
  {
    number: '03',
    title: 'Connect and Chat',
    description: 'Express interest in profiles you like and start conversations with your matches.'
  },
  {
    number: '04',
    title: 'Meet in Person',
    description: 'When you are ready, take the relationship offline and meet your match in person.'
  },
]

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Guthandhan Works</h2>
          <p className="text-lg text-neutral-600">
            Our simple four-step process helps you find and connect with compatible matches.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step number */}
              <div className="text-6xl font-bold text-neutral-100 absolute -top-10 left-0 z-0">
                {step.number}
              </div>
              
              {/* Content */}
              <div className="bg-white p-6 rounded-xl shadow-sm relative z-10 h-full border-t-4 border-primary-500">
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
              
              {/* Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20 text-primary-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks