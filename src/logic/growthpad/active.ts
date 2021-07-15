/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { wxShare } from '~/lib/wxShare'
import Store from '~/store/growthpad/store'

import {
  getProjectType,
  ProjectPageTitle,
  ProjectShareTitle,
  ProjectShareDesc
} from '~/logic/growthpad/config'

export const loading = ref<boolean>(true)

const meta = [
  {
    name: 'keywords',
    content:
      'BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis 增长平台  GrowthPad',
  },
  {
    name: 'description',
    content:
      'GrowthPad 旨在根据精准的用户行为画像，精妙的建模、高效的任务模式，让项目方可以摆脱传统的冷启动方式，精准找到目标用户。同样平台也帮助企业把丰厚的奖励分发给目标用户，避免羊毛党和科学家，真正的做到了企业快速增长。',
  },
]

export const ready = async function(store: Store): Promise<void> {
  const name = store.getNickName()
  // 项目名称
  const id = getProjectType(name)
  if (id) {
    if (ProjectPageTitle[id]) {
      useHead({
        meta,
        title: ProjectPageTitle[id]
      })
    }
    const title: string = ProjectShareTitle[id]
    const desc: string = ProjectShareDesc[id]
    // 设置分享地址
    wxShare(title, desc)
    await store.init()
    loading.value = false
  } else {
    window.location.href = `/growthpad${window.location.search}`
  }
}
