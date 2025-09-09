// 'use client'

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useDebounce } from "use-debounce";
// import ProfileCard from "../components/profile/ProfileCard";
// import ProfileFilter from "../components/profile/ProfileFilter";
// import { toast } from "react-toastify";
// import { searchProfiles, getProfile } from "../api/profile";
// import { motion } from "framer-motion";

// export default function Browse() {
//   const [filters, setFilters] = useState({});
//   const [debouncedFilters] = useDebounce(filters, 500);
//   const { user } = useAuth();

//   useEffect(() => {
//     const setDefaultSexFilter = async () => {
//       if (user?.profile_id) {
//         try {
//           const profile = await getProfile(user?.profile_id);
//           const oppositeSex = profile?.sex === "M" ? "F" : "M";
//           setFilters((prev) => ({
//             ...prev,
//             sex: oppositeSex,
//           }));
//         } catch (error) {
//           toast.error("Failed to fetch your profile info");
//           console.error("Error fetching profile:", error);
//         }
//       }
//     };

//     setDefaultSexFilter();
//   }, [user?.profile_id]);

//   const {
//     data,
//     isLoading,
//     isError,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isFetching,
//   } = useInfiniteQuery({
//     queryKey: ["profiles", debouncedFilters],
//     queryFn: ({ pageParam = 1 }) =>
//       searchProfiles({ ...debouncedFilters, page: pageParam, limit: 12 }),
//     getNextPageParam: (lastPage) => {
//       return lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined;
//     },
//     enabled: !!user && !!debouncedFilters?.sex,
//     keepPreviousData: true,
//   });

//   const handleFilterChange = (newFilters) => {
//     setFilters((prev) => ({
//       ...prev,
//       ...newFilters,
//       page: 1,
//     }));
//     toast.success("Filters applied");
//   };

//   if (!user) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="pt-24 pb-16 container mx-auto px-4 text-center mt-20"
//       >
//         <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
//           You have to login first to browse profiles
//         </h2>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="pt-24 pb-16 container mx-auto px-4">
//       <h1 className="text-center text-3xl font-bold mb-2">Browse Profiles</h1>
//       <p className="text-center text-gray-600 mb-8">
//         Discover compatible matches and start your journey.
//       </p>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Filter Sidebar */}
//         <div className="lg:w-1/3 xl:w-1/4">
//           <div className="sticky top-24">
//             <ProfileFilter onFilterChange={handleFilterChange} />
//           </div>
//         </div>

//         {/* Profiles Section */}
//         <div className="lg:w-2/3 xl:w-3/4">
//           {isLoading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto" />
//             </div>
//           ) : isError ? (
//             <div className="text-center text-red-600">Failed to load profiles.</div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {data?.pages?.map((page, idx) => (
//                   <React.Fragment key={idx}>
//                     {page?.profiles.map((profile) => (
//                       <ProfileCard
//                         key={profile._id || profile.id}
//                         profile={profile}
//                         onSave={() => toast.success("Saved")}
//                       />
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </div>

//               <div className="text-center mt-8">
//                 {hasNextPage ? (
//                   <button
//                     onClick={() => fetchNextPage()}
//                     disabled={isFetchingNextPage}
//                     className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     {isFetchingNextPage ? "Loading..." : "Load More"}
//                   </button>
//                 ) : (
//                   <p className="text-gray-500">No more profiles to load</p>
//                 )}
//               </div>

//               {isFetching && !isFetchingNextPage && (
//                 <p className="text-center mt-2 text-gray-500">Fetching...</p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileFilter from "../components/profile/ProfileFilter";
import { toast } from "react-toastify";
import { searchProfiles, getProfile } from "../api/profile";
import { motion, AnimatePresence } from "framer-motion";

export default function Browse() {
  const [filters, setFilters] = useState({});
  const [debouncedFilters] = useDebounce(filters, 500);
  const { user } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Default: hidden
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // New state

  useEffect(() => {
    const setDefaultSexFilter = async () => {
      if (user?.profile_id) {
        try {
          const profile = await getProfile(user?.profile_id);
          const oppositeSex = profile?.sex === "M" ? "F" : "M";
          setFilters((prev) => ({
            ...prev,
            sex: oppositeSex,
          }));
        } catch (error) {
          toast.error("Failed to fetch your profile info");
          console.error("Error fetching profile:", error);
        }
      }
    };

    setDefaultSexFilter();
  }, [user?.profile_id]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["profiles", debouncedFilters],
    queryFn: ({ pageParam = 1 }) =>
      searchProfiles({ ...debouncedFilters, page: pageParam, limit: 12 }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    enabled: !!user && !!debouncedFilters?.sex,
    keepPreviousData: true,
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
    toast.success("Filters applied");
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-24 pb-16 container mx-auto px-4 text-center mt-20"
      >
        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          You have to login first to browse profiles
        </h2>
      </motion.div>
    );
  }

  return (
    <div className="pt-24 pb-16 container mx-auto">
      <h1 className="text-center text-3xl font-bold mb-2">Browse Profiles</h1>
      <p className="text-center text-gray-600 mb-8">
        Discover compatible matches and start your journey.
      </p>

      <div className="flex gap-4 relative">
        {/* Toggle Button for All Screens */}
        <div className="sticky top-24 z-20">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsMobileFilterOpen(true); // mobile
              } else {
                setIsFilterOpen((prev) => !prev); // desktop
              }
            }}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Toggle Filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Sidebar */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              key="desktop-filter"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:block lg:w-1/3 xl:w-1/4"
            >
              <div className="sticky top-24">
                <ProfileFilter
                  onFilterChange={handleFilterChange}
                  isOpen={isFilterOpen}
                  setIsOpen={setIsFilterOpen}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Cards */}
        <div className="flex-1 transition-all duration-300">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto" />
            </div>
          ) : isError ? (
            <div className="text-center text-red-600">
              Failed to load profiles.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {data?.pages?.map((page, idx) => (
                  <React.Fragment key={idx}>
                    {page?.profiles.map((profile) => (
                      <ProfileCard
                        key={profile._id || profile.id}
                        profile={profile}
                        onSave={() => toast.success("Saved")}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>

              <div className="text-center mt-8">
                {hasNextPage ? (
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                  </button>
                ) : (
                  <p className="text-gray-500">No more profiles to load</p>
                )}
              </div>

              {isFetching && !isFetchingNextPage && (
                <p className="text-center mt-2 text-gray-500">Fetching...</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed inset-x-0 bottom-0 top-0 bg-white z-50 p-4 flex flex-col overflow-y-auto"
            >
              {/* Close Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-600 hover:text-black text-xl"
                >
                  &times;
                </button>
              </div>

              {/* Scrollable Filter Content */}
              <div className="flex-1 overflow-y-auto">
                <ProfileFilter
                  onFilterChange={(f) => {
                    handleFilterChange(f);
                    setIsMobileFilterOpen(false); // close after applying
                  }}
                  isOpen={true} // always open in drawer mode
                  setIsOpen={() => {}}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
