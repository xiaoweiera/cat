/**
 * @file growthPad Heco
 * @author svon.me@gmail.com
 */

import I18n from '../../src/utils/i18n'
import { heco } from './projectInfo'
import * as chat from './chat'
const token = heco.coin // 代币名称

const telegramHref = 'https://t.me/Huobiecochainofficial'
// 关注 twitter 链接地址
const twitterHref = 'https://twitter.com/HECO_Chain'
// 转发的 twitter 的文章地址
const reTwitterHref = 'https://twitter.com/kingdata_com/status/1410801714836377601?s=21'

const data = {
  token,
  title: heco.title,
  icon: heco.icon,
  dashboard: heco.dashboard,
  address: {
    placeholder: I18n.growthpad.mdx.address.placeholder
  },
  about: {
    website: 'www.hecochain.com',
    minutias: [],
    detail: I18n.growthpad.heco.about.detail, // 项目介绍
    share: [
      { icon: 'telegram', href: telegramHref },
      { icon: 'twitter', href: twitterHref },
      // 微博
      { icon: 'sina', href: 'https://weibo.com/p/1005057532436575/home?from=page_100505&mod=TAB&is_all=1' },
      { icon: 'icon-facebook-circle-fill', href: 'https://www.facebook.com/100058911686668/posts/106376634669392/?d=n&substory_index=0' },
      { icon: 'icon-tubiaozhizuomoban-', href: 'https://www.youtube.com/channel/UCuxrLB2myKFnvGStYnwBr8w' },
    ],
  },
  taskList: [
    // 任务1，转发 twitter
    chat.retwitter(
      heco.title,
      I18n.growthpad.warning.article,
      reTwitterHref,
      [10]
    ),
    // 任务2，关注 twitter
    chat.twitter(
      'KingData',
      I18n.growthpad.warning.follow,
      twitterHref,
      [5]
    ),
    // 任务3，加入电报群
    chat.telegram(
      'KingData',
      I18n.growthpad.warning.telegram,
      telegramHref,
      [10]
    ),
  ],
}

export default data
