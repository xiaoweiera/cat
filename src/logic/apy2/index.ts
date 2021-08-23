import * as api from '~/api/index'
const getRes=(obj:any)=>{
    if(obj.code===0){
        return obj?.data
    }
    return obj
}
import { miningPoolParam,loanPoolParam,miningChart} from '~/logic/apy2/interface'
import {echartTransform} from '~/lib/common'
//挖矿分组
export const getMiningGroup=async (chain:string)=>{
    const result=await api.apy.mining.mining_group({chain:chain})
    return getRes(result)
}
//借贷分组
export const getLendingGroup=async (chain:string)=>{
    const result=await api.apy.loan.lending_group({chain:chain})
    return getRes(result)
}
//挖矿榜单top5
export const getMining_rank=async (group_id:number,chain:string)=>{
    const result=await api.apy.mining.mining_rank({group_id:group_id,chain:chain})
    return getRes(result)
}
//借款榜单top5
export const getLending_rank=async (group_id:number,chain:string)=>{
    const result=await api.apy.loan.lending_rank({group_id:group_id,chain:chain})
    return getRes(result)
}
//币种列表
export const getTokenList = async () =>api.apy.common.getTokenList()
//项目列表
export const getProjectList=async (chain:string,query:string)=>{
    const result=await api.apy.common.getProjectList({chain:chain,query:query})
    return getRes(result)
}
export const getTokenAndProject=async (chain:string)=>{
   const [tokenRes,projectRes]= await Promise.all([getTokenList(),getProjectList(chain,'')])
    return [tokenRes,projectRes]
}
//项目相亲
export const getProjectDetail=async (projectId:number)=>{
    const result=await api.apy.common.getProjectDetail(projectId)
    return getRes(result)
}
//矿池列表
export const getPoolsList=async (projectId:number,pool_type:string,chain:string,symbol_type:string,query:string)=>{
    const result=await api.apy.common.getPoolsList({projectId,pool_type,chain,symbol_type,query})
    return getRes(result)
}
//挖矿池子列表
export const getMiningPools=async (param:miningPoolParam)=>{
    const result=await api.apy.mining.mining_pools(param)
    return getRes(result)
}
//借贷池子列表
export const getLoanPools=async (param:loanPoolParam)=>{
    const result=await api.apy.loan.lending_pools(param)
    return getRes(result)
}
//挖矿top10图表
export const getTop10Chart=async (param:miningChart)=>{
    const result=await api.apy.mining.mining_best10(param)
    const res=getRes(result)
    console.log( echartTransform(res),'aaaa',res,'bb')
    return getRes(result)
}


