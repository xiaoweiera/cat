/**
 * @file 币种相关
 */

import { ref } from 'vue'
import { map } from '~/utils'
import * as model from '~/api/apy2'
import router, { config } from '~/utils/router'
import { TokenItem } from './interface'

// 币种数据
export const tokenList = ref<TokenItem[]>([])

// 获取币种列表数据
export const getTokenList = async function() {
  const list = await model.tokenList()
  tokenList.value = map(function(data: TokenItem, index: number){
    return Object.assign({}, data, {
      href: router({
        path: config.apyToken,
        query: {
          id: `${data.id}-${index}`
        }
      }),
      id: `${data.id}-${index}`,
      name: `${data.name}-${index}`
    })
  }, list)
}

// 初始化，加载币种数据
export const ready = function() {
  return getTokenList()
}
