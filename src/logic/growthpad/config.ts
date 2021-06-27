/**
 * @file growthpad 任务配置
 * @author svon.me@gmail.com
 */


import { toUpper } from 'ramda'
import I18n from '~/utils/i18n/index'

// 项目 ID
export enum ProjectKey {
  mdx = 'MDX',
  channels = 'CHANNELS',
  coinwind = 'COINWIND',
  growth = 'GROWTH',
  chainwallet = 'CHAINWALLET'
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
  [ProjectKey.chainwallet]: '-G5',
}


// 项目页面标题
export const ProjectPageTitle: any = {
  [ProjectKey.mdx]: `${I18n.growthpad.mdx.title}-GrowthPad`,
  [ProjectKey.channels]: `${I18n.growthpad.channels.title}-GrowthPad`,
  [ProjectKey.coinwind]: `${I18n.growthpad.coinwind.title}-GrowthPad`,
}


export const ProjectCopyTitle = {
  [ProjectKey.coinwind]: I18n.growthpad.coinwind.title,
  [ProjectKey.mdx]: I18n.growthpad.mdx.title,
  [ProjectKey.channels]: I18n.growthpad.channels.title,
  [ProjectKey.growth]: I18n.growthpad.growthpad.title
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
  [ProjectKey.chainwallet]: I18n.template(I18n.growthpad.wechat.title, {
    project: 'ChainWallet'
  })
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
  [ProjectKey.chainwallet]: I18n.template(I18n.growthpad.wechat.desc, {
    project: 'ChainWallet'
  })
}


