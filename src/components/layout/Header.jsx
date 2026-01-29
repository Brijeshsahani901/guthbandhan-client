// // // import { useState, useEffect } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth } from "../../context/AuthContext";
// // // import { motion, AnimatePresence } from "framer-motion";

// // // const Header = ({ isScrolled }) => {
// // //   const { isAuthenticated, user, logout } = useAuth();
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // //   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
// // //   const navigate = useNavigate();

// // //   // Close mobile menu on route change
// // //   useEffect(() => {
// // //     setMobileMenuOpen(false);
// // //     setProfileDropdownOpen(false);
// // //   }, [navigate]);

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/");
// // //   };

// // //   const navLinkClass = ({ isActive }) =>
// // //     `px-4 py-2 rounded-md transition-colors ${
// // //       isActive
// // //         ? "text-primary-700 font-medium"
// // //         : "text-neutral-700 hover:text-primary-600"
// // //     }`;

// // //   return (
// // //     <header
// // //       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// // //         isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
// // //       }`}
// // //     >
// // //       <div className="container-custom flex items-center justify-between">
// // //         {/* Logo */}
// // //         {/* <Link to="/" className="flex items-center gap-2">
// // //           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
// // //           </svg>
// // //           <span className={`text-xl font-serif font-bold ${isScrolled ? 'text-primary-600' : 'text-primary-600'}`}>
// // //             Eternal Bonds
// // //           </span>
// // //         </Link> */}

// // //         <img
// // //         className="cursor-pointer"
// // //           width={200}
// // //           height={100}
// // //           src="/gutbandhan.png"
// // //           onClick={() => navigate("/")}
// // //         />

// // //         {/* Desktop Navigation */}
// // //         <nav className="hidden md:flex items-center space-x-1">
// // //           <NavLink to="/" className={navLinkClass} end>
// // //             Home
// // //           </NavLink>
// // //           <NavLink to="/browse" className={navLinkClass}>
// // //             Browse
// // //           </NavLink>
// // //           {/* <NavLink to="/plans" className={navLinkClass}>Plans</NavLink> */}
// // //           {/* <NavLink to="/about" className={navLinkClass}>About</NavLink> */}
// // //           <NavLink to="/wedding-services" className={navLinkClass}>
// // //             Wedding Services
// // //           </NavLink>
// // //         </nav>

// // //         {/* Auth Buttons or Profile */}
// // //         <div className="hidden md:flex items-center gap-4">
// // //           {isAuthenticated ? (
// // //             <div className="relative">
// // //               <button
// // //                 onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
// // //                 className="flex items-center gap-2 p-2 rounded-full hover:bg-neutral-100 transition-colors"
// // //               >
// // //                 <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
// // //                   {user?.name?.charAt(0) || "U"}
// // //                 </div>
// // //                 <span className="font-medium">
// // //                   {user?.name?.split(" ")[0] || "User"}
// // //                 </span>
// // //                 <svg
// // //                   xmlns="http://www.w3.org/2000/svg"
// // //                   width="16"
// // //                   height="16"
// // //                   viewBox="0 0 24 24"
// // //                   fill="none"
// // //                   stroke="currentColor"
// // //                   strokeWidth="2"
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                 >
// // //                   <polyline points="6 9 12 15 18 9"></polyline>
// // //                 </svg>
// // //               </button>

// // //               <AnimatePresence>
// // //                 {profileDropdownOpen && (
// // //                   <motion.div
// // //                     initial={{ opacity: 0, y: 10 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     exit={{ opacity: 0, y: 10 }}
// // //                     transition={{ duration: 0.2 }}
// // //                     className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-neutral-200"
// // //                   >
// // //                     {user?.role === "A" && (
// // //                       <Link
// // //                         to="/admin/dashboard"
// // //                         className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
// // //                       >
// // //                         Admin Panel
// // //                       </Link>
// // //                     )}
// // //                     <Link
// // //                       to="/user/dashboard"
// // //                       className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
// // //                     >
// // //                       Dashboard
// // //                     </Link>
// // //                     <Link
// // //                       to="/user/edit-profile"
// // //                       className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
// // //                     >
// // //                       Edit Profile
// // //                     </Link>
// // //                     <Link
// // //                       to="/user/saved"
// // //                       className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
// // //                     >
// // //                       Shortlisted Profiles
// // //                     </Link>
// // //                     <Link
// // //                       to="/user/interests"
// // //                       className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
// // //                     >
// // //                       Interests
// // //                     </Link>
// // //                     <Link
// // //                       to="/user/messages"
// // //                       className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
// // //                     >
// // //                       Messages
// // //                     </Link>
// // //                     <Link
// // //                       to="/user/upgrade"
// // //                       className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
// // //                     >
// // //                       Upgrade Plan
// // //                     </Link>

// // //                     <hr className="my-1" />
// // //                     <button
// // //                       onClick={handleLogout}
// // //                       className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50"
// // //                     >
// // //                       Sign Out
// // //                     </button>
// // //                   </motion.div>
// // //                 )}
// // //               </AnimatePresence>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <Link
// // //                 to="/auth/login"
// // //                 className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
// // //               >
// // //                 Sign In
// // //               </Link>
// // //               <Link to="/auth/register" className="btn-primary">
// // //                 Register
// // //               </Link>
// // //             </>
// // //           )}
// // //         </div>

// // //         {/* Mobile Menu Button */}
// // //         <button
// // //           className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100"
// // //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //         >
// // //           {mobileMenuOpen ? (
// // //             <svg
// // //               xmlns="http://www.w3.org/2000/svg"
// // //               width="24"
// // //               height="24"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //               strokeLinejoin="round"
// // //             >
// // //               <line x1="18" y1="6" x2="6" y2="18"></line>
// // //               <line x1="6" y1="6" x2="18" y2="18"></line>
// // //             </svg>
// // //           ) : (
// // //             <svg
// // //               xmlns="http://www.w3.org/2000/svg"
// // //               width="24"
// // //               height="24"
// // //               viewBox="0 0 24 24"
// // //               fill="none"
// // //               stroke="currentColor"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //               strokeLinejoin="round"
// // //             >
// // //               <line x1="3" y1="12" x2="21" y2="12"></line>
// // //               <line x1="3" y1="6" x2="21" y2="6"></line>
// // //               <line x1="3" y1="18" x2="21" y2="18"></line>
// // //             </svg>
// // //           )}
// // //         </button>
// // //       </div>

// // //       {/* Mobile Menu */}
// // //       <AnimatePresence>
// // //         {mobileMenuOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0, height: 0 }}
// // //             animate={{ opacity: 1, height: "auto" }}
// // //             exit={{ opacity: 0, height: 0 }}
// // //             transition={{ duration: 0.3 }}
// // //             className="md:hidden bg-white border-t border-neutral-200 shadow-lg"
// // //           >
// // //             <div className="container-custom py-4 flex flex-col">
// // //               <nav className="flex flex-col space-y-2 mb-4">
// // //                 <NavLink to="/" className={navLinkClass} end>
// // //                   Home
// // //                 </NavLink>
// // //                 <NavLink to="/browse" className={navLinkClass}>
// // //                   Browse
// // //                 </NavLink>
// // //                 {/* <NavLink to="/plans" className={navLinkClass}>Plans</NavLink> */}
// // //                 {/* <NavLink to="/about" className={navLinkClass}>About</NavLink> */}
// // //                 <NavLink to="/wedding-services" className={navLinkClass}>
// // //                   Wedding Services
// // //                 </NavLink>
// // //               </nav>

// // //               {isAuthenticated ? (
// // //                 <div className="flex flex-col space-y-2 border-t border-neutral-200 pt-4">
// // //                   <Link
// // //                     to="/user/dashboard"
// // //                     className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md"
// // //                   >
// // //                     Dashboard
// // //                   </Link>
// // //                   <Link
// // //                     to="/user/edit-profile"
// // //                     className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md"
// // //                   >
// // //                     Edit Profile
// // //                   </Link>
// // //                   <Link
// // //                     to="/user/saved"
// // //                     className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md"
// // //                   >
// // //                     Saved Profiles
// // //                   </Link>
// // //                   <Link
// // //                     to="/user/interests"
// // //                     className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md"
// // //                   >
// // //                     Interests
// // //                   </Link>
// // //                   <Link
// // //                     to="/user/messages"
// // //                     className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md"
// // //                   >
// // //                     Messages
// // //                   </Link>
// // //                   <Link
// // //                     to="/user/upgrade"
// // //                     className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md"
// // //                   >
// // //                     Upgrade Plan
// // //                   </Link>
// // //                   {user?.role === "admin" && (
// // //                     <Link
// // //                       to="/admin/dashboard"
// // //                       className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-md"
// // //                     >
// // //                       Admin Panel
// // //                     </Link>
// // //                   )}
// // //                   <button
// // //                     onClick={handleLogout}
// // //                     className="px-4 py-2 text-red-600 hover:bg-neutral-50 rounded-md text-left"
// // //                   >
// // //                     Sign Out
// // //                   </button>
// // //                 </div>
// // //               ) : (
// // //                 <div className="flex flex-col space-y-3 pt-2">
// // //                   <Link to="/auth/login" className="btn-outline w-full">
// // //                     Sign In
// // //                   </Link>
// // //                   <Link to="/auth/register" className="btn-primary w-full">
// // //                     Register
// // //                   </Link>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </header>
// // //   );
// // // };

// // // export default Header;

// // import { useState, useEffect, useRef } from "react";
// // import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// // import { useAuth } from "../../context/AuthContext";
// // import { motion, AnimatePresence } from "framer-motion";

// // const Header = ({ isScrolled }) => {
// //   const { isAuthenticated, user, logout } = useAuth();
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
// //   const [hoveredNav, setHoveredNav] = useState(null);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const dropdownRef = useRef(null);

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setProfileDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Close menus on route change
// //   useEffect(() => {
// //     setMobileMenuOpen(false);
// //     setProfileDropdownOpen(false);
// //   }, [location.pathname]);

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/");
// //   };

// //   // Original navigation links with icons
// //   const navLinks = [
// //     { to: "/", label: "Home", icon: "🏠", exact: true },
// //     { to: "/browse", label: "Browse", icon: "👥" },
// //     { to: "/wedding-services", label: "Wedding Services", icon: "💒" },
// //   ];

// //   // User dropdown items with icons
// //   const userDropdownItems = [
// //     { to: "/user/dashboard", label: "Dashboard", icon: "📊" },
// //     { to: "/user/edit-profile", label: "Edit Profile", icon: "✏️" },
// //     { to: "/user/saved", label: "Shortlisted Profiles", icon: "❤️" },
// //     { to: "/user/interests", label: "Interests", icon: "👀" },
// //     { to: "/user/messages", label: "Messages", icon: "💬" },
// //     { to: "/user/upgrade", label: "Upgrade Plan", icon: "⭐" },
// //   ];

// //   const navLinkClass = ({ isActive }) =>
// //     `px-3 py-2 rounded-md transition-all duration-300 font-medium text-sm md:text-base flex items-center gap-2 ${
// //       isActive
// //         ? "text-primary-600 bg-primary-50"
// //         : `text-neutral-700 hover:text-primary-600 ${
// //             isScrolled ? "hover:bg-neutral-100" : "hover:bg-white/10"
// //           }`
// //     }`;

// //   return (
// //     <header
// //       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// //         isScrolled
// //           ? "bg-white shadow-sm py-3"
// //           : "bg-transparent py-4"
// //       }`}
// //     >
// //       <div className="container-custom flex items-center justify-between">
// //         {/* Logo - Original Image */}
// //         <motion.div
// //           initial={{ opacity: 0, x: -20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           className="flex items-center"
// //         >
// //           <div
// //             className="cursor-pointer flex items-center"
// //             onClick={() => navigate("/")}
// //           >
// //             <img
// //               className="h-10 md:h-12 w-auto"
// //               src="/gutbandhan.png"
// //               alt="Guthbandhan"
// //             />
// //           </div>
// //         </motion.div>

// //         {/* Desktop Navigation */}
// //         <nav className="hidden md:flex items-center space-x-1">
// //           {navLinks.map((link) => (
// //             <NavLink
// //               key={link.to}
// //               to={link.to}
// //               end={link.exact}
// //               className={navLinkClass}
// //               onMouseEnter={() => setHoveredNav(link.to)}
// //               onMouseLeave={() => setHoveredNav(null)}
// //             >
// //               <span className="text-lg">{link.icon}</span>
// //               {link.label}
// //             </NavLink>
// //           ))}
// //         </nav>

// //         {/* Auth Buttons or Profile */}
// //         <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
// //           {isAuthenticated ? (
// //             <div className="relative">
// //               <motion.button
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
// //                 className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
// //               >
// //                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
// //                   {user?.name?.charAt(0) || "U"}
// //                 </div>
// //                 <span className="font-medium text-sm text-neutral-700">
// //                   {user?.name?.split(" ")[0] || "User"}
// //                 </span>
// //                 <motion.svg
// //                   animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
// //                   transition={{ duration: 0.2 }}
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   width="16"
// //                   height="16"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth="2"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                 >
// //                   <polyline points="6 9 12 15 18 9"></polyline>
// //                 </motion.svg>
// //               </motion.button>

// //               {/* Dropdown Menu */}
// //               <AnimatePresence>
// //                 {profileDropdownOpen && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
// //                     animate={{ opacity: 1, y: 0, scale: 1 }}
// //                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
// //                     transition={{ duration: 0.15 }}
// //                     className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-neutral-200"
// //                   >
// //                     {/* User Info */}
// //                     <div className="px-4 py-3 border-b border-neutral-100">
// //                       <div className="font-medium text-neutral-900">
// //                         {user?.name || "User"}
// //                       </div>
// //                       <div className="text-xs text-neutral-500">
// //                         {user?.email}
// //                       </div>
// //                     </div>

// //                     {/* Admin Option */}
// //                     {user?.role === "A" && (
// //                       <Link
// //                         to="/admin/dashboard"
// //                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
// //                         onClick={() => setProfileDropdownOpen(false)}
// //                       >
// //                         <span>👑</span>
// //                         <span>Admin Panel</span>
// //                       </Link>
// //                     )}

// //                     {/* User Options */}
// //                     {userDropdownItems.map((item) => (
// //                       <Link
// //                         key={item.to}
// //                         to={item.to}
// //                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
// //                         onClick={() => setProfileDropdownOpen(false)}
// //                       >
// //                         <span>{item.icon}</span>
// //                         <span>{item.label}</span>
// //                         {item.label === "Messages" && (
// //                           <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
// //                             3
// //                           </span>
// //                         )}
// //                       </Link>
// //                     ))}

// //                     {/* Divider */}
// //                     <div className="border-t border-neutral-100 my-1"></div>

// //                     {/* Logout */}
// //                     <button
// //                       onClick={handleLogout}
// //                       className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
// //                     >
// //                       <span>🚪</span>
// //                       <span>Sign Out</span>
// //                     </button>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </div>
// //           ) : (
// //             <>
// //               <Link
// //                 to="/auth/login"
// //                 className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
// //               >
// //                 Sign In
// //               </Link>
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 <Link
// //                   to="/auth/register"
// //                   className="px-5 py-2.5 bg-primary-600 text-white font-medium text-sm rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
// //                 >
// //                   Register
// //                 </Link>
// //               </motion.button>
// //             </>
// //           )}
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <motion.button
// //           whileTap={{ scale: 0.9 }}
// //           className="md:hidden p-2 rounded-md hover:bg-neutral-100 transition-colors"
// //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //         >
// //           <AnimatePresence mode="wait" initial={false}>
// //             {mobileMenuOpen ? (
// //               <motion.svg
// //                 key="close"
// //                 initial={{ rotate: -90, opacity: 0 }}
// //                 animate={{ rotate: 0, opacity: 1 }}
// //                 exit={{ rotate: 90, opacity: 0 }}
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 width="24"
// //                 height="24"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               >
// //                 <line x1="18" y1="6" x2="6" y2="18"></line>
// //                 <line x1="6" y1="6" x2="18" y2="18"></line>
// //               </motion.svg>
// //             ) : (
// //               <motion.svg
// //                 key="menu"
// //                 initial={{ rotate: 90, opacity: 0 }}
// //                 animate={{ rotate: 0, opacity: 1 }}
// //                 exit={{ rotate: -90, opacity: 0 }}
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 width="24"
// //                 height="24"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 stroke="currentColor"
// //                   strokeWidth="2"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                 >
// //                   <line x1="3" y1="12" x2="21" y2="12"></line>
// //                   <line x1="3" y1="6" x2="21" y2="6"></line>
// //                   <line x1="3" y1="18" x2="21" y2="18"></line>
// //                 </motion.svg>
// //               )}
// //             </AnimatePresence>
// //           </motion.button>
// //         </div>

// //         {/* Mobile Menu */}
// //         <AnimatePresence>
// //           {mobileMenuOpen && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: "auto" }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.2 }}
// //               className="md:hidden bg-white shadow-lg border-t border-neutral-200"
// //             >
// //               <div className="container-custom py-4">
// //                 {/* Navigation Links */}
// //                 <nav className="flex flex-col space-y-1 mb-4">
// //                   {navLinks.map((link) => (
// //                     <NavLink
// //                       key={link.to}
// //                       to={link.to}
// //                       end={link.exact}
// //                       className={({ isActive }) =>
// //                         `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
// //                           isActive
// //                             ? "bg-primary-50 text-primary-600 font-medium"
// //                             : "text-neutral-700 hover:bg-neutral-100"
// //                         }`
// //                       }
// //                       onClick={() => setMobileMenuOpen(false)}
// //                     >
// //                       <span className="text-xl">{link.icon}</span>
// //                       {link.label}
// //                     </NavLink>
// //                   ))}
// //                 </nav>

// //                 {isAuthenticated ? (
// //                   <div className="flex flex-col space-y-1 border-t border-neutral-200 pt-4">
// //                     {/* User Info */}
// //                     <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-lg mb-2">
// //                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-medium">
// //                         {user?.name?.charAt(0) || "U"}
// //                       </div>
// //                       <div>
// //                         <div className="font-medium text-neutral-900">
// //                           {user?.name || "User"}
// //                         </div>
// //                         <div className="text-xs text-neutral-500">
// //                           {user?.email}
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* User Menu Items */}
// //                     {user?.role === "A" && (
// //                       <Link
// //                         to="/admin/dashboard"
// //                         className="flex items-center gap-3 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-lg"
// //                         onClick={() => setMobileMenuOpen(false)}
// //                       >
// //                         <span>👑</span>
// //                         <span>Admin Panel</span>
// //                       </Link>
// //                     )}

// //                     {userDropdownItems.map((item) => (
// //                       <Link
// //                         key={item.to}
// //                         to={item.to}
// //                         className="flex items-center gap-3 px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-lg"
// //                         onClick={() => setMobileMenuOpen(false)}
// //                       >
// //                         <span>{item.icon}</span>
// //                         <span>{item.label}</span>
// //                         {item.label === "Messages" && (
// //                           <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
// //                             3
// //                           </span>
// //                         )}
// //                       </Link>
// //                     ))}

// //                     {/* Logout */}
// //                     <button
// //                       onClick={() => {
// //                         handleLogout();
// //                         setMobileMenuOpen(false);
// //                       }}
// //                       className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-left mt-2"
// //                     >
// //                       <span>🚪</span>
// //                       <span>Sign Out</span>
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   <div className="flex flex-col space-y-3 pt-4 border-t border-neutral-200">
// //                     <Link
// //                       to="/auth/login"
// //                       className="px-4 py-3 text-center border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:border-primary-400 hover:text-primary-600 transition-colors"
// //                       onClick={() => setMobileMenuOpen(false)}
// //                     >
// //                       Sign In
// //                     </Link>
// //                     <Link
// //                       to="/auth/register"
// //                       className="px-4 py-3 text-center bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
// //                       onClick={() => setMobileMenuOpen(false)}
// //                     >
// //                       Register
// //                     </Link>
// //                   </div>
// //                 )}
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </header>
// //   );
// // };

// // export default Header;

// import { useState, useEffect, useRef } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";

// const Header = ({ isScrolled }) => {
//   const { isAuthenticated, user, logout } = useAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [activeNav, setActiveNav] = useState("/");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);

//   // Track active nav
//   useEffect(() => {
//     setActiveNav(location.pathname);
//   }, [location.pathname]);

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

//   // Close menus on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setProfileDropdownOpen(false);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   // Navigation links with enhanced icons
//   const navLinks = [
//     { to: "/", label: "Home", icon: "🏠", exact: true },
//     { to: "/browse", label: "Browse Matches", icon: "👥" },
//     { to: "/wedding-services", label: "Wedding Services", icon: "💒" },
//   ];

//   // User dropdown items with premium icons
// const userDropdownItems = [
//   { to: "/user/dashboard", label: "Dashboard", icon: "📊" },
//   { to: "/user/edit-profile", label: "Edit Profile", icon: "✏️" },
//   { to: "/user/saved", label: "Shortlisted", icon: "❤️", badge: 5 },
//   { to: "/user/interests", label: "Interests", icon: "👀", badge: 3 },
//   { to: "/user/messages", label: "Messages", icon: "💬", badge: 12 },
//   { to: "/user/upgrade", label: "Upgrade Plan", icon: "⭐" },
// ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-white/95 backdrop-blur-md shadow-lg py-2 border-b border-neutral-100"
//           : "bg-gradient-to-b from-black/10 via-transparent to-transparent py-4"
//       }`}
//     >
//       <div className="container-custom flex items-center justify-between">
//         {/* Premium Logo */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="flex items-center"
//         >
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="cursor-pointer group relative"
//             onClick={() => navigate("/")}
//           >
//             <img
//               className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:opacity-90"
//               src="/gutbandhan.png"
//               alt="Guthbandhan"
//             />
//           </motion.div>
//         </motion.div>

//         {/* Desktop Navigation - Premium */}
//         <nav className="hidden lg:flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30 shadow-sm">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               end={link.exact}
//               className={({ isActive }) => `
//                 relative px-5 py-2.5 rounded-full transition-all duration-300 font-medium text-sm
//                 flex items-center gap-2.5 group
//                 ${
//                   isActive
//                     ? "text-white bg-gradient-to-r from-primary-500 to-pink-500 shadow-md shadow-primary-500/30"
//                     : "text-neutral-700 hover:text-primary-600 hover:bg-white/80"
//                 }
//               `}
//             >
//               <span className="text-lg transition-transform duration-300 group-hover:scale-110">
//                 {link.icon}
//               </span>
//               <span>{link.label}</span>
//             </NavLink>
//           ))}
//         </nav>

//         {/* Auth Buttons or Profile - Premium */}
//         <div className="hidden lg:flex items-center gap-3" ref={dropdownRef}>
//           {isAuthenticated ? (
//             <>
//               {/* Notification Bell */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative p-2.5 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
//               >
//                 <svg
//                   className="w-5 h-5 text-neutral-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                   />
//                 </svg>
//                 <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
//               </motion.button>

//               {/* Profile Dropdown */}
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                   className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-white to-neutral-50 border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200 group"
//                 >
//                   <div className="relative">
//                     <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-sm">
//                       {user?.name?.charAt(0) || "U"}
//                     </div>
//                     <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <div className="text-left">
//                     <div className="font-semibold text-sm text-neutral-900">
//                       {user?.name?.split(" ")[0] || "User"}
//                     </div>
//                     <div className="text-xs text-primary-600 font-medium">Premium</div>
//                   </div>
//                   <motion.svg
//                     animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="w-4 h-4 text-neutral-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </motion.svg>
//                 </motion.button>

//                 {/* Premium Dropdown Menu */}
//                 <AnimatePresence>
//                   {profileDropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       transition={{ duration: 0.15 }}
//                       className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-3 z-50 border border-neutral-200/80 backdrop-blur-sm"
//                     >
//                       {/* User Info */}
//                       <div className="px-4 py-3 border-b border-neutral-100 bg-gradient-to-r from-primary-50/50 to-pink-50/50">
//                         <div className="font-semibold text-neutral-900">
//                           {user?.name || "Welcome"}
//                         </div>
//                         <div className="text-xs text-neutral-500 mt-0.5">
//                           {user?.email}
//                         </div>
//                       </div>

//                       {/* Admin Panel */}
//                       {user?.role === "A" && (
//                         <Link
//                           to="/admin/dashboard"
//                           className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 hover:text-amber-700 transition-colors group"
//                           onClick={() => setProfileDropdownOpen(false)}
//                         >
//                           <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
//                             <span className="text-white text-sm">👑</span>
//                           </div>
//                           <div>
//                             <div className="font-medium">Admin Panel</div>
//                             <div className="text-xs text-neutral-500">
//                               Manage platform
//                             </div>
//                           </div>
//                         </Link>
//                       )}

//                       {/* User Menu Items */}
//                       <div className="py-2">
//                         {userDropdownItems.map((item) => (
//                           <Link
//                             key={item.to}
//                             to={item.to}
//                             className="flex items-center justify-between px-4 py-3 text-sm text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-pink-50 hover:text-primary-600 transition-colors group"
//                             onClick={() => setProfileDropdownOpen(false)}
//                           >
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center">
//                                 <span className="text-sm">{item.icon}</span>
//                               </div>
//                               <span className="font-medium">{item.label}</span>
//                             </div>
//                             {item.badge && (
//                               <span className="bg-gradient-to-r from-primary-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
//                                 {item.badge}
//                               </span>
//                             )}
//                           </Link>
//                         ))}
//                       </div>

//                       {/* Logout Button */}
//                       <div className="border-t border-neutral-100 pt-2 mt-2">
//                         <button
//                           onClick={handleLogout}
//                           className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-colors group rounded-lg mx-2"
//                         >
//                           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center">
//                             <span className="text-sm">🚪</span>
//                           </div>
//                           <span className="font-medium">Sign Out</span>
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/auth/login"
//                 className={`px-5 py-2.5 font-medium text-sm rounded-lg transition-all duration-300 ${
//                   isScrolled
//                     ? "text-primary-600 hover:text-primary-700 hover:bg-primary-50"
//                     : "text-white hover:bg-white/10"
//                 }`}
//               >
//                 Sign In
//               </Link>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/auth/register"
//                   className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-medium text-sm rounded-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:from-primary-600 hover:to-pink-600 transition-all duration-300"
//                 >
//                   Start Free
//                 </Link>
//               </motion.div>
//             </>
//           )}
//         </div>

//         {/* Premium Mobile Menu Button */}
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           className="lg:hidden p-2.5 rounded-xl bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <AnimatePresence mode="wait" initial={false}>
//             {mobileMenuOpen ? (
//               <motion.svg
//                 key="close"
//                 initial={{ rotate: -90, opacity: 0 }}
//                 animate={{ rotate: 0, opacity: 1 }}
//                 exit={{ rotate: 90, opacity: 0 }}
//                 className="w-6 h-6 text-neutral-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </motion.svg>
//             ) : (
//               <motion.svg
//                 key="menu"
//                 initial={{ rotate: 90, opacity: 0 }}
//                 animate={{ rotate: 0, opacity: 1 }}
//                 exit={{ rotate: -90, opacity: 0 }}
//                 className="w-6 h-6 text-neutral-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </motion.svg>
//             )}
//           </AnimatePresence>
//         </motion.button>
//       </div>

//       {/* Premium Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.25 }}
//             className="lg:hidden bg-gradient-to-b from-white to-neutral-50 shadow-2xl border-t border-neutral-200"
//           >
//             <div className="container-custom py-6">
//               {/* User Info (if logged in) */}
//               {isAuthenticated && (
//                 <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary-50/50 to-pink-50/50 border border-primary-100">
//                   <div className="flex items-center gap-3">
//                     <div className="relative">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
//                         {user?.name?.charAt(0) || "U"}
//                       </div>
//                       <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-semibold text-neutral-900">
//                         {user?.name || "User"}
//                       </div>
//                       <div className="text-xs text-neutral-500">
//                         Premium Member
//                       </div>
//                     </div>
//                     <div className="text-xs bg-gradient-to-r from-primary-500 to-pink-500 text-white px-2 py-1 rounded-full">
//                       PRO
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Links */}
//               <nav className="flex flex-col space-y-2 mb-6">
//                 {navLinks.map((link) => (
//                   <NavLink
//                     key={link.to}
//                     to={link.to}
//                     end={link.exact}
//                     className={({ isActive }) =>
//                       `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-r from-primary-500 to-pink-500 text-white font-medium shadow-md"
//                           : "text-neutral-700 hover:bg-neutral-100"
//                       }`
//                     }
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center">
//                       <span className="text-lg">{link.icon}</span>
//                     </div>
//                     <span className="font-medium">{link.label}</span>
//                   </NavLink>
//                 ))}
//               </nav>

//               {isAuthenticated ? (
//                 <>
//                   {/* Quick Actions Grid */}
//                   <div className="mb-6">
//                     <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-3">
//                       Quick Actions
//                     </div>
//                     <div className="grid grid-cols-3 gap-3">
//                       {userDropdownItems.slice(0, 6).map((item, index) => (
//                         <Link
//                           key={item.to}
//                           to={item.to}
//                           className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-xs transition-all duration-200"
//                           onClick={() => setMobileMenuOpen(false)}
//                         >
//                           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-pink-100 flex items-center justify-center mb-2">
//                             <span className="text-lg">{item.icon}</span>
//                           </div>
//                           <span className="text-xs font-medium text-neutral-700 text-center">
//                             {item.label.split(" ")[0]}
//                           </span>
//                           {item.badge && (
//                             <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                               {item.badge}
//                             </span>
//                           )}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Admin Panel */}
//                   {user?.role === "A" && (
//                     <Link
//                       to="/admin/dashboard"
//                       className="flex items-center gap-3 px-4 py-3 mb-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl hover:shadow-md transition-all duration-200"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
//                         <span className="text-white text-lg">👑</span>
//                       </div>
//                       <div>
//                         <div className="font-medium text-amber-900">
//                           Admin Panel
//                         </div>
//                         <div className="text-xs text-amber-700">
//                           Platform Management
//                         </div>
//                       </div>
//                     </Link>
//                   )}

//                   {/* Logout Button */}
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-600 font-medium hover:border-red-300 transition-all duration-200"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <div className="space-y-3">
//                   <Link
//                     to="/auth/login"
//                     className="flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-br from-white to-neutral-50 border border-neutral-300 text-neutral-700 font-medium hover:border-primary-400 hover:text-primary-600 transition-all duration-200"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     Sign In
//                   </Link>
//                   <motion.div whileHover={{ scale: 1.02 }}>
//                     <Link
//                       to="/auth/register"
//                       className="block w-full text-center py-3.5 bg-gradient-to-r from-primary-500 to-pink-500 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Create Free Account
//                     </Link>
//                   </motion.div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

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
  const isHome = location.pathname === "/";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        !event.target.closest("[data-menu-button]")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

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

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
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
            data-menu-button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200 shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-white to-neutral-50/95 backdrop-blur-xl z-50 lg:hidden shadow-2xl shadow-black/20"
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
                    className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30"
                    onClick={() => setMobileMenuOpen(false)}
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
                      <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.exact}
                        className={({ isActive }) => `
                          flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
                          ${
                            isActive
                              ? link.featured
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                                : "bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg"
                              : "text-neutral-700 hover:bg-white/50 hover:shadow-sm"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
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
                      </NavLink>
                    ))}
                  </div>
                </nav>

                {/* User Menu or Auth */}
                {isAuthenticated ? (
                  <>
                    {/* Quick Stats */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                        Your Activity
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            label: "Matches",
                            value: "24",
                            icon: "💝",
                            color: "from-pink-500 to-rose-500",
                          },
                          {
                            label: "Messages",
                            value: "12",
                            icon: "💬",
                            color: "from-blue-500 to-cyan-500",
                          },
                          {
                            label: "Views",
                            value: "156",
                            icon: "👀",
                            color: "from-emerald-500 to-teal-500",
                          },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ y: -2 }}
                            className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-3 text-center shadow-sm"
                          >
                            <div
                              className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                            >
                              <span className="text-sm">{stat.icon}</span>
                            </div>
                            <div className="font-bold text-neutral-900">
                              {stat.value}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                        Quick Actions
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {userDropdownItems.slice(0, 6).map((item, index) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
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
                          </Link>
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
