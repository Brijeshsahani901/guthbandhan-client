// import { useState, useEffect, useRef } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";

// const Header = ({ isScrolled,  mobileMenuOpen,
//   setMobileMenuOpen, }) => {
//   const { isAuthenticated, user, logout } = useAuth();
//   // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);
//   const drawerRef = useRef(null);
//   const isHome = location.pathname === "/";

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setProfileDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Prevent body scroll when drawer is open
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [mobileMenuOpen]);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     setMobileMenuOpen(false);
//   };

//   // Navigation links
//   const navLinks = [
//     { to: "/", label: "Home", icon: "🏠", exact: true },
//     { to: "/browse", label: "Browse", icon: "👥" },
//     { to: "/wedding-services", label: "Services", icon: "💒" },
//   ];

//   // User dropdown items
//   const userDropdownItems = [
//     { to: "/user/dashboard", label: "Dashboard", icon: "📊" },
//     { to: "/user/edit-profile", label: "Edit Profile", icon: "✏️" },
//     { to: "/user/saved", label: "Shortlisted", icon: "❤️", badge: 5 },
//     { to: "/user/interests", label: "Interests", icon: "👀", badge: 3 },
//     { to: "/user/messages", label: "Messages", icon: "💬", badge: 12 },
//     { to: "/user/upgrade", label: "Upgrade Plan", icon: "⭐" },
//   ];
//   const authItems = [
//     { to: "/auth/login", label: "Sign In", icon: "🔑" },
//     { to: "/auth/register", label: "Register Free", icon: "✨", primary: true },
//   ];

//   const handleMobileNavigate = (to) => {
//   setMobileMenuOpen(false);

//   // wait for animation to start
//   setTimeout(() => {
//     navigate(to);
//   }, 150);
// };


// useEffect(() => {
//   console.log("STATE CHANGED:", mobileMenuOpen);
// }, [mobileMenuOpen]);

//   return (
//     <>
//       {/* Header */}
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
//     ${
//       isHome
//         ? isScrolled
//           ? "bg-white/95 shadow-2xl shadow-black/5 py-2 border-b border-white/20"
//           : "bg-gradient-to-b from-black/20 via-black/10 to-transparent py-3"
//         : "bg-white shadow-md py-2 border-b border-neutral-200"
//     }
//   `}
//       >
//         <div className="container-custom flex items-center justify-between">
//           {/* Logo */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="cursor-pointer group"
//               onClick={() => navigate("/")}
//             >
//               <div className="relative">
//                 <img
//                   className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:opacity-90"
//                   src="/gutbandhan.png"
//                   alt="Guthbandhan"
//                 />
//                 {isAuthenticated && user?.premium && (
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute -top-1 -right-2"
//                   >
//                     <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white">
//                       PRO
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Desktop Navigation - Centered & Compact */}
//           <nav className="hidden lg:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 end={link.exact}
//                 className={({ isActive }) => `
//     relative px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm
//     flex items-center gap-2 group mx-1
//     ${
//       isActive
//         ? link.featured
//           ? "text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30"
//           : "text-white bg-gradient-to-r from-primary-600 to-pink-600 shadow-lg shadow-primary-500/30"
//         : isHome && !isScrolled
//           ? "text-white hover:bg-white/10"
//           : "text-neutral-700 hover:text-primary-600 hover:bg-white/50"
//     }
//   `}
//               >
//                 <span className="text-base transition-transform duration-300 group-hover:scale-110">
//                   {link.icon}
//                 </span>
//                 <span>{link.label}</span>
//                 {link.featured && (
//                   <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
//                 )}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Right Section - Compact */}
//           <div className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
//             {isAuthenticated ? (
//               <>
//                 {/* Profile */}
//                 <div className="relative">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                     className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-white/90 to-neutral-50/90 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200 shadow-sm"
//                   >
//                     <div className="relative">
//                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
//                         {user?.name?.charAt(0) || "U"}
//                       </div>
//                       <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                     </div>
//                     <motion.svg
//                       animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="w-4 h-4 text-neutral-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </motion.svg>
//                   </motion.button>

//                   {/* Dropdown Menu */}
//                   <AnimatePresence>
//                     {profileDropdownOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                         transition={{ duration: 0.15 }}
//                         className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 py-2 z-50 border border-white/20"
//                       >
//                         {/* User Info */}
//                         <div className="px-4 py-3 border-b border-white/10">
//                           <div className="font-semibold text-neutral-900 text-sm">
//                             {user?.name || "Welcome"}
//                           </div>
//                           <div className="text-xs text-neutral-500 truncate">
//                             {user?.email}
//                           </div>
//                           {user?.premium && (
//                             <div className="mt-1">
//                               <span className="text-xs bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-0.5 rounded-full">
//                                 Premium Member
//                               </span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Menu Items */}
//                         <div className="py-1">
//                           {userDropdownItems.map((item) => (
//                             <Link
//                               key={item.to}
//                               to={item.to}
//                               className="flex items-center justify-between px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-pink-50/50 transition-all duration-200 group"
//                               onClick={() => setProfileDropdownOpen(false)}
//                             >
//                               <div className="flex items-center gap-3">
//                                 <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
//                                   <span className="text-xs">{item.icon}</span>
//                                 </div>
//                                 <span>{item.label}</span>
//                               </div>
//                             </Link>
//                           ))}
//                         </div>

//                         {/* Logout */}
//                         <div className="border-t border-white/10 pt-1">
//                           <button
//                             onClick={handleLogout}
//                             className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 transition-all duration-200 group"
//                           >
//                             <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">
//                               <span className="text-xs">🚪</span>
//                             </div>
//                             <span>Sign Out</span>
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Link
//                   to="/auth/login"
//                   className={`px-4 py-2 font-medium text-sm rounded-xl transition-all duration-300 ${
//                     isHome && !isScrolled
//                       ? "text-white hover:bg-white/10"
//                       : "text-primary-600 hover:text-primary-700 hover:bg-primary-50/80"
//                   }`}
//                 >
//                   Sign In
//                 </Link>

//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link
//                     to="/auth/register"
//                     className="px-5 py-2 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:from-primary-600 hover:to-pink-600 transition-all duration-300"
//                   >
//                     Join Free
//                   </Link>
//                 </motion.div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             data-menu-button
//             whileTap={{ scale: 0.9 }}
//             className="lg:hidden p-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200 shadow-sm"
//        onClick={() => setMobileMenuOpen(prev => !prev)}

//           >
//             <AnimatePresence>
//               {mobileMenuOpen ? (
//                 <motion.svg
//                   key="close"
//                   initial={{ rotate: -90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: 90, opacity: 0 }}
//                   className="w-5 h-5 text-neutral-700"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </motion.svg>
//               ) : (
//                 <motion.svg
//                   key="menu"
//                   initial={{ rotate: 90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: -90, opacity: 0 }}
//                   className="w-5 h-5 text-neutral-700"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </motion.svg>
//               )}
//             </AnimatePresence>
//           </motion.button>
//         </div>
//       </header>

//       {/* Mobile Drawer */}
//    <AnimatePresence>

//         {mobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//               onClick={() => setMobileMenuOpen(false)}
//             />

//             {/* Drawer */}
//             <motion.div
//               ref={drawerRef}
//                 key={`mobile-drawer-${location.pathname}`}
//                onClick={(e) => e.stopPropagation()} 
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-white to-neutral-50/95 backdrop-blur-xl z-50 lg:hidden shadow-2xl shadow-black/20"
//             >
//               {/* Drawer Header */}
//               <div className="p-6 border-b border-white/10">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3">
//                     <img
//                       className="h-10 w-auto"
//                       src="/gutbandhan.png"
//                       alt="Guthbandhan"
//                     />
//                     <div className="text-xs bg-gradient-to-r from-primary-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
//                       MATRIMONY
//                     </div>
//                   </div>
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       console.log("CLOSING DRAWER");
//                       setMobileMenuOpen(false);
//                     }}
//                     className="p-2 rounded-lg bg-white/80"
//                   >
//                     <svg
//                       className="w-4 h-4 text-neutral-700"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 {/* User Info if logged in */}
//                 {isAuthenticated && (
//                   <div className="p-4 rounded-2xl bg-gradient-to-r from-white to-primary-50/50 border border-primary-100/50">
//                     <div className="flex items-center gap-3">
//                       <div className="relative">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                           {user?.name?.charAt(0) || "U"}
//                         </div>
//                         <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//                       </div>
//                       <div className="flex-1">
//                         <div className="font-bold text-neutral-900">
//                           {user?.name || "User"}
//                         </div>
//                         <div className="text-xs text-neutral-500 mt-0.5">
//                           {user?.email}
//                         </div>
//                       </div>
//                       {user?.premium && (
//                         <div className="text-xs bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-full font-bold">
//                           PRO
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Drawer Content */}
//               <div className="p-6 h-[calc(100vh-160px)] overflow-y-auto">
//                 {/* Main Navigation */}
//                 <nav className="mb-8">
//                   <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
//                     Navigation
//                   </div>
//                   <div className="space-y-2">
//                     {navLinks.map((link) => (
//                       <NavLink
//                         key={link.to}
//                         to={link.to}
//                         end={link.exact}
//                         className={({ isActive }) => `
//                           flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
//                           ${
//                             isActive
//                               ? link.featured
//                                 ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
//                                 : "bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg"
//                               : "text-neutral-700 hover:bg-white/50 hover:shadow-sm"
//                           }
//                         `}
//                        onClick={() => handleMobileNavigate(link.to)}
//                       >
//                         <div
//                           className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                             link.featured
//                               ? "bg-amber-100/20 text-amber-100"
//                               : "bg-white/20 text-white"
//                           }`}
//                         >
//                           <span className="text-lg">{link.icon}</span>
//                         </div>
//                         <span className="font-medium">{link.label}</span>
//                         {link.featured && (
//                           <span className="ml-auto text-xs bg-white/30 px-2 py-0.5 rounded-full">
//                             New
//                           </span>
//                         )}
//                       </NavLink>
//                     ))}
//                   </div>
//                 </nav>

//                 {/* User Menu or Auth */}
//                 {isAuthenticated ? (
//                   <>
//                     {/* Quick Stats */}
//                     <div className="mb-6">
//                       <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
//                         Your Activity
//                       </div>
//                       <div className="grid grid-cols-3 gap-3">
//                         {[
//                           {
//                             label: "Matches",
//                             value: "24",
//                             icon: "💝",
//                             color: "from-pink-500 to-rose-500",
//                           },
//                           {
//                             label: "Messages",
//                             value: "12",
//                             icon: "💬",
//                             color: "from-blue-500 to-cyan-500",
//                           },
//                           {
//                             label: "Views",
//                             value: "156",
//                             icon: "👀",
//                             color: "from-emerald-500 to-teal-500",
//                           },
//                         ].map((stat, index) => (
//                           <motion.div
//                             key={index}
//                             whileHover={{ y: -2 }}
//                             className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-3 text-center shadow-sm"
//                           >
//                             <div
//                               className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
//                             >
//                               <span className="text-sm">{stat.icon}</span>
//                             </div>
//                             <div className="font-bold text-neutral-900">
//                               {stat.value}
//                             </div>
//                             <div className="text-xs text-neutral-500">
//                               {stat.label}
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="mb-6">
//                       <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
//                         Quick Actions
//                       </div>
//                       <div className="grid grid-cols-3 gap-3">
//                         {userDropdownItems.slice(0, 6).map((item, index) => (
//                           <Link
//                             key={item.to}
//                             to={item.to}
//                             className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center mb-2">
//                               <span className="text-base">{item.icon}</span>
//                             </div>
//                             <span className="text-xs font-medium text-neutral-700 text-center">
//                               {item.label}
//                             </span>
//                             {item.badge && (
//                               <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                                 {item.badge}
//                               </span>
//                             )}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Logout Button */}
//                     <motion.button
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleLogout}
//                       className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-white to-red-50/80 border border-red-200 text-red-600 font-semibold hover:border-red-300 hover:shadow-lg transition-all duration-200 mb-4"
//                     >
//                       <svg
//                         className="w-5 h-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                         />
//                       </svg>
//                       Sign Out
//                     </motion.button>
//                   </>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="text-center mb-6">
//                       <div className="text-lg font-bold text-neutral-900 mb-2">
//                         Find Your Perfect Match
//                       </div>
//                       <div className="text-sm text-neutral-600">
//                         Join millions finding their life partners
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       {authItems.map((item) => (
//                         <motion.div key={item.to} whileHover={{ y: -2 }}>
//                           <Link
//                             to={item.to}
//                             className={`flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
//                               item.primary
//                                 ? "bg-gradient-to-r from-primary-500 to-pink-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50"
//                                 : "bg-white/80 backdrop-blur-sm border border-white/30 text-neutral-700 hover:border-primary-300 hover:shadow-lg"
//                             }`}
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             <span className="text-base">{item.icon}</span>
//                             {item.label}
//                           </Link>
//                         </motion.div>
//                       ))}
//                     </div>

//                     <div className="text-center text-xs text-neutral-500 pt-4 border-t border-white/10">
//                       By continuing, you agree to our Terms & Privacy Policy
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;


// Header.js में इन useEffect को जोड़ें
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ isScrolled }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null); // Menu button के लिए ref
  const isHome = location.pathname === "/";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Profile dropdown के लिए
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      
      // Mobile drawer के लिए
      if (
        mobileMenuOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Touch devices के लिए
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Mobile menu button handler
  const handleMenuToggle = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Navigation links
  const navLinks = [
    { to: "/", label: "Home", icon: "🏠", exact: true },
    { to: "/browse", label: "Browse", icon: "👥" },
    { to: "/wedding-services", label: "Services", icon: "💒" },
  ];

  // User dropdown items
  const userDropdownItems = [
    { to: "/user/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/user/edit-profile", label: "Edit Profile", icon: "✏️" },
    { to: "/user/saved", label: "Shortlisted", icon: "❤️", badge: 5 },
    { to: "/user/interests", label: "Interests", icon: "👀", badge: 3 },
    { to: "/user/messages", label: "Messages", icon: "💬", badge: 12 },
    { to: "/user/upgrade", label: "Upgrade Plan", icon: "⭐" },
  ];

  const authItems = [
    { to: "/auth/login", label: "Sign In", icon: "🔑" },
    { to: "/auth/register", label: "Register Free", icon: "✨", primary: true },
  ];

  // Drawer content click handler
  const handleDrawerContentClick = (e) => {
    // Drawer के अंदर क्लिक को बाहर propagate नहीं होने दें
    e.stopPropagation();
  };

  const handleMobileNavigate = (to) => {
  // 1️⃣ Pehle drawer close karo
  setMobileMenuOpen(false);

  // 2️⃣ Next frame me navigate karo
  // (taaki state commit ho jaaye)
  requestAnimationFrame(() => {
    navigate(to);
  });
};

  // Backdrop click handler
  const handleBackdropClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${
            isHome
              ? isScrolled
                ? "bg-white/95 shadow-2xl shadow-black/5 py-2 border-b border-white/20"
                : "bg-gradient-to-b from-black/20 via-black/10 to-transparent py-3"
              : "bg-white shadow-md py-2 border-b border-neutral-200"
          }
        `}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <img
                  className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:opacity-90"
                  src="/gutbandhan.png"
                  alt="Guthbandhan"
                />
                {isAuthenticated && user?.premium && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white">
                      PRO
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation - Centered & Compact */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) => `
                  relative px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm
                  flex items-center gap-2 group mx-1
                  ${
                    isActive
                      ? link.featured
                        ? "text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30"
                        : "text-white bg-gradient-to-r from-primary-600 to-pink-600 shadow-lg shadow-primary-500/30"
                      : isHome && !isScrolled
                        ? "text-white hover:bg-white/10"
                        : "text-neutral-700 hover:text-primary-600 hover:bg-white/50"
                  }
                `}
              >
                <span className="text-base transition-transform duration-300 group-hover:scale-110">
                  {link.icon}
                </span>
                <span>{link.label}</span>
                {link.featured && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Section - Compact */}
          <div className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                {/* Profile */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-white/90 to-neutral-50/90 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200 shadow-sm"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <motion.svg
                      animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-neutral-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 py-2 z-50 border border-white/20"
                      >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-white/10">
                          <div className="font-semibold text-neutral-900 text-sm">
                            {user?.name || "Welcome"}
                          </div>
                          <div className="text-xs text-neutral-500 truncate">
                            {user?.email}
                          </div>
                          {user?.premium && (
                            <div className="mt-1">
                              <span className="text-xs bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-0.5 rounded-full">
                                Premium Member
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                          {userDropdownItems.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="flex items-center justify-between px-4 py-2.5 text-sm text-neutral-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-pink-50/50 transition-all duration-200 group"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <span className="text-xs">{item.icon}</span>
                                </div>
                                <span>{item.label}</span>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-white/10 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 transition-all duration-200 group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <span className="text-xs">🚪</span>
                            </div>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className={`px-4 py-2 font-medium text-sm rounded-xl transition-all duration-300 ${
                    isHome && !isScrolled
                      ? "text-white hover:bg-white/10"
                      : "text-primary-600 hover:text-primary-700 hover:bg-primary-50/80"
                  }`}
                >
                  Sign In
                </Link>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth/register"
                    className="px-5 py-2 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:from-primary-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Join Free
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            ref={menuButtonRef}
            data-menu-button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200 shadow-sm"
            onClick={handleMenuToggle}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="w-5 h-5 text-neutral-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="w-5 h-5 text-neutral-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={handleBackdropClick}
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-white to-neutral-50/95 backdrop-blur-xl z-50 lg:hidden shadow-2xl shadow-black/20"
              onClick={handleDrawerContentClick}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-auto"
                      src="/gutbandhan.png"
                      alt="Guthbandhan"
                    />
                    <div className="text-xs bg-gradient-to-r from-primary-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
                      MATRIMONY
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/80"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-4 h-4 text-neutral-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* User Info if logged in */}
                {isAuthenticated && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-white to-primary-50/50 border border-primary-100/50">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-neutral-900">
                          {user?.name || "User"}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {user?.email}
                        </div>
                      </div>
                      {user?.premium && (
                        <div className="text-xs bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-full font-bold">
                          PRO
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Content */}
              <div className="p-6 h-[calc(100vh-160px)] overflow-y-auto">
                {/* Main Navigation */}
                <nav className="mb-8">
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    Navigation
                  </div>
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                     <button
  type="button"
  onClick={() => handleMobileNavigate(link.to)}
  className={`
    w-full text-left
    flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
    ${
      location.pathname === link.to
        ? "bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg"
        : "text-neutral-700 hover:bg-white/50 hover:shadow-sm"
    }
  `}
>

                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            link.featured
                              ? "bg-amber-100/20 text-amber-100"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          <span className="text-lg">{link.icon}</span>
                        </div>
                        <span className="font-medium">{link.label}</span>
                        {link.featured && (
                          <span className="ml-auto text-xs bg-white/30 px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* User Menu or Auth */}
                {isAuthenticated ? (
                  <>
               
                    {/* Quick Actions */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                        Quick Actions
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {userDropdownItems.slice(0, 6).map((item, index) => (
                          <button
                            key={item.to}
                            to={item.to}
                            className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
                            onClick={() => handleMobileNavigate(item.to)}
                          >
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center mb-2">
                              <span className="text-base">{item.icon}</span>
                            </div>
                            <span className="text-xs font-medium text-neutral-700 text-center">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout Button */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-white to-red-50/80 border border-red-200 text-red-600 font-semibold hover:border-red-300 hover:shadow-lg transition-all duration-200 mb-4"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="text-lg font-bold text-neutral-900 mb-2">
                        Find Your Perfect Match
                      </div>
                      <div className="text-sm text-neutral-600">
                        Join millions finding their life partners
                      </div>
                    </div>

                    <div className="space-y-3">
                      {authItems.map((item) => (
                        <motion.div key={item.to} whileHover={{ y: -2 }}>
                          <Link
                            to={item.to}
                            className={`flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                              item.primary
                                ? "bg-gradient-to-r from-primary-500 to-pink-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50"
                                : "bg-white/80 backdrop-blur-sm border border-white/30 text-neutral-700 hover:border-primary-300 hover:shadow-lg"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center text-xs text-neutral-500 pt-4 border-t border-white/10">
                      By continuing, you agree to our Terms & Privacy Policy
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;