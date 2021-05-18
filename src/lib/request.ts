import axios from 'axios'

const service = axios.create({
  timeout: 20000, // request timeout
  baseURL: 'https://ikingdata.com',
  withCredentials: false,
})
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
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
