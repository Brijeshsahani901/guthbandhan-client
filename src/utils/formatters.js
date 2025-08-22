import { format, formatDistanceToNow } from 'date-fns'

/**
 * Formats a date to a readable string
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatStr)
}

/**
 * Returns a relative time string (e.g., "5 minutes ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time
 */
export const timeAgo = (date) => {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

/**
 * Formats a number with commas for thousands
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Formats a price with currency symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted price
 */
export const formatPrice = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Truncates a string if it's longer than the specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated string
 */
export const truncateString = (str, length = 100) => {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

/**
 * Formats a name to first name + last initial
 * @param {string} name - Full name
 * @returns {string} Formatted name
 */
export const formatNameWithInitial = (name) => {
  if (!name) return ''
  const parts = name.split(' ')
  if (parts.length === 1) return parts[0]
  return `${parts[0]} ${parts[1].charAt(0)}.`
}

/**
 * Formats height from cm to feet and inches
 * @param {number} cm - Height in centimeters
 * @returns {string} Formatted height
 */
export const formatHeight = (cm) => {
  if (!cm) return ''
  const inches = Math.round(cm / 2.54)
  const feet = Math.floor(inches / 12)
  const remainingInches = inches % 12
  return `${feet}'${remainingInches}"`
}