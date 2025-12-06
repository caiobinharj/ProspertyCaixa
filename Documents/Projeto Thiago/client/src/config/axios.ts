import axios from 'axios'

// Configure base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || ''

if (API_URL) {
  axios.defaults.baseURL = API_URL
}

export default axios

