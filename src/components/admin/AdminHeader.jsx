import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({ setSidebarOpen }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  return (
    <header className="sticky top-0 z-30 h-16 bg-white shadow-sm flex items-center">
      <div className="w-full flex items-center justify-between px-4">
        {/* Left side - Menu button and Dashboard title */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <h1 className="text-xl font-semibold text-neutral-800">Admin Dashboard</h1>
        </div>
        
        {/* Right side - Icons and Sign Out button */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-neutral-700 hover:bg-neutral-100 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-md text-neutral-700 font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader