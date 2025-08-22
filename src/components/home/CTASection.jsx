import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-neutral-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100 rounded-full opacity-60 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-100 rounded-full opacity-60 blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-custom relative z-10">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="h-64 md:h-auto relative">
              <img 
                src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Happy couple" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-primary-900/10"></div>
            </div>
            
            {/* Content side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Perfect Match?
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Join thousands of singles who have found meaningful relationships through Guthandhan. Your journey to lasting love starts with a simple step.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register" className="btn-primary text-center">
                  Create Your Profile
                </Link>
                <Link to="/browse" className="btn-outline text-center">
                  Browse Matches
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection