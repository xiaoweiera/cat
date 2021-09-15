
import axios from '~/lib/service'
const request=async (param:any)=>{
  const result=await axios(param)
  return result?.data
}
enum API {
  chainsList = '/api/dapps/v1/chains',
  chart='/api/dapps/v1/rank/chart/volume'
}
import {chainModel} from '~/logic/topRank/interface'
// 得到公链列表
export const getChains=(param:chainModel)=>  request({url:API.chainsList,params:param,  method: 'get'})
// 得到nft图表
export const chart=()=>  request({url:API.chart, method: 'get'})
