
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const defaultFilters = {
  first_name: '',
  last_name: '',
  religion: '',
  caste: '',
  sub_caste: '',
  // minAge: 18,
  // maxAge: 60,
  maritalStatus: '',
  residingCountry: '',
  residingState: '',
  residingCity: '',
  sex: '',
  education: '',
  occupation: '',
  working_with: '',
  professional_area: '',
  eating_habit: '',
  smoking: '',
  drinking: '',
  body_type: '',
  complexion: '',
  height_min: '',
  height_max: '',
  blood_group: '',
  family_type: '',
  family_value: '',
  star: '',
  raashi: '',
  manglik: '',
  searchText: '',
  page: 1,
  limit: 10,
}

export default function ProfileFilter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState(defaultFilters)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleaned = Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, v === '' ? undefined : v])
    )
    onFilterChange(cleaned)
    setIsOpen(false)
  }

const handleReset = () => {
  const cleaned = Object.fromEntries(
    Object.entries(defaultFilters).map(([k, v]) => [k, v === '' ? undefined : v])
  )
  setFilters(defaultFilters)
  onFilterChange(cleaned)
}


  return (
    <div className="mb-8">
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 hover:underline"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        <button
          onClick={handleReset}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Reset All
        </button>
      </div>

      {/* Filter Form */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First Name */}
            <InputField label="First Name" name="first_name" value={filters.first_name} onChange={handleChange} />
            {/* Last Name */}
            <InputField label="Last Name" name="last_name" value={filters.last_name} onChange={handleChange} />
            {/* Religion */}
            <InputField label="Religion" name="religion" value={filters.religion} onChange={handleChange} />
            {/* Caste */}
            <InputField label="Caste" name="caste" value={filters.caste} onChange={handleChange} />
            {/* Sub Caste */}
            <InputField label="Sub Caste" name="sub_caste" value={filters.sub_caste} onChange={handleChange} />
            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium mb-1">Age Range</label>
              <div className="flex items-center gap-2">
                <input type="number" name="minAge" min="18" max="80" value={filters.minAge} onChange={handleChange} className="w-full border p-2 rounded" />
                <span className="text-gray-500">to</span>
                <input type="number" name="maxAge" min="18" max="80" value={filters.maxAge} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            </div>
            {/* Gender */}
            <SelectField
              label="Gender"
              name="sex"
              value={filters.sex}
              onChange={handleChange}
              options={[{ label: 'All', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
            />
            {/* Marital Status */}
            <SelectField
              label="Marital Status"
              name="maritalStatus"
              value={filters.maritalStatus}
              onChange={handleChange}
              options={[
                { label: 'All', value: '' },
                { label: 'Single', value: 'single' },
                { label: 'Divorced', value: 'divorced' },
                { label: 'Widowed', value: 'widowed' },
              ]}
            />
            {/* Country */}
            <InputField label="Country" name="residingCountry" value={filters.residingCountry} onChange={handleChange} />
            {/* State */}
            <InputField label="State" name="residingState" value={filters.residingState} onChange={handleChange} />
            {/* City */}
            <InputField label="City" name="residingCity" value={filters.residingCity} onChange={handleChange} />
            {/* Education */}
            <InputField label="Education" name="education" value={filters.education} onChange={handleChange} />
            {/* Occupation */}
            <InputField label="Occupation" name="occupation" value={filters.occupation} onChange={handleChange} />
            {/* Height */}
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <div className="flex items-center gap-2">
                <input type="number" name="height_min" placeholder="Min" value={filters.height_min} onChange={handleChange} className="w-full border p-2 rounded" />
                <span className="text-gray-500">to</span>
                <input type="number" name="height_max" placeholder="Max" value={filters.height_max} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            </div>
            {/* Eating Habit */}
            <SelectField
              label="Eating Habit"
              name="eating_habit"
              value={filters.eating_habit}
              onChange={handleChange}
              options={[
                { label: 'All', value: '' },
                { label: 'Vegetarian', value: 'vegetarian' },
                { label: 'Non-Vegetarian', value: 'non-vegetarian' },
                { label: 'Vegan', value: 'vegan' },
              ]}
            />
            {/* General Search */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium mb-1">Search Text</label>
              <input
                type="text"
                name="searchText"
                placeholder="Search name, location, etc."
                value={filters.searchText}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Submit + Reset */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// Reusable InputField component
const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border p-2 rounded"
    />
  </div>
)

// Reusable SelectField component
const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border p-2 rounded"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)
