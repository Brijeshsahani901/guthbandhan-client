import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loader from '../common/Loader'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth()
  
  if (loading) {
    return <Loader />
  }
  
  if (!isAuthenticated || user?.role !== 'A' || user?.role !="P") {
    return <Navigate to="/auth/login" replace />
  }
  
  return children
}

export default AdminRoute