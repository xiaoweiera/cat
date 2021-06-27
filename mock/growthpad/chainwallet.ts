/**
 * @file growthPad ChanWallet
 * @author svon.me@gmail.com
 */

import I18n from '../../src/utils/i18n'
import { chainWallet } from './projectInfo'

const token = chainWallet.coin // 代币名称

const telegramHref = 'https://t.me/CHA_Wallet'
// const sinaHref = 'https://weibo.com/u/7613046674'
const website = `https://${chainWallet.website}`
const twitterHref = 'https://twitter.com/Chain__Wallet'

const data = {
  token,
  title: chainWallet.title,
  icon: 'https://res.ikingdata.com/icon/chainwallet.png',
  dashboard: chainWallet.dashboard,
  address: {
    placeholder: I18n.growthpad.growthpad.address.placeholder
  },
  about: {
    website, // 项目官网
    minutias: [
      { label: I18n.growthpad.about.name, value: chainWallet.coin }, // 代币名称
      { label: I18n.growthpad.about.online, value: I18n.growthpad.chainwallet.about.online }, // 上线时间
      { label: I18n.growthpad.about.count, value: I18n.growthpad.chainwallet.about.count }, // 发行总量
      { label: I18n.growthpad.about.luanched, value: I18n.growthpad.chainwallet.about.luanched }, // 所在公链
    ],
    detail: I18n.growthpad.chainwallet.about.detail, // 项目介绍
    tokenDetail: I18n.growthpad.chainwallet.about.tokenDetail,
    share: [
      { icon: 'telegram', href: telegramHref },
      { icon: 'twitter', href: twitterHref },
      // media链接
      { icon: 'vector', href: '/' },
      // discord链接
      { icon: 'union', href: '/' },
    ],
  },
  taskList: [],
}

export default data
