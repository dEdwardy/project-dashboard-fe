import axios from 'axios'

export const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
})
service.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

service.interceptors.response.use((res) => {
  return res
}, (err) => {
  return Promise.reject(err)
})
