// import { motion } from 'framer-motion'

// const features = [
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//       </svg>
//     ),
//     title: 'Compatibility Matching',
//     description: 'Our advanced algorithm analyzes personality traits, values, and life goals to suggest highly compatible matches.',
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//         <circle cx="9" cy="7" r="4"></circle>
//         <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//         <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//       </svg>
//     ),
//     title: 'Verified Profiles',
//     description: 'Every profile is carefully verified to ensure authenticity and build a community of genuine individuals.',
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//       </svg>
//     ),
//     title: 'Privacy Controls',
//     description: 'Robust privacy settings let you control who sees your profile and how you interact with other members.',
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//       </svg>
//     ),
//     title: 'Secure Messaging',
//     description: 'Our encrypted messaging system ensures your conversations remain private and secure.',
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="10"></circle>
//         <line x1="2" y1="12" x2="22" y2="12"></line>
//         <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
//       </svg>
//     ),
//     title: 'Global Connections',
//     description: 'Connect with potential matches from around the world or focus on people in your local area.',
//   },
//   {
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//         <circle cx="12" cy="12" r="3"></circle>
//       </svg>
//     ),
//     title: 'Profile Insights',
//     description: 'Gain valuable insights into who is viewing your profile and showing interest in connecting.',
//   },
// ]

// const Features = () => {
//   return (
//     <section className="py-16 md:py-24 bg-white">
//       <div className="container-custom">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Guthandhan</h2>
//           <p className="text-lg text-neutral-600">
//             Our platform offers unique features designed to help you find meaningful connections based on compatibility and shared values.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//               <p className="text-neutral-600">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Features

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
    title: 'AI Compatibility',
    description: 'Advanced AI analyzes data to suggest perfectly compatible matches.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: 'Verified Profiles',
    description: '100% verified profiles with multi-step authentication.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    title: 'Privacy First',
    description: 'Complete control over your data and visibility.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16l-8-4-8 4V4z"></path>
      </svg>
    ),
    title: 'Secure Chat',
    description: 'End-to-end encrypted messaging for safe conversations.',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    title: 'Global Network',
    description: 'Connect with people from 50+ countries worldwide.',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
    title: 'Smart Insights',
    description: 'Real-time analytics on profile views and compatibility.',
    gradient: 'from-indigo-500 to-blue-500'
  },
]

const Features = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full mb-4">
            <span className="text-primary-600 font-medium text-sm">FEATURES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pink-500">
              Guthbandhan
            </span>
          </h2>
          <p className="text-neutral-600">
            Our platform combines technology with understanding to create meaningful connections.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="relative bg-white p-6 rounded-xl border border-neutral-200 hover:border-transparent hover:shadow-lg transition-all duration-300">
                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}
                  whileHover={{ rotate: 3, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                      {feature.icon}
                  </div>
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features