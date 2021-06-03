import axios from 'axios'
import jsCookie from 'js-cookie'
import { addUserToken } from '~/logic/user/token'

const service = axios.create({
  timeout: 20000, // request timeout
  // baseURL: 'https://0a51e53b8768.ngrok.io',
  baseURL: 'https://ikingdata.com',
  // baseURL: 'https://dev.ikingdata.com',
  withCredentials: false,
})

const getUserAuth = function(): string {
  const value = jsCookie.get('token')
  if (value) {
    return value
  }
  const funName = 'getUserToken'
  // @ts-ignore
  if (window[funName]) {
    try {
      // @ts-ignore
      const token = window[funName]()
      if (token) {
        addUserToken(token)
        return token
      }
    } catch (e) {
      // todo
    }
  }
  return ''
}

service.interceptors.request.use(
  (config) => {
    const token = getUserAuth()
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
