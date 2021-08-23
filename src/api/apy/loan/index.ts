
import axios from '~/lib/service'
const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
import { loanPoolParam} from '~/logic/apy2/interface'
enum API {
    lending_group = '/api/apy/ninja/lending_group',
    lending_rank = '/api/apy/ninja/lending_rank',
    lending_pools = '/api/apy/ninja/token/lending_pools',

}
// 借贷榜单top5
export const lending_rank=(param:any)=>request({url:API.lending_rank, params:param, method: 'get'})
// 借贷分组
export const lending_group =(param:any) =>request({url:API.lending_group, params:param, method: 'get'})
// 矿池列表
export const lending_pools =(param:loanPoolParam) =>request({url:API.lending_pools, params:param, method: 'get'})


