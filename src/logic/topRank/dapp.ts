import * as chainApi from '~/api/chains'
//@ts-ignore
import * as api from '~/api/topRank/dapp'
import * as apiNft from '~/api/topRank/nft'
import { dappListModel } from '~/logic/topRank/interface'

const getRes = (obj: any) => {
  if (obj.code === 0) {
    return obj?.data
  }
  return obj
}
//链
export const getChains = async (page: string) => {
  const result = await chainApi.getChains({ position: page })
  return getRes(result)
}
//dapp列表
export const dappList = async (param: dappListModel) => {
  const result=await api.getDappList(param)
  return getRes(result)
}
export const getChart=async (page:string)=>{
  let result
  if(page){
    result=await api.chart()
  }else{
    result=await apiNft.chart()
  }
  result={
    "interval": "7D",
    "tvl": 234324,
    "tvl_change_percent": 23.2,
    "legends": [
      {
        "type": "",
        "color": "red",
        "kline": false,
        "unit": "$",
        "tvl": 324234,
      },
    ],
    "series": [
      {
        "value": 120,
        "detail": ""
      },
      {
        "value": 130,
        "detail": ""
      },
      {
        "value": 30,
        "detail": ""
      },
      {
        "value": 50,
        "detail": ""
      },
    ],
    "xAxis": [
      1614787200,
      1614873600,
      1614960000,
      1615046400
    ]
  }
  return result
  console.log(getRes(result))
  return getRes(result)
}