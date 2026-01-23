// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const LocationInformation = ({ formData, errors, handleChange, handleLocationChange }) => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState({
//     countries: false,
//     states: false,
//     cities: false
//   });

//   // Fetch all countries on component mount
//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   // Fetch states when country changes
//   useEffect(() => {
//     if (formData.residing_country) {
//       fetchStates(formData.residing_country);
//     } else {
//       setStates([]);
//       setCities([]);
//       // Reset state and city in form data
//       handleChange({ target: { name: 'residing_state', value: '' } });
//       handleChange({ target: { name: 'residing_city', value: '' } });
//     }
//   }, [formData.residing_country]);

//   // Fetch cities when state changes
//   useEffect(() => {
//     if (formData.residing_state) {
//       fetchCities(formData.residing_country, formData.residing_state);
//     } else {
//       setCities([]);
//       // Reset city in form data
//       handleChange({ target: { name: 'residing_city', value: '' } });
//     }
//   }, [formData.residing_state]);

//   const fetchCountries = async () => {
//     try {
//       setLoading(prev => ({ ...prev, countries: true }));
//       const response = await axios.get(
//         'https://countriesnow.space/api/v0.1/countries'
//       );
      
//       if (response.data && response.data.data) {
//         const countryList = response.data.data.map(country => ({
//           name: country.country,
//           iso2: country.iso2
//         }));
//         setCountries(countryList);
//       }
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//     } finally {
//       setLoading(prev => ({ ...prev, countries: false }));
//     }
//   };

//   const fetchStates = async (country) => {
//     try {
//       setLoading(prev => ({ ...prev, states: true }));
//       const response = await axios.post(
//         'https://countriesnow.space/api/v0.1/countries/states',
//         { country }
//       );
      
//       if (response.data && response.data.data && response.data.data.states) {
//         const stateList = response.data.data.states;
//         setStates(stateList);
//       }
//     } catch (error) {
//       console.error('Error fetching states:', error);
//     } finally {
//       setLoading(prev => ({ ...prev, states: false }));
//     }
//   };

//   const fetchCities = async (country, state) => {
//     try {
//       setLoading(prev => ({ ...prev, cities: true }));
//       const response = await axios.post(
//         'https://countriesnow.space/api/v0.1/countries/state/cities',
//         { country, state }
//       );
      
//       if (response.data && response.data.data) {
//         setCities(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching cities:', error);
//     } finally {
//       setLoading(prev => ({ ...prev, cities: false }));
//     }
//   };

//   // Handle country change
//   const handleCountryChange = (e) => {
//     const value = e.target.value;
//     handleLocationChange("residing_country", value);
    
//     // Reset dependent fields
//     handleLocationChange("residing_state", "");
//     handleLocationChange("residing_city", "");
    
//     // Also update location object if needed
//     handleChange({ 
//       target: { 
//         name: 'location', 
//         value: { 
//           ...formData.location, 
//           country: value,
//           state: '',
//           city: ''
//         } 
//       } 
//     });
//   };

//   // Handle state change
//   const handleStateChange = (e) => {
//     const value = e.target.value;
//     handleLocationChange("residing_state", value);
//     handleLocationChange("residing_city", "");
    
//     // Also update location object
//     handleChange({ 
//       target: { 
//         name: 'location', 
//         value: { 
//           ...formData.location, 
//           state: value,
//           city: ''
//         } 
//       } 
//     });
//   };

//   // Handle city change
//   const handleCityChange = (e) => {
//     const value = e.target.value;
//     handleLocationChange("residing_city", value);
    
//     // Also update location object
//     handleChange({ 
//       target: { 
//         name: 'location', 
//         value: { 
//           ...formData.location, 
//           city: value 
//         } 
//       } 
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//       <h2 className="text-xl font-semibold mb-4">Location Information</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         {/* Country Dropdown */}
//         <div>
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             Country *
//           </label>
//           <select
//             value={formData.residing_country}
//             onChange={handleCountryChange}
//             className={`input ${errors.residing_country ? "border-red-500" : ""}`}
//             disabled={loading.countries}
//           >
//             <option value="">
//               {loading.countries ? "Loading countries..." : "Select Country"}
//             </option>
//             {countries.map((country) => (
//               <option key={country.iso2 || country.name} value={country.name}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           {errors.residing_country && (
//             <p className="mt-1 text-sm text-red-600">{errors.residing_country}</p>
//           )}
//         </div>

//         {/* State Dropdown */}
//         <div>
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             State *
//           </label>
//           <select
//             value={formData.residing_state}
//             onChange={handleStateChange}
//             className={`input ${errors.residing_state ? "border-red-500" : ""}`}
//             disabled={!formData.residing_country || loading.states}
//           >
//             <option value="">
//               {loading.states ? "Loading states..." : "Select State"}
//             </option>
//             {states.map((state) => (
//               <option key={state.name} value={state.name}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//           {errors.residing_state && (
//             <p className="mt-1 text-sm text-red-600">{errors.residing_state}</p>
//           )}
//         </div>

//         {/* City Dropdown */}
//         <div>
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             City *
//           </label>
//           <select
//             value={formData.residing_city}
//             onChange={handleCityChange}
//             className={`input ${errors.residing_city ? "border-red-500" : ""}`}
//             disabled={!formData.residing_state || loading.cities}
//           >
//             <option value="">
//               {loading.cities ? "Loading cities..." : "Select City"}
//             </option>
//             {cities.map((city) => (
//               <option key={city} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//           {errors.residing_city && (
//             <p className="mt-1 text-sm text-red-600">{errors.residing_city}</p>
//           )}
//         </div>

//         {/* Residing Status */}
//         <div className="md:col-span-3">
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             Residing Status
//           </label>
//           <input
//             type="text"
//             name="residing_status"
//             value={formData.residing_status}
//             onChange={handleChange}
//             className="input"
//             placeholder="e.g. Citizen, Permanent Resident"
//           />
//         </div>

//         {/* Birth Place */}
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             Birth Place
//           </label>
//           <input
//             type="text"
//             name="birth_place"
//             value={formData.birth_place}
//             onChange={handleChange}
//             className="input"
//             placeholder="City of birth"
//           />
//         </div>

//         {/* Native Place */}
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-neutral-700 mb-1">
//             Native Place
//           </label>
//           <input
//             type="text"
//             name="native_place"
//             value={formData.native_place}
//             onChange={handleChange}
//             className="input"
//             placeholder="Ancestral home"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationInformation;



// components/profile/LocationInformation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationInformation = ({ formData, errors, handleChange, handleLocationChange }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState({
    countries: false,
    states: false,
    cities: false
  });

  // Fetch all countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (formData.residing_country) {
      fetchStates(formData.residing_country);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.residing_country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.residing_state) {
      fetchCities(formData.residing_country, formData.residing_state);
    } else {
      setCities([]);
    }
  }, [formData.residing_state]);

  const fetchCountries = async () => {
    try {
      setLoading(prev => ({ ...prev, countries: true }));
      const response = await axios.get(
        'https://countriesnow.space/api/v0.1/countries'
      );
      
      if (response.data && response.data.data) {
        const countryList = response.data.data.map(country => ({
          name: country.country,
          iso2: country.iso2
        }));
        setCountries(countryList);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  };

  const fetchStates = async (country) => {
    try {
      setLoading(prev => ({ ...prev, states: true }));
      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/states',
        { country }
      );
      
      if (response.data && response.data.data && response.data.data.states) {
        const stateList = response.data.data.states;
        setStates(stateList);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoading(prev => ({ ...prev, states: false }));
    }
  };

  const fetchCities = async (country, state) => {
    try {
      setLoading(prev => ({ ...prev, cities: true }));
      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/state/cities',
        { country, state }
      );
      
      if (response.data && response.data.data) {
        setCities(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  // Handle country change
  const handleCountryChange = (e) => {
    const value = e.target.value;
    
    // ✅ ONLY use handleLocationChange, NOT handleChange
    handleLocationChange("residing_country", value);
    
    // Reset dependent fields
    handleLocationChange("residing_state", "");
    handleLocationChange("residing_city", "");
  };

  // Handle state change
  const handleStateChange = (e) => {
    const value = e.target.value;
    
    // ✅ ONLY use handleLocationChange
    handleLocationChange("residing_state", value);
    handleLocationChange("residing_city", "");
  };

  // Handle city change
  const handleCityChange = (e) => {
    const value = e.target.value;
    
    // ✅ ONLY use handleLocationChange
    handleLocationChange("residing_city", value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">Location Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Country Dropdown */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Country *
          </label>
          <select
            value={formData.residing_country}
            onChange={handleCountryChange}
            className={`input ${errors.residing_country ? "border-red-500" : ""}`}
            disabled={loading.countries}
          >
            <option value="">
              {loading.countries ? "Loading countries..." : "Select Country"}
            </option>
            {countries.map((country) => (
              <option key={country.iso2 || country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.residing_country && (
            <p className="mt-1 text-sm text-red-600">{errors.residing_country}</p>
          )}
        </div>

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            State *
          </label>
          <select
            value={formData.residing_state}
            onChange={handleStateChange}
            className={`input ${errors.residing_state ? "border-red-500" : ""}`}
            disabled={!formData.residing_country || loading.states}
          >
            <option value="">
              {loading.states ? "Loading states..." : "Select State"}
            </option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.residing_state && (
            <p className="mt-1 text-sm text-red-600">{errors.residing_state}</p>
          )}
        </div>

        {/* City Dropdown */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            City *
          </label>
          <select
            value={formData.residing_city}
            onChange={handleCityChange}
            className={`input ${errors.residing_city ? "border-red-500" : ""}`}
            disabled={!formData.residing_state || loading.cities}
          >
            <option value="">
              {loading.cities ? "Loading cities..." : "Select City"}
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.residing_city && (
            <p className="mt-1 text-sm text-red-600">{errors.residing_city}</p>
          )}
        </div>

        {/* Residing Status */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Residing Status
          </label>
          <input
            type="text"
            name="residing_status"
            value={formData.residing_status}
            onChange={handleChange} // ✅ Regular handleChange for text input
            className="input"
            placeholder="e.g. Citizen, Permanent Resident"
          />
        </div>

        {/* Birth Place */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Birth Place
          </label>
          <input
            type="text"
            name="birth_place"
            value={formData.birth_place}
            onChange={handleChange} // ✅ Regular handleChange for text input
            className="input"
            placeholder="City of birth"
          />
        </div>

        {/* Native Place */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Native Place
          </label>
          <input
            type="text"
            name="native_place"
            value={formData.native_place}
            onChange={handleChange}
            className="input"
            placeholder="Ancestral home"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationInformation;