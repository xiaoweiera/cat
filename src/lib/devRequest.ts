import axios from 'axios'
import jsCookie from 'js-cookie'

const service = axios.create({
  timeout: 20000, // request timeout
  baseURL: 'https://dev.ikingdata.com',
  withCredentials: false,
})
service.interceptors.request.use(
  (config) => {
    const token = jsCookie.get('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
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
