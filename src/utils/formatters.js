import { format, formatDistanceToNow } from 'date-fns'

// export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
//   if (!date) return ''
//   return format(new Date(date), formatStr)
// }



export const getTimeAgo = (date) => {
  if (!date) return "";
  
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now - past) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit.charAt(0)} ago`;
    }
  }
  
  return "Just now";
};


export const formatDate = (date, format = "DD MMM YYYY HH:mm") => {
  if (!date) return "";
  
  const d = new Date(date);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return d.toLocaleDateString('en-US', options);
};

export const timeAgo = (date) => {
  if (!date) return ''
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatPrice = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}


export const truncateString = (str, length = 100) => {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}


export const formatNameWithInitial = (name) => {
  if (!name) return ''
  const parts = name.split(' ')
  if (parts.length === 1) return parts[0]
  return `${parts[0]} ${parts[1].charAt(0)}.`
}


export const formatHeight = (cm) => {
  if (!cm) return ''
  const inches = Math.round(cm / 2.54)
  const feet = Math.floor(inches / 12)
  const remainingInches = inches % 12
  return `${feet}'${remainingInches}"`
}

export const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
