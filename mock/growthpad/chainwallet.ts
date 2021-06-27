/**
 * @file growthPad ChanWallet
 * @author svon.me@gmail.com
 */

import I18n from '../../src/utils/i18n'
import { chainWallet } from './projectInfo'
import * as chat from './chat'
import TaskType from '~/logic/growthpad/tasktype'
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
  taskList: [
    // 任务1，转发 twitter
    chat.retwitter(
      chainWallet.title,
      I18n.growthpad.warning.article,
      twitterHref,
      [10]
    ),
    // 任务2，关注 twitter
    chat.twitter(
      chainWallet.title,
      I18n.growthpad.warning.article,
      twitterHref,
      [5]
    ),
    // 任务3，加入电报群
    chat.telegram(
      chainWallet.title,
      I18n.growthpad.warning.article,
      twitterHref,
      [10]
    ),
    // 任务4, 微博文章分享推广
    {
      id: chat.uuid(),
      type: TaskType.chainwallet,
      title: '在  ChainWallet 提供一笔流动性，根据质押量获得奖励，最高可得 2500 CHA',
      reward: [2500],
      rule: [
        '大于500U小于10000U，奖励250 CHA',
        '大于10000U小于100000U，奖励1000 CHA',
        '大于100000U，奖励2500 CHA',
      ]
    },
    // 任务4, 微博文章分享推广
    {
      id: chat.uuid(),
      type: TaskType.weibo,
      title: '依据不同平台粉丝数或文章阅读量进行奖励，粉丝数、阅读数据越多，获得奖励越多，奖励金额 100~500 CHA。（粉丝数不低于2000人，阅读量不低于1000）',
      reward: [100, 500],
    },
  ],
}

export default data
