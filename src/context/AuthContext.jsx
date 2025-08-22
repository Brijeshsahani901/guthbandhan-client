import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      const token = sessionStorage.getItem('token')
      const userData = sessionStorage.getItem('user')
      
      if (token && userData) {
        setIsAuthenticated(true)
        setUser(JSON.parse(userData))
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [])



  // Login function
  const login = (userData, token) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
  }

  // Logout function
  const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  // Update user data
 const updateUser = (newProperties) => {
  const existingUser = JSON.parse(sessionStorage.getItem('user')) || {};
  const updatedUser = { ...existingUser, ...newProperties }; // Merge old & new
  
  sessionStorage.setItem('user', JSON.stringify(updatedUser));
  setUser(updatedUser);
};

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}