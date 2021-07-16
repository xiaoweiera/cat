/**
 * @file growthPad Heco
 * @author svon.me@gmail.com
 */

import I18n from '../../src/utils/i18n'
import { heco } from './projectInfo'
import * as chat from './chat'
const token = heco.coin // 代币名称

// 转发 twitter 内容
const reTwitterHref = 'https://twitter.com/kingdata_com/status/1415959895728295936?s=21'
const website = 'www.hecochain.com' // 项目官网

const data = {
  token,
  title: heco.title,
  icon: heco.icon,
  dashboard: Object.assign({}, heco.dashboard, {
    // 描述
    description: `The Mystery box event--"Lucky HECO" co-founded by HECO chain, Dapp and crypto artists. This is the first phase of the “Lucky Heco”. Rare NFTs are waiting for you! 
Register the Huobi Global UID and HECO address information, and complete any of the tasks below to participate in the lottery.
Event Time:
1、Please fill in the information before 16:00 (UTC) on 2021/7/21
2、Please check the announcement on 2021/7/23 (UTC) to confirm if you have won the NFT reward.
3、If you win, you will receive the NFT reward in your HECO wallet within 3 days.`,
  }),
  address: {
    placeholder: I18n.growthpad.mdx.address.placeholder
  },
  about: {
    website,
    minutias: [],
    detail: 'Huobi ECO Chain (HECO) is a decentralized, high-efficiency and energy-saving public chain, also the first product launched by the Huobi Open Platform. It is compatible with smart contracts and supports high-performance transactions. The endogenous token of HECO is HT and it adopts the HPoS consensus mechanism. HECO will continue to improve the efficiency of Ethereum by Layer2, which will supplement and empower the Ethereum ecosystem.', // 项目介绍
    share: [
      { icon: 'telegram', href: 'https://t.me/Huobiecochainofficial' },
      { icon: 'twitter', href: 'https://twitter.com/HECO_Chain' },
      // 微博
      { icon: 'sina', href: 'https://weibo.com/p/1005057532436575/home?from=page_100505&mod=TAB&is_all=1' },
      { icon: 'icon-facebook-circle-fill', href: 'https://www.facebook.com/100058911686668/posts/106376634669392/?d=n&substory_index=0' },
      { icon: 'icon-tubiaozhizuomoban-', href: 'https://www.youtube.com/channel/UCuxrLB2myKFnvGStYnwBr8w' },
    ],
  },
  taskDetail: 'Complete any of the following tasks to qualify for the lottery and increase the probability of winning',
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
      'https://twitter.com/KingData_com',
      [10]
    ),
    // 任务3，加入电报群
    chat.telegram(
      'KingData',
      I18n.growthpad.warning.telegram,
      'https://t.me/KingDataEN',
      [10]
    ),
  ],
}

export default data
