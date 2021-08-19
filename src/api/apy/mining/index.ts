
import axios from '~/lib/service'
const request=async (param:any)=>{
   const result=await axios(param)
    return result?.data
}
enum API {
    mining_group = '/api/apy/ninja/mining_group',
    mining_rank = '/api/apy/ninja/mining_rank',
}
// 挖矿榜单top5
export const mining_rank = function(param:any) {
    return request({
        url:API.mining_rank,
        params:param,
        method: 'get',
    })
}
// 挖矿分组
export const mining_group = function(param:any) {
    return request({
        url:API.mining_group,
        params:param,
        method: 'get',
    })
}


