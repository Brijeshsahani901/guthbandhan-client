// // import { Link } from 'react-router-dom'
// // import { motion } from 'framer-motion'

// // const Hero = () => {
// //   return (
// //     <section className="relative min-h-screen flex items-center overflow-hidden">
// //       {/* Background */}
// //       <div className="absolute inset-0 z-0">
// //         <img 
// //           src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1600" 
// //           alt="Couple" 
// //           className="w-full h-full object-cover"
// //         />
// //         <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/70 to-neutral-900/30" />
// //       </div>
      
// //       {/* Content */}
// //       <div className="container-custom relative z-10 pt-28 pb-16 md:py-32">
// //         <div className="max-w-2xl">
// //           <motion.h1 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.7 }}
// //             className="text-4xl md:text-6xl font-bold text-white mb-6"
// //           >
// //             Find Your Perfect <span className="text-primary-400">Match</span> Today
// //           </motion.h1>
          
// //           <motion.p 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.7, delay: 0.2 }}
// //             className="text-lg md:text-xl text-white/90 mb-8"
// //           >
// //             Guthandhan is the premier matchmaking service that connects compatible individuals based on shared values, interests, and life goals. Start your journey to meaningful connection today.
// //           </motion.p>
          
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.7, delay: 0.4 }}
// //             className="flex flex-col sm:flex-row gap-4"
// //           >
// //             <Link to="/auth/register" className="btn-primary text-center">
// //               Create Your Profile
// //             </Link>
// //             <Link to="/browse" className="btn bg-white text-primary-600 hover:bg-neutral-100 focus:ring-primary-500 text-center">
// //               Browse Matches
// //             </Link>
// //           </motion.div>
          
// //           <motion.div 
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ duration: 0.7, delay: 0.6 }}
// //             className="mt-12 flex items-center gap-6"
// //           >
// //             <div className="flex -space-x-2">
// //               <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
// //               <img src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
// //               <img src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=100" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
// //               <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
// //             </div>
// //             <p className="text-white">
// //               <span className="font-bold">10,000+</span> happy couples matched
// //             </p>
// //           </motion.div>
// //         </div>
// //       </div>
      
// //       {/* Wave shape at bottom */}
// //       <div className="absolute bottom-0 left-0 right-0">
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full">
// //           <path 
// //             fill="#FFFFFF" 
// //             fillOpacity="1" 
// //             d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
// //           ></path>
// //         </svg>
// //       </div>
// //     </section>
// //   )
// // }

// // export default Hero

// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'

// const Hero = () => {
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   const images = [
//     'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     'https://images.unsplash.com/photo-1529255484355-cb73c33c04bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
//   ]

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
//     }, 6000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
//       {/* Background Images */}
//       <div className="absolute inset-0 z-0">
//         {images.map((img, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{ 
//               opacity: currentImageIndex === index ? 1 : 0,
//               scale: currentImageIndex === index ? 1 : 1.05
//             }}
//             transition={{ duration: 1.2 }}
//             className="absolute inset-0"
//           >
//             <img 
//               src={img} 
//               alt={`Couple ${index + 1}`} 
//               className="w-full h-full object-cover"
//               onLoad={() => setImageLoaded(true)}
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/40" />
//           </motion.div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="container-custom relative z-10 py-20 px-4">
//         <div className="max-w-3xl mx-auto">
//           {/* Tagline */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-6"
//           >
//             <span className="inline-flex items-center px-4 py-2 bg-primary-500/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium border border-primary-500/20">
//               <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse"></span>
//               Trusted Matchmaking Platform
//             </span>
//           </motion.div>

//           {/* Main Heading */}
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
//           >
//             Find Your{' '}
//             <span className="relative">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-pink-400 to-primary-500">
//                 Perfect Match
//               </span>
//               <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></span>
//             </span>
//           </motion.h1>
          
//           {/* Subtitle */}
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed"
//           >
//             Guthbandhan connects compatible individuals through intelligent matching, 
//             shared values, and meaningful conversations. Your journey begins here.
//           </motion.p>
          
//           {/* CTA Buttons */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="flex flex-col sm:flex-row gap-4 mb-12"
//           >
//             <motion.div 
//               whileHover={{ scale: 1.03 }} 
//               whileTap={{ scale: 0.98 }}
//               className="flex-1"
//             >
//               <Link 
//                 to="/auth/register" 
//                 className="block w-full btn-primary text-center py-3.5 px-6 text-base font-semibold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
//               >
//                 <span className="flex items-center justify-center gap-2">
//                   Start Free Trial
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </span>
//               </Link>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.03 }} 
//               whileTap={{ scale: 0.98 }}
//               className="flex-1"
//             >
//               <Link 
//                 to="/browse" 
//                 className="block w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 focus:ring-white/30 text-center py-3.5 px-6 text-base font-semibold rounded-xl transition-all duration-300"
//               >
//                 <span className="flex items-center justify-center gap-2">
//                   Browse Profiles
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </span>
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* Stats */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="grid grid-cols-3 gap-4 max-w-md mx-auto"
//           >
//             {[
//               { number: '10K+', label: 'Matches' },
//               { number: '50+', label: 'Countries' },
//               { number: '98%', label: 'Success' }
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ 
//                   type: "spring", 
//                   stiffness: 200, 
//                   delay: 0.5 + index * 0.1 
//                 }}
//                 className="text-center"
//               >
//                 <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
//                 <div className="text-white/70 text-sm">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div 
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
//         animate={{ y: [0, 8, 0] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center">
//           <motion.div 
//             className="w-1 h-3 bg-white/60 rounded-full mt-2"
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         </div>
//       </motion.div>
//     </section>
//   )
// }

// export default Hero

// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'
// import CompactSignupForm from './FloatingSignupForm'

// const Hero = () => {
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   const images = [
//     'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     'https://images.unsplash.com/photo-1529255484355-cb73c33c04bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
//   ]

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
//     }, 6000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
//       {/* Background Images */}
//       <div className="absolute inset-0 z-0">
//         {images.map((img, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{ 
//               opacity: currentImageIndex === index ? 1 : 0,
//               scale: currentImageIndex === index ? 1 : 1.05
//             }}
//             transition={{ duration: 1.2 }}
//             className="absolute inset-0"
//           >
//             <img 
//               src={img} 
//               alt={`Couple ${index + 1}`} 
//               className="w-full h-full object-cover"
//               onLoad={() => setImageLoaded(true)}
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/40" />
//           </motion.div>
//         ))}
//       </div>

//       {/* Floating Animated Elements */}
//       <div className="absolute inset-0 z-1 overflow-hidden">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
//             initial={{ 
//               x: Math.random() * 100 + 'vw',
//               y: Math.random() * 100 + 'vh',
//               opacity: 0 
//             }}
//             animate={{
//               y: [null, `-${Math.random() * 100}px`],
//               opacity: [0, 0.5, 0],
//               scale: [0, 1, 0]
//             }}
//             transition={{
//               duration: Math.random() * 4 + 3,
//               repeat: Infinity,
//               delay: Math.random() * 2
//             }}
//           />
//         ))}
//       </div>

//       {/* Content Container with Form Sidebar */}
//       <div className="container-custom relative z-10 py-12 md:py-20 px-4">
//         <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
//           {/* Left Content */}
//           <div className="text-white">
//             {/* Tagline */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-6"
//             >
//               <span className="inline-flex items-center px-4 py-2 bg-primary-500/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium border border-primary-500/20">
//                 <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse"></span>
//                 Trusted Matchmaking Platform
//               </span>
//             </motion.div>

//             {/* Main Heading */}
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
//             >
//               Find Your{' '}
//               <span className="relative">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-pink-400 to-primary-500">
//                   Perfect Match
//                 </span>
//                 <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></span>
//               </span>
//             </motion.h1>
            
//             {/* Subtitle */}
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//               className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed"
//             >
//               Guthbandhan connects compatible individuals through intelligent matching, 
//               shared values, and meaningful conversations.
//             </motion.p>
            
//             {/* CTA Buttons */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//               className="flex flex-col sm:flex-row gap-4 mb-8"
//             >
//               <motion.div 
//                 whileHover={{ scale: 1.03 }} 
//                 whileTap={{ scale: 0.98 }}
//                 className="flex-1"
//               >
//                 <Link 
//                   to="/auth/register" 
//                   className="block w-full btn-primary text-center py-3.5 px-6 text-base font-semibold rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
//                 >
//                   <span className="flex items-center justify-center gap-2">
//                     Start Free Trial
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </span>
//                 </Link>
//               </motion.div>
              
//               <motion.div 
//                 whileHover={{ scale: 1.03 }} 
//                 whileTap={{ scale: 0.98 }}
//                 className="flex-1"
//               >
//                 <Link 
//                   to="/browse" 
//                   className="block w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 focus:ring-white/30 text-center py-3.5 px-6 text-base font-semibold rounded-xl transition-all duration-300"
//                 >
//                   <span className="flex items-center justify-center gap-2">
//                     Browse Profiles
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </span>
//                 </Link>
//               </motion.div>
//             </motion.div>

//             {/* Stats */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="grid grid-cols-3 gap-4 max-w-md"
//             >
//               {[
//                 { number: '10K+', label: 'Matches' },
//                 { number: '50+', label: 'Countries' },
//                 { number: '98%', label: 'Success' }
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 200, 
//                     delay: 0.5 + index * 0.1 
//                   }}
//                   className="text-center"
//                 >
//                   <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
//                   <div className="text-white/70 text-sm">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Right Side - Compact Signup Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="relative"
//           >
//             <CompactSignupForm />
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div 
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
//         animate={{ y: [0, 8, 0] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center">
//           <motion.div 
//             className="w-1 h-3 bg-white/60 rounded-full mt-2"
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         </div>
//       </motion.div>
//     </section>
//   )
// }

// export default Hero

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import CompactSignupForm from './FloatingSignupForm'

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1571984129381-41d698ebca6b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1621801306185-8c0ccf9c8eb8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.05
            }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img 
              src={img} 
              alt={`Couple ${index + 1}`} 
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/40" />
          </motion.div>
        ))}
      </div>

      {/* Content Container with Form Sidebar */}
      <div className="container-custom relative z-10 py-12 md:py-16 px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="lg:col-span-2 text-white">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3 py-1.5 bg-primary-500/10 backdrop-blur-sm rounded-full text-primary-300 text-xs font-medium border border-primary-500/20">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-1.5 animate-pulse"></span>
                Trusted Matchmaking Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight"
            >
              Find Your{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-pink-400 to-primary-500">
                  Perfect Match
                </span>
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></span>
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-white/85 mb-6 leading-relaxed"
            >
              Guthbandhan connects compatible individuals through intelligent matching, 
              shared values, and meaningful conversations.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 max-w-xs mb-6"
            >
              {[
                { number: '10K+', label: 'Matches' },
                { number: '50+', label: 'Countries' },
                { number: '98%', label: 'Success' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    delay: 0.4 + index * 0.1 
                  }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-white mb-0.5">{stat.number}</div>
                  <div className="text-white/70 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/browse" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 text-sm font-medium rounded-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Browse Profiles
                </Link>
              </motion.div>
              <span className="text-white/50 text-sm">or</span>
              <span className="text-white/80 text-sm font-medium">Join free today</span>
            </motion.div>
          </div>

          {/* Right Side - Ultra Compact Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <CompactSignupForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero