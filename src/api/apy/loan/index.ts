
import axios from '~/lib/service'
const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
enum API {
    lending_group = '/api/apy/ninja/lending_group',
    lending_rank = '/api/apy/ninja/lending_rank',
}
// 借贷榜单top5
export const lending_rank = function(param:any) {
    return request({
        url:API.lending_rank,
        params:param,
        method: 'get',
    })
}
// 借贷分组
export const lending_group = function(param:any) {
    return request({
        url:API.lending_group,
        params:param,
        method: 'get',
    })
}


