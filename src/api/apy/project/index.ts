
import axios from '~/lib/service'
const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
import {projectMiningChart,projectLoanChart,projectDetailChart,projectSameChart,projectMiningList,projectLoanList} from '~/logic/apy2/interface'
enum API {
    mining_best10 = '/api/apy/ninja/project/mining_best10',
    lending_best10 = '/api/apy/ninja/project/lending_best10',
    detail_chart = '/api/apy/ninja/project/detail_chart',
    same_category = '/api/apy/ninja/project/same_category',
   mining_pools='/api/apy/ninja/project/mining_pools',
    lending_pools='/api/apy/ninja/project/lending_pools'
}
//挖矿top10图表
export const mining_best10 =(param:projectMiningChart)=> request({url:API.mining_best10, params:param, method: 'get'})
//借贷 top10图表
export const lending_best10 =(param:projectLoanChart)=> request({url:API.lending_best10, params:param, method: 'get'})
//项目数据总览图表
export const detail_chart =(param:projectDetailChart)=> request({url:API.detail_chart, params:param, method: 'get'})
//同类项目数据图表
export const same_category =(param:projectSameChart)=> request({url:API.same_category, params:param, method: 'get'})
//挖矿列表
export const mining_pools =(param:projectMiningList)=> request({url:API.mining_pools, params:param, method: 'get'})
//借贷列表
export const lending_pools =(param:projectLoanList)=> request({url:API.lending_pools, params:param, method: 'get'})


