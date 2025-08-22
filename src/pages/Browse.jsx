import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import ProfileCard from "../components/profile/ProfileCard";
import ProfileFilter from "../components/profile/ProfileFilter";
import { toast } from "react-toastify";
import { useQuery,useMutation } from "@tanstack/react-query";
import { getAllProfile,searchProfiles } from "../api/profile";
import React from "react";

import { motion } from "framer-motion";


export default function Browse() {
  const [filters, setFilters] = useState({});
  const [debouncedFilters] = useDebounce(filters, 500);
 const { user } = useAuth(); 
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['profiles', debouncedFilters],
    queryFn: ({ pageParam = 1 }) =>
      searchProfiles({ ...debouncedFilters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const next = lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined;
      return next;
    },
     keepPreviousData: true,
    enabled: !!user 
  });

  if (!user) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-24 pb-16 container mx-auto px-4 text-center mt-20"
    >
      <h2
        className="text-3xl font-semi-bold mb-4 bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 bg-clip-text text-transparent"
      >
        You have to login first to browse profiles
      </h2>
    </motion.div>
  );
}

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, page: 1 });
    toast.success('Filters applied');
  };

  return (
    <div className="pt-24 pb-16 container mx-auto px-16">
      <h1 className="text-center text-3xl font-bold mb-2">Browse Profiles</h1>
      <p className="text-center text-gray-600 mb-8">
        Discover compatible matches and start your journey.
      </p>

      <ProfileFilter onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-600">Failed to load profiles.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.pages.map((page, idx) => (
              <React.Fragment key={idx}>
                {page.profiles.map((profile) => (
                  <ProfileCard
                    key={profile._id || profile.id}
                    profile={profile}
                    onSave={() => toast.success('Saved')}
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
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
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
  );
}