import { useEffect } from 'react'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import PricingPlans from '../components/home/PricingPlans'
import CTASection from '../components/home/CTASection'

const Home = () => {
  useEffect(() => {
    document.title = 'Guthbandhan | Find Your Perfect Match'
  }, [])

  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingPlans />
      <CTASection />
    </div>
  )
}

export default Home