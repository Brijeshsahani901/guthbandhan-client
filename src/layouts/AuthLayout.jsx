import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Brand and Info */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-700 text-white p-8 flex-col justify-between">
        <div>
          {/* <Link to="/" className="flex items-center gap-2 mb-16">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="text-xl font-serif font-bold">Eternal Bonds</span>
          </Link> */}

          <img src="/gutbandhan.png" width={250} height={150} alt="" className='mb-10'/>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-serif font-bold mb-4">Find Your Perfect Match</h1>
            <p className="text-lg opacity-90">Join thousands of people finding their life partner through our platform.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
          >
            <div className="flex items-start mb-4">
              <div className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a2 2 0 0 1-2-2v-1"></path>
                  <path d="M7 9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l4-4h3a2 2 0 0 0 2-2v-1"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-1">Personalized Matches</h3>
                <p className="opacity-80 text-sm">Our algorithm finds matches based on your preferences and values.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold mb-1">Verified Profiles</h3>
                <p className="opacity-80 text-sm">Every profile is verified to ensure authenticity and trust.</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="text-sm opacity-80">
          <p>&copy; 2025 Guthbandhan. All rights reserved.</p>
        </div>
      </div>
      
      {/* Right side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full">
          <Link to="/" className="flex md:hidden items-center  mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="text-xl font-serif font-bold text-primary-600">Guthbandhan</span>
          </Link>
          
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout