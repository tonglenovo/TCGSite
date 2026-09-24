const LOCAL_API = 'http://localhost:3000'
const PRODUCTION_API = 'https://tongyt-api.onrender.com'

export const API_URL = import.meta.env.DEV
  ? LOCAL_API
  : PRODUCTION_API