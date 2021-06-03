/**
 * @file growthpad mdx
 * @author svon.me@gmail.com
 * @description mdx
 */

import I18n from '~/utils/i18n/index'
import { growthInfo } from './projectInfo'
import TaskType from '~/logic/growthpad/tasktype'
import * as chat from './chat'
const Project = growthInfo.title


const token = 'USDT'
const website = 'kingdata.com'
const telegramHref = 'https://t.me/MdexEN'
const twitterHref = 'https://www.twitter.com/Mdextech'

const data = {
  token,
  symbol: I18n.common.symbol.divide,
  title: Project, // 名称
  icon: growthInfo.icon, // icondashboard
  dashboard: Object.assign({}, growthInfo.dashboard, {
    description: '本期 GrowthPad 项目增长活动已入驻 3 家，分别是 MDEX、CoinWind 和 Channels。本期活动总奖池金额为价值 $50万的 MDX ，其中 MDEX 增长活动奖金 $20万，CoinWind 增长活动奖金 $20万，Channels 增长活动奖金 $10万。参与本页面 GrowthPad 活动，一起瓜分 12000U 额外奖励。'
  }),
  about: {
    website, // 项目官网
    minutias: [],
    detail: I18n.growthpad.growthpad.about.detail, // 项目介绍

    share: [
      { icon: 'github', href: 'https://github.com/mdexSwap' },
      { icon: 'telegram', href: telegramHref },
      { icon: 'twitter', href: twitterHref },
      // media链接
      { icon: 'vector', href: 'https://mdex.medium.com/' },
      // discord链接
      { icon: 'union', href: 'https://discord.com/invite/3TYDPktjqC' },
    ],
  },
  taskList: [
    // 任务 1
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.friends, // 任务类型
      title: '转发下方活动海报+指定文案至微信朋友圈，截图并上传。',
      description: '',
      reward: [4000], // 奖励
      children: [],
    },
    // 任务 2
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.groups, // 任务类型
      title: '转发下方指定文案至200人以上的币圈微信群，截图并上传，转发群越多，奖励越多。',
      description: '您的奖励金额=您转发的群数/总转发群个数 * 8000 USDT',
      reward: [8000], // 奖励
      children: [],
    },
    // 任务 3
    {
      id: chat.uuid(),
      type: TaskType.allin,
      // title: I18n.growthpad.invited.partake,
      title: I18n.growthpad.mdx.share.title,
      children: [
        {
          title: I18n.growthpad.mdx.share.lable,
        },
      ],
    },
  ],
}

export default data
