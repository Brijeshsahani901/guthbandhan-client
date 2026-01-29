// import { useEffect, useState } from 'react'
// import { Outlet, useLocation } from 'react-router-dom'
// import Header from '../components/layout/Header'
// import Footer from '../components/layout/Footer'
// import ScrollToTop from '../components/common/ScrollToTop'
// const MainLayout = () => {
//   const location = useLocation()
//   const [isScrolled, setIsScrolled] = useState(false)
  
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
    
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])
  
//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location.pathname])

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header isScrolled={isScrolled} />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <Footer />
//       <ScrollToTop />
//     </div>
//   )
// }

// export default MainLayout

import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CLOSE drawer on route change (reliable now)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
