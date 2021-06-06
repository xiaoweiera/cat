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
  dashboard: growthInfo.dashboard,
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
      title: I18n.growthpad.growthpad.task1.title,
      description: '',
      reward: [4000], // 奖励
      children: [],
    },

    // 任务 2
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.groups, // 任务类型
      title: I18n.growthpad.growthpad.task2.title,
      description: I18n.growthpad.growthpad.task2.desc,
      reward: [8000], // 奖励
      children: [],
    },



    // 任务 3
    {
      id: chat.uuid(),
      type: TaskType.allin,
      title: I18n.growthpad.mdx.share.title,
      children: [
        {
          id: chat.uuid(), // 任务ID
          title: I18n.growthpad.mdx.share.lable,
        },
      ],
    },
  ],
}

export default data
