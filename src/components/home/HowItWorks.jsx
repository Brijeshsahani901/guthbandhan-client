// import { motion } from 'framer-motion'

// const steps = [
//   {
//     number: '01',
//     title: 'Create Your Profile',
//     description: 'Sign up and build your detailed profile including photos, personal information, and preferences.'
//   },
//   {
//     number: '02',
//     title: 'Discover Matches',
//     description: 'Browse through potential matches filtered according to your preferences and compatibility.'
//   },
//   {
//     number: '03',
//     title: 'Connect and Chat',
//     description: 'Express interest in profiles you like and start conversations with your matches.'
//   },
//   {
//     number: '04',
//     title: 'Meet in Person',
//     description: 'When you are ready, take the relationship offline and meet your match in person.'
//   },
// ]

// const HowItWorks = () => {
//   return (
//     <section className="py-16 md:py-24 bg-neutral-50">
//       <div className="container-custom">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">How Guthandhan Works</h2>
//           <p className="text-lg text-neutral-600">
//             Our simple four-step process helps you find and connect with compatible matches.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="relative"
//             >
//               {/* Step number */}
//               <div className="text-6xl font-bold text-neutral-100 absolute -top-10 left-0 z-0">
//                 {step.number}
//               </div>
              
//               {/* Content */}
//               <div className="bg-white p-6 rounded-xl shadow-sm relative z-10 h-full border-t-4 border-primary-500">
//                 <h3 className="text-xl font-bold mb-3">{step.title}</h3>
//                 <p className="text-neutral-600">{step.description}</p>
//               </div>
              
//               {/* Arrow (except for last item) */}
//               {index < steps.length - 1 && (
//                 <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20 text-primary-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="5" y1="12" x2="19" y2="12"></line>
//                     <polyline points="12 5 19 12 12 19"></polyline>
//                   </svg>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default HowItWorks

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '1',
    title: 'Create Profile',
    description: 'Sign up and build your detailed profile with photos and preferences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    )
  },
  {
    number: '2',
    title: 'Find Matches',
    description: 'Browse through compatible matches filtered by your preferences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    )
  },
  {
    number: '3',
    title: 'Connect',
    description: 'Start conversations with your matches in a secure environment.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    )
  },
  {
    number: '4',
    title: 'Meet',
    description: 'Take the next step and meet your match in person.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
]

const HowItWorks = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full mb-4">
            <span className="text-primary-600 font-medium text-sm">HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            Find Your Match in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pink-500">
              4 Easy Steps
            </span>
          </h2>
          <p className="text-neutral-600">
            Simple and straightforward process to connect with compatible partners.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div ref={ref} className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                  
                  {/* Step Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                    {step.icon}
                  </div>
                  
                  {/* Step Content */}
                  <h3 className="text-lg font-bold mb-3 text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <>
                    {/* Mobile Arrow */}
                    <div className="md:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14m0 0l-7-7m7 7l7-7"/>
                      </svg>
                    </div>
                    
                    {/* Desktop Arrow */}
                    <div className="hidden lg:block absolute top-16 right-0 transform translate-x-1/2 -translate-y-1/2 text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 5l7 7-7 7M5 12h15"/>
                      </svg>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-6">
            Ready to start your journey?
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a 
              href="/auth/register" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Get Started Free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks