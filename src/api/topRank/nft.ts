
import axios from '~/lib/service'
const request=async (param:any)=>{
  const result=await axios(param)
  return result?.data
}
enum API {
  nftList = '/api/dapps/v1/rank/nfts',
  chart='/api/dapps/v1/rank/chart/volume'
}
import { nftListModel } from '~/logic/topRank/interface'
// 得到nft列表
export const getNftList=(param:nftListModel)=>  request({url:API.nftList,params:param,  method: 'get'})
// 得到nft图表
export const chart=()=>  request({url:API.chart, method: 'get'})
