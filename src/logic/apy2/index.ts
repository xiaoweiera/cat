import * as api from '~/api/index'
const getRes=(obj:any)=>{
    if(obj.code===0){
        return obj?.data
    }
    return obj
}
import { miningPoolParam,loanPoolParam,miningChart,projectMiningChart,projectLoanChart,projectDetailChart,projectSameChart,projectMiningList,projectLoanList,tokenMiningPoolParam} from '~/logic/apy2/interface'
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
export const getTokenList = async ()=>{
    const result=await api.apy.common.getTokenList()
    return getRes(result)
}
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
export const getPoolsList=async (project_id:number,pool_type:string,chain:string,symbol_type:string,query:string)=>{
    const result=await api.apy.common.getPoolsList({project_id,pool_type,chain,symbol_type,query})
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
export const getMiningTop10Chart=async (param:miningChart)=>{
    const result=await api.apy.mining.mining_best10(param)
    return getRes(result)
}
//借贷top10图表
export const getLoanTop10Chart=async (param:miningChart)=>{
    const result=await api.apy.loan.lending_best10(param)
    return getRes(result)
}
//项目挖矿top10图表
export const getProjectMiningTop10Chart=async (param:projectMiningChart)=>{
    const result=await api.apy.project.mining_best10(param)
    return getRes(result)
}
//项目借贷top10图表
export const getProjectLoanTop10Chart=async (param:projectLoanChart)=>{
    const result=await api.apy.project.lending_best10(param)
    return getRes(result)
}
//项目数据总览图表
export const getDetail_chart=async (param:projectDetailChart)=>{
    const result=await api.apy.project.detail_chart(param)
    return getRes(result)
}
//同类项目数据图表
export const getSame_category=async (param:projectSameChart)=>{
    const result=await api.apy.project.same_category(param)
    return getRes(result)
}
//项目挖矿列表
export const getProjectMining_pools=async (param:projectMiningList)=>{
    const result=await api.apy.project.mining_pools(param)
    return getRes(result)
}
//项目借贷列表
export const getProjectLending_pools=async (param:projectLoanList)=>{
    const result=await api.apy.project.lending_pools(param)
    return getRes(result)
}
//token挖矿列表
export const getProjectTokenMining_pools=async (param:tokenMiningPoolParam)=>{
    const result=await api.apy.mining.tokenMining_pools(param)
    return getRes(result)
}





