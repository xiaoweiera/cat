
import axios from '~/lib/service'
const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
import {projectDetailChart,projectSameChart,projectMiningList,projectLoanList} from '~/logic/apy2/interface'
enum API {
    mining_best10 = '/api/apy/ninja/project/mining_best10',
    lending_best10 = '/api/apy/ninja/project/lending_best10',
    detail_chart = '/api/apy/ninja/project/detail_chart',
    same_category = '/api/apy/ninja/project/same_category',
   mining_pools='/api/apy/ninja/project/mining_pools',
    lending_pools='/api/apy/ninja/project/lending_pools',
    mining_rank='/api/apy/ninja/project/mining_rank',
    lending_rank='/api/apy/ninja/project/lending_rank',

    tokenMining_best10='/api/apy/ninja/token/mining_best10',
    tokenLending_best10='/api/apy/ninja/token/lending_best10',

    tokenMining_rank='/api/apy/ninja/token/mining_rank',
    tokenLending_rank='/api/apy/ninja/token/lending_rank',
}
//挖矿top10图表
export const mining_best10 =(param:object)=> request({url:API.mining_best10, params:param, method: 'get'})
//借贷 top10图表
export const lending_best10 =(param:object)=> request({url:API.lending_best10, params:param, method: 'get'})
//项目数据总览图表
export const detail_chart =(param:projectDetailChart)=> request({url:API.detail_chart, params:param, method: 'get'})
//同类项目数据图表
export const same_category =(param:projectSameChart)=> request({url:API.same_category, params:param, method: 'get'})
//挖矿列表
export const mining_pools =(param:projectMiningList)=> request({url:API.mining_pools, params:param, method: 'get'})
//借贷列表
export const lending_pools =(param:projectLoanList)=> request({url:API.lending_pools, params:param, method: 'get'})
//mining榜单
export const mining_rank=(param:object)=>request({url:API.mining_rank,params:param,method:'get'})
//lend榜单
export const lending_rank=(param:object)=>request({url:API.lending_rank,params:param,method:'get'})


//币种mining图表
export const tokenMining_best10=(param:object)=>request({url:API.tokenMining_best10,params:param,method:'get'})
//币种lend图表
export const tokenLending_best10=(param:object)=>request({url:API.tokenLending_best10,params:param,method:'get'})


//币种mining榜单
export const tokenMining_rank=(param:object)=>request({url:API.tokenMining_rank,params:param,method:'get'})
//币种lend榜单
export const tokenLending_rank=(param:object)=>request({url:API.tokenLending_rank,params:param,method:'get'})
