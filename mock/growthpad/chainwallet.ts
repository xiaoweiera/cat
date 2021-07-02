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
const sinaHref = 'https://weibo.com/u/7613046674'
const website = `https://${chainWallet.website}`
// 关注 twitter 链接地址
const twitterHref = 'https://twitter.com/Chain__Wallet'
// 转发的 twitter 的文章地址
const reTwitterHref = 'https://twitter.com/kingdata_com/status/1410801714836377601?s=21'

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
      // 微博
      { icon: 'sina', href: sinaHref },
    ],
  },
  weibo: {
    title: '', // I18n.growthpad.chainwallet.task5.title
    desc: I18n.growthpad.chainwallet.task5.desc
  },
  taskList: [
    // 任务1，转发 twitter
    chat.retwitter(
      chainWallet.title,
      I18n.growthpad.warning.article,
      reTwitterHref,
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
      telegramHref,
      [10]
    ),
    // 任务4, 微博文章分享推广
    {
      id: chat.uuid(),
      type: TaskType.chainwallet,
      title: I18n.growthpad.chainwallet.task4.title,
      reward: [2500],
      rule: [
        I18n.growthpad.chainwallet.task4.rule1,
        I18n.growthpad.chainwallet.task4.rule2,
        I18n.growthpad.chainwallet.task4.rule3,
        I18n.growthpad.chainwallet.task4.rule4,
      ]
    },
    // 任务4, 微博文章分享推广
    {
      id: chat.uuid(),
      type: TaskType.weibo,
      title: I18n.template(I18n.growthpad.weibo.title, { count: 500, project: chainWallet.title }),
      reward: [100, 500],
    },
  ],
}

export default data
