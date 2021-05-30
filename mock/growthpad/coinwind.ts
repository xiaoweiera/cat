/**
 * @file growthpad mdx
 * @author svon.me@gmail.com
 * @description mdx
 */

import I18n from '~/utils/i18n/index'
import TaskType from '~/logic/growthpad/tasktype'
import * as chat from './chat'
import { coinwindInfo } from './projectInfo'

const token = 'MDX'
const Project = coinwindInfo.title
const website = 'www.coinwind.com'
const telegramHref = 'https://t.me/CoinWind'
const twitterHref = 'https://twitter.com/coinwind_com'
const retwitterHref = 'https://twitter.com/coinwind_com'


const data = {
  token,
  title: Project, // 名称
  icon: coinwindInfo.icon,
  dashboard: Object.assign({}, coinwindInfo.dashboard, {
    description: I18n.growthpad.coinwind.dashboard.desc, // 描述
  }),
  about: {
    website, // 项目官网
    minutias: [
      { label: I18n.growthpad.about.name, value: I18n.growthpad.mdx.about.name }, // 代币名称
      { label: I18n.growthpad.about.online, value: I18n.growthpad.mdx.about.online }, // 上线时间
      { label: I18n.growthpad.about.count, value: I18n.growthpad.mdx.about.count }, // 发行总量
      { label: I18n.growthpad.about.marketValue, value: I18n.growthpad.mdx.about.marketValue }, // 市值
      { label: I18n.growthpad.about.circulation, value: I18n.growthpad.mdx.about.circulation }, // 当前流通量
      { label: I18n.growthpad.about.price, value: 'price' }, // 当前价格
      { label: I18n.growthpad.about.luanched, value: I18n.growthpad.mdx.about.luanched }, // 所在公链
      // 上线交易所
      {
        label: I18n.growthpad.about.exchanges,
        value: I18n.growthpad.mdx.about.exchanges,
      },
    ],
    detail: I18n.growthpad.coinwind.about.detail, // 项目介绍

    share: [
      { icon: 'telegram', href: telegramHref },
      { icon: 'twitter', href: twitterHref },
      { icon: 'vector', href: 'https://medium.com/coinwind' },
    ],
  },
  taskList: [
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.vip, // 任务类型
      title: I18n.growthpad.coinwind.task1.title,
      description: I18n.template(I18n.growthpad.reward.finished, { count: 500, reward: '{reward}' }),
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.vip,
          title: I18n.template(I18n.growthpad.vip.invite, { group: 'KingData' }),
          description: ''
        },
        chat.telegram(
          Project,
          I18n.growthpad.warning.telegram,
          telegramHref
        ),
        chat.twitter(
          Project,
          I18n.growthpad.warning.follow,
          twitterHref
        ),
        chat.retwitter(
          Project,
          I18n.growthpad.warning.article,
          retwitterHref
        ),
      ],
    },
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.pancake, // 任务类型
      title: I18n.growthpad.coinwind.task2.title,
      description: I18n.growthpad.coinwind.task2.description,
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.pancake,
          title: I18n.growthpad.coinwind.task2.condition1,
          description: I18n.growthpad.mdx.activity.warning,
        },
        chat.telegram(
          Project,
          I18n.growthpad.warning.telegram,
          telegramHref
        ),
        chat.twitter(
          Project,
          I18n.growthpad.warning.follow,
          twitterHref
        ),
        chat.retwitter(
          Project,
          I18n.growthpad.warning.article,
          retwitterHref
        ),
      ],
    },
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.autofarm, // 任务类型
      title: I18n.growthpad.coinwind.task3.title,
      description: I18n.growthpad.coinwind.task2.description,
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.autofarm,
          title: I18n.growthpad.coinwind.task3.condition1,
          description: I18n.growthpad.mdx.activity.warning,
        },
        chat.telegram(
          Project,
          I18n.growthpad.warning.telegram,
          telegramHref
        ),
        chat.twitter(
          Project,
          I18n.growthpad.warning.follow,
          twitterHref
        ),
        chat.retwitter(
          Project,
          I18n.growthpad.warning.article,
          retwitterHref
        ),
      ],
    },
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.beltfit, // 任务类型
      title: I18n.growthpad.coinwind.task4.title,
      description: I18n.growthpad.coinwind.task2.description,
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.beltfit,
          title: I18n.growthpad.coinwind.task4.condition1,
          description: I18n.growthpad.mdx.activity.warning,
        },
        chat.telegram(
          Project,
          I18n.growthpad.warning.telegram,
          telegramHref
        ),
        chat.twitter(
          Project,
          I18n.growthpad.warning.follow,
          twitterHref
        ),
        chat.retwitter(
          Project,
          I18n.growthpad.warning.article,
          retwitterHref
        ),
      ],
    },
    // 任务 5
    {
      id: chat.uuid(),
      type: TaskType.weibo,
      title: I18n.template(I18n.growthpad.weibo.title, { count: 500, project: Project }),
      reward: [3, 100],
      children: [],
    },
    // 任务 5
    {
      id: chat.uuid(),
      type: TaskType.allin,
      title: I18n.growthpad.invited.partake,
      children: [
        {
          title: I18n.growthpad.mdx.share.lable,
        },
      ],
    },
  ],
}

export default data
