//@ts-ignore
import * as api from '~/api/topRank/nft'
import { dappListModel } from '~/logic/topRank/interface'

const getRes = (obj: any) => {
  if (obj.code === 0) {
    return obj?.data
  }
  return obj
}
//nft列表
export const nftList = async (param: dappListModel) => {
  const result={
    page_info:{},
    results:    [ {
      "id": 1,
      "name": "Uniswap",
      "logo": "http://xxx.jpg",
      "website": "https://www.uniswap.org",
      "chains": [{
        "name": "ETH",
        "slug": "ETH",
        "logo": "http://xxx.jpg"
      }],
      "categories": ["游戏1"],
      "volume": 234.34,
      "owners": 120,
      "assets": 2342342,
      "floor_price": 2334.22,
      "avg_price": 234234.22,
      "mcap": 2342342432,
      "h24_volume_change_percent": 32.22,
      "d7_volume_change_percent": 32.22,
      "max_stat": {
        "volume": 234234,
        "owners": 23434,
        "assets": 2343243,
        "floor_price": 2334.22,
        "avg_price": 23423422,
        "mcap": 2342342432,
        "h24_volume_change_percent": 32.22,
        "d7_volume_change_percent": 32.22,
      }
    },
      {
        "id": 1,
        "name": "Uniswap",
        "logo": "http://xxx.jpg",
        "website": "https://www.uniswap.org",
        "chains": [{
          "name": "ETH",
          "slug": "ETH",
          "logo": "http://xxx.jpg"
        }],
        "categories": ["游戏",'就哦家'],
        "volume": 104.34,
        "owners": 100,
        "assets": 1342342,
        "floor_price": 1334.22,
        "avg_price": 134234.22,
        "mcap": 1342342432,
        "h24_volume_change_percent": 22.22,
        "d7_volume_change_percent": 12.22,
        "max_stat": {
          "volume": 234234,
          "owners": 23434,
          "assets": 2343243,
          "floor_price": 2334.22,
          "avg_price": 234234.22,
          "mcap": 2342342432,
          "h24_volume_change_percent": 32.22,
          "d7_volume_change_percent": 32.22,
        }
      },
      {
        "id": 1,
        "name": "Uniswap",
        "logo": "http://xxx.jpg",
        "website": "https://www.uniswap.org",
        "chains": [{
          "name": "ETH",
          "slug": "ETH",
          "logo": "http://xxx.jpg"
        }],
        "categories": ["游戏2"],
        "volume": 294.34,
        "owners": 80,
        "assets": 942342,
        "floor_price": 934.22,
        "avg_price": 224234.22,
        "mcap": 2142342432,
        "h24_volume_change_percent": 14.22,
        "d7_volume_change_percent": 19.22,
        "max_stat": {
          "volume": 234234,
          "owners": 23434,
          "assets": 2343243,
          "floor_price": 2334.22,
          "avg_price": 234234.22,
          "mcap": 2342342432,
          "h24_volume_change_percent": 32.22,
          "d7_volume_change_percent": 32.22,
        }
      }]
  }

  return result
  // const result=await api.getNftList(param)
  return getRes(result)
}
