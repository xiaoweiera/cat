/**
 * @file growthpad mdx
 * @author svon.me@gmail.com
 * @description mdx
 */

import I18n from '~/utils/i18n/index'
import TaskType from '~/logic/growthpad/tasktype'
import * as chat from './chat'

const token = 'U'
const Project = 'Channels'
const website = 'channels.finance'
const telegramHref = 'https://t.me/channels_finance'
const twitterHref = 'https://twitter.com/ChannelsFinance'
const sinaHref = 'https://twitter.com/Mdextech'


const data = {
  token,
  title: Project, // 名称
  icon: 'https://res.ikingdata.com/icon/channels.svg', // icon
  dashboard: {
    begin: '2021-05-25 12:00:00', // 开始时间
    end: '2021-05-30 12:00:00', // 结束时间
    description: I18n.growthpad.channels.dashboard.desc, // 描述
    reward: {
      count: 100000, // 奖励数量
      cost: 1000000, // 价值
      limits: [100, 500], // 每人可领取范围
    },
  },
  about: {
    website, // 项目官网
    minutias: [
      { label: I18n.growthpad.about.name, value: I18n.growthpad.channels.about.name }, // 代币名称
      { label: I18n.growthpad.about.online, value: I18n.growthpad.channels.about.online }, // 上线时间
      { label: I18n.growthpad.about.count, value: I18n.growthpad.channels.about.count }, // 发行总量
      { label: I18n.growthpad.about.marketValue, value: I18n.growthpad.channels.about.marketValue }, // 市值
      { label: I18n.growthpad.about.circulation, value: I18n.growthpad.channels.about.circulation }, // 当前流通量
      { label: I18n.growthpad.about.luanched, value: I18n.growthpad.channels.about.luanched }, // 所在公链
      // 上线交易所
      {
        label: I18n.growthpad.about.exchanges,
        value: I18n.growthpad.mdx.about.exchanges,
      },
    ],
    detail: I18n.growthpad.channels.about.detail, // 项目介绍

    share: [
      { icon: 'telegram', href: telegramHref },
      { icon: 'twitter', href: twitterHref },
      { icon: 'union', href: 'https://discord.gg/VMNGuDzxnq' },
    ],
  },
  taskList: [
    // 任务 1
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.venus, // 任务类型
      title: I18n.growthpad.channels.task1.title,
      description: '',
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.venus,
          title: I18n.template(I18n.growthpad.channels.activity.label, { group: 'Venus' }),
          description: ''
        },
        chat.telegram(
          Project,
          I18n.template(I18n.growthpad.front['2000'], {
            value: I18n.growthpad.warning.telegram
          }),
          telegramHref,
        ),
        chat.twitter(
          Project,
          I18n.template(I18n.growthpad.front['500'], {
            value: I18n.growthpad.warning.twitter
          }),
          twitterHref
        ),
        chat.sina(
          Project,
          I18n.template(I18n.growthpad.front['500'], {
            value: I18n.growthpad.warning.sina
          }),
          sinaHref
        )
      ],
    },
    // 任务 2
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.cream, // 任务类型
      title: I18n.growthpad.channels.task1.title,
      description: '',
      reward: [16], // 奖励
      children: [
        {
          type: TaskType.cream,
          title: I18n.template(I18n.growthpad.channels.activity.label, { group: 'Cream' }),
          description: ''
        },
        chat.telegram(
          Project,
          I18n.template(I18n.growthpad.front['2000'], {
            value: I18n.growthpad.warning.telegram
          }),
          telegramHref,
          [10]
        ),
        chat.twitter(
          Project,
          I18n.template(I18n.growthpad.front['500'], {
            value: I18n.growthpad.warning.twitter
          }),
          twitterHref,
          [3]
        ),
        chat.sina(
          Project,
          I18n.template(I18n.growthpad.front['500'], {
            value: I18n.growthpad.warning.sina
          }),
          sinaHref,
          [3]
        )
      ],
    },
    // 任务 3
    {
      id: chat.uuid(), // 任务ID
      type: TaskType.compound, // 任务类型
      title: I18n.growthpad.channels.task1.title,
      description: '',
      reward: [16], // 奖励
      children: [
        {
          type: TaskType.cream,
          title: I18n.template(I18n.growthpad.channels.activity.label, { group: 'Compound' }),
          description: ''
        },
        chat.telegram(
          Project,
          I18n.template(I18n.growthpad.front['2000'], {
            value: I18n.growthpad.warning.telegram
          }),
          telegramHref,
          [10]
        ),
        chat.twitter(
          Project,
          I18n.template(I18n.growthpad.front['500'], {
            value: I18n.growthpad.warning.twitter
          }),
          twitterHref,
          [3]
        ),
        chat.sina(
          Project,
          I18n.template(I18n.growthpad.front['500'], {
            value: I18n.growthpad.warning.sina
          }),
          sinaHref,
          [3]
        )
      ],
    },
  ],
}

export default data
