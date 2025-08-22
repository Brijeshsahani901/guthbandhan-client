import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const Header = ({ isScrolled }) => {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const navigate = useNavigate()
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setProfileDropdownOpen(false)
  }, [navigate])
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  const navLinkClass = ({ isActive }) => 
    `px-4 py-2 rounded-md transition-colors ${
      isActive 
        ? 'text-primary-700 font-medium' 
        : 'text-neutral-700 hover:text-primary-600'
    }`

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        {/* <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span className={`text-xl font-serif font-bold ${isScrolled ? 'text-primary-600' : 'text-primary-600'}`}>
            Eternal Bonds
          </span>
        </Link> */}

        <img width={200} height={100} src='/gutbandhan.png'/>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/browse" className={navLinkClass}>Browse</NavLink>
          <NavLink to="/plans" className={navLinkClass}>Plans</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/wedding-services" className={navLinkClass}>Wedding Services</NavLink>
        </nav>

        {/* Auth Buttons or Profile */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-neutral-200"
                  >
                     {user?.role === 'A' && (
                      <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Admin Panel</Link>
                    )}
                    <Link to="/user/dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Dashboard</Link>
                    <Link to="/user/edit-profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Edit Profile</Link>
                    <Link to="/user/saved" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Shortlisted Profiles</Link>
                    <Link to="/user/interests" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Interests</Link>
                    <Link to="/user/messages" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Messages</Link>
                    <Link to="/user/upgrade" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Upgrade Plan</Link>
                   
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50">
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium">
                Sign In
              </Link>
              <Link to="/auth/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-neutral-200 shadow-lg"
          >
            <div className="container-custom py-4 flex flex-col">
              <nav className="flex flex-col space-y-2 mb-4">
                <NavLink to="/" className={navLinkClass} end>Home</NavLink>
                <NavLink to="/browse" className={navLinkClass}>Browse</NavLink>
                <NavLink to="/plans" className={navLinkClass}>Plans</NavLink>
                <NavLink to="/about" className={navLinkClass}>About</NavLink>
              </nav>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 border-t border-neutral-200 pt-4">
                  <Link to="/user/dashboard" className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md">Dashboard</Link>
                  <Link to="/user/edit-profile" className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md">Edit Profile</Link>
                  <Link to="/user/saved" className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md">Saved Profiles</Link>
                  <Link to="/user/interests" className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md">Interests</Link>
                  <Link to="/user/messages" className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md">Messages</Link>
                  <Link to="/user/upgrade" className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md">Upgrade Plan</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin/dashboard" className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md">Admin Panel</Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 text-red-600 hover:bg-neutral-50 rounded-md text-left"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link to="/auth/login" className="btn-outline w-full">
                    Sign In
                  </Link>
                  <Link to="/auth/register" className="btn-primary w-full">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header