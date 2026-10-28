import axios from 'axios'

export const BASE_URL = 'https://tu-backend.vercel.app'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})
