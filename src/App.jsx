import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

// Common Components
import Loader from "./components/common/Loader";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const WeddingServices = lazy(() => import("./pages/WeddingServices"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const SubscriptionPlans = lazy(() => import("./pages/SubscriptionPlans"));
const Browse = lazy(() => import("./pages/Browse"));
const ProfileDetail = lazy(() => import("./pages/ProfileDetail"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const EditProfile = lazy(() => import("./pages/user/EditProfile"));
const SavedProfiles = lazy(() => import("./pages/user/SavedProfiles"));
const Interests = lazy(() => import("./pages/user/Interests"));
const Messages = lazy(() => import("./pages/user/Messages"));
const UpgradePlan = lazy(() => import("./pages/user/UpgradePlan"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminSubscriptions = lazy(() => import("./pages/admin/Subscriptions"));
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

// 404 Page
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="plans" element={<SubscriptionPlans />} />
          <Route path="browse" element={<Browse />} />
          <Route path="wedding-services" element={<WeddingServices />} />
          <Route path="profile/:id" element={<ProfileDetail />} />
        </Route>

        {/* Auth Routes */}
        {/* <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/user/dashboard" />
            }
          />
          <Route
            path="register"
            element={
              !isAuthenticated ? (
                <Register />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            }
          />
        </Route> */}

        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/user/dashboard" />
            }
          />
          <Route
            path="register"
            element={
              !isAuthenticated ? (
                <Register />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            }
          />
          <Route
            path="forgot-password"
            element={
              !isAuthenticated ? (
                <ForgotPassword />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            }
          />
        </Route>

        {/* Protected User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="saved" element={<SavedProfiles />} />
          <Route path="interests" element={<Interests />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:profileId?" element={<Messages />} />
          <Route path="upgrade" element={<UpgradePlan />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            // <AdminRoute>
            <AdminLayout />
            // </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="subscriptions" element={<AdminSubscriptions />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
