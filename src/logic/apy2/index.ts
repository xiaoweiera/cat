import * as api from '~/api/index'
//挖矿分组
export const getMiningGroup=async (chain:string)=>{
    const result=await api.apy.mining.mining_group({chain:chain})
    if(result.code===0){
        return result?.data
    }
}
//借贷分组
export const getLendingGroup=async (chain:string)=>{
    const result=await api.apy.loan.lending_group({chain:chain})
    if(result.code===0){
        return result?.data
    }
}
//挖矿榜单top5
export const getMining_rank=async (group_id:number,chain:string)=>{
    const result=await api.apy.mining.mining_rank({group_id:group_id,chain:chain})
    if(result.code===0){
        return result?.data
    }
}
//借款榜单top5
export const getLending_rank=async (group_id:number,chain:string)=>{
    const result=await api.apy.mining.mining_rank({group_id:group_id,chain:chain})
    if(result.code===0){
        return result?.data
    }
}
//币种列表
export const getTokenList = () => {
    return api.apy.common.getTokenList()
}
//项目列表
export const getProjectList=async (chain:string,query:string)=>{
    const result=await api.apy.common.getProjectList({chain:chain,query:query})
    if(result.code===0){
        return result?.data
    }
}
export const getTokenAndProject=async (chain:string)=>{
   const [tokenRes,projectRes]= await Promise.all([getTokenList(),getProjectList(chain,'')])
    console.log(tokenRes,'--',projectRes)
    return [tokenRes,projectRes]
}
