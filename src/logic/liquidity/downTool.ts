import {liquidity_token_first_level,liquidity_pair_first_level} from '~/api/liquidity'
interface firstModel{
    pair_id?:string
    symbol_id?:string
    ts:string
    interval:string
}
//得到下钻一级数据
export const getDownFirstData=async (param:firstModel,chartType:string,pair_id:string)=>{
    if(chartType==='flow'){
        if(!pair_id){
            const res=await liquidity_token_first_level(param)
            return res.data
        }else{
            const res=await liquidity_pair_first_level(param)
            return res.data
        }

    }else{

    }

}
