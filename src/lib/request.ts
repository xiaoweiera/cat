import axios from 'axios'
const service = axios.create({
    timeout: 20000, // request timeout
    baseURL:'https://ikingdata.com',
    withCredentials: false,
})
export default service
