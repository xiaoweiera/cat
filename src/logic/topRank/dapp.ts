import * as chainApi from '~/api/chains'
//@ts-ignore
import * as api from '~/api/topRank/dapp'
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
  // const result=await api.getDappList(param)
  const result = [
    {
      'id': 1,
      'name': 'Uniswap',
      'logo': '',
      'website': 'https://www.uniswap.org',
      'chain': [{
        'name': 'BSC',
        'slug': 'BSC',
        'logo': '',
      },
        {
          'name': 'BTC',
          'slug': 'BTC',
          'logo': '',
        },
      ],
      'category': '借贷',
      'users': 100,
      'user_change_percent': 23.,
      'revenue': 300.234,
      'revenue_change_percent': 22.2,
      'tvl': 240,
      'tvl_change_percent': 43.2,
      'compare_rate': 99,
    },
    {
      'id': 2,
      'name': 'wowowow',
      'logo': '',
      'website': 'https://www.uniswap.org',
      'chain': [{
        'name': 'ETH',
        'slug': 'ETH',
        'logo': '',
      },
        {
          'name': 'BTC',
          'slug': 'BTC',
          'logo': '',
        },
      ],
      'category': '借贷',
      'users': 520,
      'user_change_percent': 23.3,
      'revenue': 90.234,
      'revenue_change_percent': 22.2,
      'tvl': 88.23,
      'tvl_change_percent': 123.2,
      'compare_rate': 99,
    },
    {
      'id': 3,
      'name': 'nihao',
      'logo': '',
      'website': 'https://www.uniswap.org',
      'chain': [{
        'name': 'OEC',
        'slug': 'OEC',
        'logo': '',
      },
        {
          'name': 'BTC',
          'slug': 'BTC',
          'logo': '',
        },
      ],
      'category': '借贷',
      'users': 810,
      'user_change_percent': 23.3,
      'revenue': 360.234,
      'revenue_change_percent': 22.2,
      'tvl': 620.23,
      'tvl_change_percent': 53.2,
      'compare_rate': 99,
    },
  ]
  return result
  // return getRes(result)
}
