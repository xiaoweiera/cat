
import axios from '~/lib/service'
const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
enum API {
    chainsList = '/api/apy/ninja/getChains',
}
// 得到公链列表
export const getChains=()=>  request({url:API.chainsList, method: 'get'})

