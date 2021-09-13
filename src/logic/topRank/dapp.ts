import * as api from '~/api/chains'
const getRes=(obj:any)=>{
    if(obj.code===0){
        return obj?.data
    }
    return obj
}
//挖矿分组
export const getChains=async (chain:string)=>{
    const result=await api.getChains()
    return getRes(result)
}