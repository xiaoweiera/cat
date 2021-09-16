
import axios from '~/lib/service'
const request=async (param:any)=>{
  const result=await axios(param)
  return result?.data
}
enum API {
  dappList = '/api/dapps/v1/rank/dapps',
  chart='/api/dapps/v1/rank/chart/tvl'
}
import {dappListModel} from '~/logic/topRank/interface'
// 得到dapp列表
export const getDappList=(param:dappListModel)=>  request({url:API.dappList,params:param,  method: 'get'})
// 图表
export const chart=()=>  request({url:API.chart, method: 'get'})

