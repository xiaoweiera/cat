/**
 * @file growthpad 任务配置
 * @author svon.me@gmail.com
 */

import { toUpper } from 'ramda'
import I18n from '~/utils/i18n/index'

import mockMdx from '../../../mock/growthpad/mdx'
import mockChannels from '../../../mock/growthpad/channels'
import mockCoinWind from '../../../mock/growthpad/coinwind'
import mockGrowth from '../../../mock/growthpad/growth'
// import mockChainWallet from '../../../mock/growthpad/chainwallet'
import mockHeco from '../../../mock/growthpad/heco'

// 项目 ID

export enum ProjectKey {
  mdx = 'MDX',
  channels = 'CHANNELS',
  coinwind = 'COINWIND',
  growth = 'GROWTH',
  // chainwallet = 'CHAINWALLET'
  heco = 'HECO',
}

export const ProjectMockData = {
  [ProjectKey.mdx]: mockMdx,
  [ProjectKey.channels]: mockChannels,
  [ProjectKey.coinwind]: mockCoinWind,
  [ProjectKey.growth]: mockGrowth,
  // [ProjectKey.chainwallet]: mockChainWallet
  [ProjectKey.heco]: mockHeco,
}

/**
 * 处理项目名称
 * @param project ProjectKey
 * @description 不区分大小写，判断项目 id 是否争取，正确则返回配置中的 id
 */
export const getProjectType = function(project: string | ProjectKey): ProjectKey | undefined {
  const value: string = project ? toUpper(project) : ''

  const keys = Object.values<string>(ProjectKey)

  if (value && keys.includes(value)) {
    return value as ProjectKey
  }
  return void 0
}

// 分享代码
export const ProjectShareCode: any = {
  [ProjectKey.mdx]: '-G1',
  [ProjectKey.coinwind]: '-G2',
  [ProjectKey.channels]: '-G3',
  [ProjectKey.growth]: '-G4',
  // [ProjectKey.chainwallet]: '-G5',
  [ProjectKey.heco]: '-G6'
}


// 项目页面标题
export const ProjectPageTitle: any = {
  [ProjectKey.mdx]: `${I18n.growthpad.mdx.title}-GrowthPad`,
  [ProjectKey.channels]: `${I18n.growthpad.channels.title}-GrowthPad`,
  [ProjectKey.coinwind]: `${I18n.growthpad.coinwind.title}-GrowthPad`,
  // [ProjectKey.chainwallet]: `${I18n.growthpad.chainwallet.title as any}-GrowthPad`
  [ProjectKey.heco]: `${I18n.growthpad.heco.title}-GrowthPad`,
}


export const ProjectCopyTitle = {
  [ProjectKey.coinwind]: I18n.growthpad.coinwind.title,
  [ProjectKey.mdx]: I18n.growthpad.mdx.title,
  [ProjectKey.channels]: I18n.growthpad.channels.title,
  [ProjectKey.growth]: I18n.growthpad.growthpad.title,
  // [ProjectKey.chainwallet]: I18n.growthpad.chainwallet.title as any
  [ProjectKey.heco]: I18n.growthpad.heco.title,
}

// 项目分享标题
export const ProjectShareTitle: any = {
  [ProjectKey.mdx]: I18n.template(I18n.growthpad.wechat.title, {
    project: 'MDEX'
  }),
  [ProjectKey.channels]: I18n.template(I18n.growthpad.wechat.title, {
    project: 'Channels'
  }),
  [ProjectKey.coinwind]: I18n.template(I18n.growthpad.wechat.title, {
    project: 'CoinWind'
  }),
  [ProjectKey.growth]: I18n.template(I18n.growthpad.wechat.title, {
    project: 'GrowthPad'
  }),
  // [ProjectKey.chainwallet]: I18n.template(I18n.growthpad.wechat.title, {
  //   project: 'ChainWallet'
  // }),
  [ProjectKey.heco]: I18n.template(I18n.growthpad.wechat.title, {
    project: I18n.growthpad.heco.title
  }),
}
// 项目分享描述
export const ProjectShareDesc: any = {
  [ProjectKey.mdx]: I18n.template(I18n.growthpad.wechat.desc, {
    project: 'MDEX'
  }),
  [ProjectKey.channels]: I18n.template(I18n.growthpad.wechat.desc, {
    project: 'Channels'
  }),
  [ProjectKey.coinwind]: I18n.template(I18n.growthpad.wechat.desc, {
    project: 'CoinWind'
  }),
  [ProjectKey.growth]: I18n.template(I18n.growthpad.wechat.desc, {
    project: 'GrowthPad'
  }),
  // [ProjectKey.chainwallet]: I18n.template(I18n.growthpad.wechat.desc, {
  //   project: 'ChainWallet'
  // }),
  // [ProjectKey.heco]: I18n.template(I18n.growthpad.wechat.desc, {
  //   project: I18n.growthpad.heco.title
  // }),
  [ProjectKey.heco]: 'Lucky Heco event is live, fill in Heco address to get NFT Mystery box!',
}


