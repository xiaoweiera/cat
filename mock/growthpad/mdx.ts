/**
 * @file growthpad mdx
 * @author svon.me@gmail.com
 * @description mdx
 */

import I18n from '~/utils/i18n/index'
import { mdxInfo } from './projectInfo'
import TaskType from '~/logic/growthpad/tasktype'
import * as chat from './chat'
const Project = mdxInfo.title

/*
MDEX链接
项目官网：https://mdex.com/
telegram链接：t.me/Can
twitter链接：https://www.twitter.com/Mdextech
media链接：https://mdex.medium.com/
discord链接：https://discord.com/invite/3TYDPktjqC
 */

const token = 'MDX'
const website = 'mdex.com'
const telegramHref = I18n.growthpad.mdx.share.telegram
const twitterHref = 'https://twitter.com/Mdextech'
const retwitterHref = 'https://twitter.com/Mdextech/status/1395323254974214150'

const data = {
  token,
  title: Project, // 名称
  icon: mdxInfo.icon, // icondashboard
  dashboard: Object.assign({}, mdxInfo.dashboard, {
    description: I18n.growthpad.mdx.dashboard.desc
  }),
  about: {
    website, // 项目官网
    minutias: [
      { label: I18n.growthpad.about.name, value: I18n.growthpad.mdx.about.name }, // 代币名称
      { label: I18n.growthpad.about.online, value: I18n.growthpad.mdx.about.online }, // 上线时间
      { label: I18n.growthpad.about.count, value: I18n.growthpad.mdx.about.count }, // 发行总量
      // { label: I18n.growthpad.about.marketValue, value: I18n.growthpad.mdx.about.marketValue }, // 市值
      // { label: I18n.growthpad.about.circulation, value: I18n.growthpad.mdx.about.circulation }, // 当前流通量
      // { label: I18n.growthpad.about.price, value: 'price' }, // 当前价格
      { label: I18n.growthpad.about.luanched, value: I18n.growthpad.mdx.about.luanched }, // 所在公链
      // 上线交易所
      {
        label: I18n.growthpad.about.exchanges,
        value: I18n.growthpad.mdx.about.exchanges,
      },
    ],
    detail: I18n.growthpad.mdx.about.detail, // 项目介绍

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
      type: TaskType.vip, // 任务类型
      title: I18n.template(I18n.growthpad.vip.activity, { project: Project, group: 'KingData' }),
      description: I18n.template(I18n.growthpad.reward.finished, { count: 1000, reward: '{reward}' }),
      reward: [3], // 奖励
      children: [
        {
          id: chat.uuid(), // 任务ID
          type: TaskType.vip,
          title: I18n.template(I18n.growthpad.vip.invite, { group: 'KingData' }),
          // description: I18n.growthpad.vip.description, // 帮助信息
        },
        chat.telegram(Project, I18n.growthpad.warning.telegram, telegramHref),
        chat.twitter(Project, I18n.growthpad.warning.follow, twitterHref),
        chat.retwitter(Project, I18n.growthpad.warning.article, retwitterHref),
      ],
    },
    // 任务 2
    {
      id: chat.uuid(),
      type: TaskType.pancake,
      title: I18n.growthpad.mdx.activity.pancake,
      description: I18n.template(I18n.growthpad.reward.anytask, { count: 1000, reward: '{reward}' }),
      reward: [5, 15],
      children: [
        {
          id: chat.uuid(), // 任务ID
          type: TaskType.pancake,
          title: I18n.growthpad.mdx.activity.pancakeCondition,
          description: I18n.growthpad.mdx.activity.warning,
        },
        chat.telegram(Project, I18n.growthpad.warning.telegram, telegramHref, [5]),
        chat.twitter(Project, I18n.growthpad.warning.follow, twitterHref, [5]),
        chat.retwitter(Project, I18n.growthpad.warning.article, retwitterHref, [5]),
      ],
    },
    // 任务 3
    {
      id: chat.uuid(),
      type: TaskType.uniswap,
      title: I18n.growthpad.mdx.activity.uniswap,
      description: I18n.template(I18n.growthpad.reward.anytask, { count: 1000, reward: '{reward}' }),
      reward: [5, 15],
      children: [
        {
          id: chat.uuid(), // 任务ID
          type: TaskType.uniswap,
          title: I18n.growthpad.mdx.activity.uniswapCondition,
          description: I18n.growthpad.mdx.activity.warning,
        },
        chat.telegram(Project, I18n.growthpad.warning.telegram, telegramHref, [5]),
        chat.twitter(Project, I18n.growthpad.warning.follow, twitterHref, [5]),
        chat.retwitter(Project, I18n.growthpad.warning.article, retwitterHref, [5]),
      ],
    },
    // 任务 4
    {
      id: chat.uuid(),
      type: TaskType.sushiswap,
      title: I18n.growthpad.mdx.activity.sushiswap,
      description: I18n.template(I18n.growthpad.reward.anytask, { count: 1000, reward: '{reward}' }),
      reward: [5, 15],
      children: [
        {
          id: chat.uuid(), // 任务ID
          type: TaskType.sushiswap,
          title: I18n.growthpad.mdx.activity.sushiswapCondition,
          description: I18n.growthpad.mdx.activity.warning,
        },
        chat.telegram(Project, I18n.growthpad.warning.telegram, telegramHref, [5]),
        chat.twitter(Project, I18n.growthpad.warning.follow, twitterHref, [5]),
        chat.retwitter(Project, I18n.growthpad.warning.article, retwitterHref, [5]),
      ],
    },
    // 任务 5
    {
      id: chat.uuid(),
      type: TaskType.weibo,
      title: I18n.template(I18n.growthpad.weibo.title, { count: 500, project: Project }),
      reward: [100, 300],
      children: [],
    },
    // 任务 6
    {
      id: chat.uuid(),
      type: TaskType.allin,
      // title: I18n.growthpad.invited.partake,
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
