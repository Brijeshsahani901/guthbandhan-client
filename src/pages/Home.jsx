// import { useEffect } from 'react'
// import Hero from '../components/home/Hero'
// import Features from '../components/home/Features'
// import HowItWorks from '../components/home/HowItWorks'
// import Testimonials from '../components/home/Testimonials'
// import PricingPlans from '../components/home/PricingPlans'
// import CTASection from '../components/home/CTASection'

// const Home = () => {
//   useEffect(() => {
//     document.title = 'Guthbandhan | Find Your Perfect Match'
//   }, [])

//   return (
//     <div>
//       <Hero />
//       <Features />
//       <HowItWorks />
//       {/* <Testimonials /> */}
//       {/* <PricingPlans /> */}
//       {/* <CTASection /> */}
//     </div>
//   )
// }

// export default Home

import { useEffect } from 'react'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import { motion } from 'framer-motion'

const Home = () => {
  useEffect(() => {
    document.title = 'Guthbandhan | Find Your Perfect Match'
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Testimonials /> */}
      {/* <PricingPlans /> */}
      {/* <CTASection /> */}
    </motion.div>
  )
}

export default Home