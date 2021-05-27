/**
 * @file growthpad mdx
 * @author svon.me@gmail.com
 * @description mdx
 */

import I18n from '~/utils/i18n/index'
import TaskType from '~/logic/growthpad/tasktype'

const Project = 'Channels'

const uuid = function(): string {
  const value = String(Math.random()).slice(2)
  return `task-${value}`
}
// 加入 telegram
const telegram = function(description?: string, reward: Array<number> = []) {
  return {
    id: uuid(),
    title: I18n.common.join,
    titleAfter: I18n.growthpad.channels.activity.telegramDesc,
    type: TaskType.telegram,
    tooltip: {
      icon: 'telegram',
      value: Project + ' 电报群',
      href: 'https://t.me/MixDex',
    },
    reward,
    description,
  }
}
// 关注 twitter
const twitter = function(description?: string, reward: Array<number> = []) {
  return {
    id: uuid(),
    title: I18n.common.follow,
    type: TaskType.twitter,
    tooltip: {
      icon: 'twitter',
      value: Project + ' Twitter',
      href: 'https://twitter.com/Mdextech',
    },
    titleAfter: I18n.growthpad.channels.activity.twitterDesc,
    reward,
    description,
  }
}

// 新浪微博
const sina = function(description?: string, reward: Array<number> = []) {
  return {
    id: uuid(),
    title: I18n.common.follow,
    type: TaskType.sina,
    tooltip: {
      icon: 'sina',
      value: Project + ' 微博',
      href: 'https://twitter.com/Mdextech',
    },
    titleAfter: I18n.growthpad.channels.activity.sinaDesc,
    reward,
    description,
  }
}

const data = {
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
    website: 'channels.finance', // 项目官网
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
      { icon: 'telegram', href: 'https://t.me/channels_finance' },
      { icon: 'twitter', href: 'https://twitter.com/ChannelsFinance' },
      { icon: 'union', href: 'https://discord.gg/VMNGuDzxnq' },
    ],
  },
  taskList: [
    // 任务 1
    {
      id: uuid(), // 任务ID
      type: TaskType.venus, // 任务类型
      title: I18n.growthpad.channels.task1.title,
      description: I18n.growthpad.reward.finished,
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.venus,
          title: I18n.template(I18n.growthpad.channels.activity.label, { group: 'Venus' }),
          description: ''
        },
        telegram(I18n.growthpad.warning.telegram),
        twitter('活动结束前取消关注/删除推文视为未完成任务'),
        sina('活动结束前取消关注/删除微博视为未完成任务')
      ],
    },
    // 任务 2
    {
      id: uuid(), // 任务ID
      type: TaskType.cream, // 任务类型
      title: I18n.growthpad.channels.task1.title,
      description: I18n.growthpad.reward.finished,
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.cream,
          title: I18n.template(I18n.growthpad.channels.activity.label, { group: 'Cream' }),
          description: ''
        },
        telegram(I18n.growthpad.warning.telegram),
        twitter('活动结束前取消关注/删除推文视为未完成任务'),
        sina('活动结束前取消关注/删除微博视为未完成任务')
      ],
    },
    // 任务 3
    {
      id: uuid(), // 任务ID
      type: TaskType.compound, // 任务类型
      title: I18n.growthpad.channels.task1.title,
      description: I18n.growthpad.reward.finished,
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.cream,
          title: I18n.template(I18n.growthpad.channels.activity.label, { group: 'Compound' }),
          description: ''
        },
        telegram(I18n.growthpad.warning.telegram),
        twitter('活动结束前取消关注/删除推文视为未完成任务'),
        sina('活动结束前取消关注/删除微博视为未完成任务')
      ],
    },
  ],
}

export default data
