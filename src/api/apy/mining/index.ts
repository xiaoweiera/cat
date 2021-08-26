
import axios from '~/lib/service'
const request=async (param:any)=>{
   const result=await axios(param)
    return result?.data
}
import { miningPoolParam,miningChart,tokenMiningPoolParam} from '~/logic/apy2/interface'
enum API {
    mining_group = '/api/apy/ninja/mining_group',
    mining_rank = '/api/apy/ninja/mining_rank',
    mining_pools = '/api/apy/ninja/mining_pools',
    mining_best10 = '/api/apy/ninja/mining_best10',
    tokenMining_pools = '/api/apy/ninja/token/mining_pools',

}
// 挖矿榜单top5
export const mining_rank=(param:any)=>  request({url:API.mining_rank, params:param, method: 'get'})
// 挖矿分组
export const mining_group =(param:any)=> request({url:API.mining_group, params:param, method: 'get'})
//矿池列表
export const mining_pools =(param:miningPoolParam)=> request({url:API.mining_pools, params:param, method: 'get'})
//top10图表
export const mining_best10 =(param:miningChart)=> request({url:API.mining_best10, params:param, method: 'get'})
//token矿池列表
export const tokenMining_pools =(param:tokenMiningPoolParam)=> request({url:API.tokenMining_pools, params:param, method: 'get'})


