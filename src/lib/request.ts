import axios from 'axios'
import jsCookie from 'js-cookie'

const service = axios.create({
  timeout: 20000, // request timeout
  baseURL: 'https://0a51e53b8768.ngrok.io',
  // baseURL: 'https://ikingdata.com',
  withCredentials: false,
})
service.interceptors.request.use(
  (config) => {
    const token = jsCookie.get('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    // config.headers.Authorization
    //   = 'Token eyJpdiI6IkQ2V3NvUWRoM2ROZGNEQlBhbzBLcGc9PSIsInZhbHVlIjoid05QUHNKdjhmWVRCVk1kcTNMdEF5bkxaaTJqZjg4QUVrbFRYRHY3b21ma05nVXFyM3NCTndGWlllb3FualhyNiIsIm1hYyI6IjkwN2ZjZmNjOTM0OWE4ZTUxYzYzOWU1YzYwNWZiZjJmMGFiZDU0ODhmZTZlZWZiNmIyZWJjODZlNjlmZjgwODEifQ=='
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
service.interceptors.response.use(
  (res) => {
    if (res.status !== 200) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default service
