/**
 * @file growthpad mdx
 * @author svon.me@gmail.com
 * @description examples
 */

import I18n from '~/utils/i18n/index'
import TaskType from '~/logic/growthpad/tasktype'

const uuid = function(): string {
  const value = String(Math.random()).slice(2)
  return `task-${value}`
}
// 加入 telegram
const telegram = function(description?: string, reward: Array<number> = []) {
  return {
    id: uuid(),
    title: '加入',
    type: TaskType.telegram,
    tooltip: {
      icon: 'telegram',
      value: 'Mdex 电报群',
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
    title: '关注',
    type: TaskType.twitter,
    tooltip: {
      icon: 'twitter',
      value: 'Mdex Twitter',
      href: 'https://twitter.com/Mdextech',
    },
    reward,
    description,
  }
}
// 转发 twitter
const retwitter = function(description?: string, reward: Array<number> = []) {
  return {
    id: uuid(),
    title: '转发',
    type: TaskType.retwitter,
    tooltip: {
      icon: 'twitter',
      value: '本条活动 Twitter',
      href: 'https://twitter.com/Mdextech/status/1395323254974214150',
    },
    reward,
    description,
  }
}

const data = {
  title: 'MDEX', // 名称
  icon: 'https://res.ikingdata.com/icon/mdx.png', // icon
  dasboard: {
    begin: '2021-05-28 12:00:00', // 开始时间
    end: '2021-05-30 12:00:00', // 结束时间
    description: I18n.growthpad.examples.dashoard.desc, // 描述
    reward: {
      count: 100000, // 奖励数量
      cost: 1000000, // 价值
      limits: [100, 500], // 每人可领取范围
    },
  },
  about: {
    website: 'mdex.com', // 项目官网
    minutias: [
      { label: I18n.growthpad.examples.about.name, value: 'MDX' }, // 代币名称
      { label: I18n.growthpad.examples.about.symbol, value: 'MDX' }, // 代币名称
      { label: I18n.growthpad.examples.about.online, value: '2021年1月19日' }, // 上线时间
      { label: I18n.growthpad.examples.about.count, value: '10亿' }, // 发行总量
      { label: I18n.growthpad.examples.about.marketValue, value: '3亿' }, // 市值
      { label: I18n.growthpad.examples.about.circulation, value: '3亿' }, // 当前流通量
      { label: I18n.growthpad.examples.about.price, value: '$3.5' }, // 当前价格
      { label: I18n.growthpad.examples.about.luanched, value: 'HECO/BSC' }, // 所在公链
      // 上线交易所
      {
        label: I18n.growthpad.examples.about.exchanges,
        value: '火币/币安',
      },
    ],
    detail: I18n.growthpad.examples.about.detail, // 项目介绍
    share: [
      { icon: 'github', href: 'https://github.com/mdexSwap' },
      { icon: 'telegram', href: 'https://t.me/MixDex' },
      { icon: 'twitter', href: 'https://twitter.com/Mdextech' },
      { icon: 'vector', href: 'https://mdex.medium.com/' },
      { icon: 'union', href: 'https://discord.com/invite/3TYDPktjqC' },
    ],
  },
  taskList: [
    // 任务 1
    {
      id: uuid(), // 任务ID
      type: TaskType.vip, // 任务类型
      title: 'Kingdata VIP 用户；加入 MDEX 电报群；关注 MDEX Twitter 并转发本条活动 Twitter。',
      description: '完成全部任务：{reward}（前1000名用户）',
      reward: [3], // 奖励
      children: [
        {
          type: TaskType.vip,
          title: '成为 Kingdata VIP 用户',
          help: '邀请三个用户注册即可成为 VIP 用户', // 帮助信息
        },
        telegram('活动结束前退出电报群视为未完成任务'),
        twitter('活动结束前取消关注视为未完成任务'),
        retwitter('活动结束前删除推文视为未完成任务'),
      ],
    },
    // 任务 2
    {
      id: uuid(),
      type: TaskType.pancake,
      title:
        'PanCake Swap 持仓价值超过 1万 U，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
      description: '完成任意任务：{reward}（前1000名用户）',
      reward: [5, 15],
      children: [
        {
          type: TaskType.pancake,
          title: '任务资格：Pancake swap 持仓价值超过1万U',
          description: '该任务奖励会发放到验证的地址中，地址验证后不可修改',
        },
        telegram('活动结束前退出电报群视为未完成任务', [10]),
        twitter('活动结束前取消关注视为未完成任务',[3]),
        retwitter('活动结束前删除推文视为未完成任务',[3]),
      ],
    },
    // 任务 3
    {
      id: uuid(),
      type: TaskType.uniswap,
      title:
        'Uniswap 持仓价值超过 1万 U，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
      description: '完成任意任务：{reward}（前1000名用户）',
      reward: [5, 15],
      children: [
        {
          type: TaskType.uniswap,
          title: '任务资格 Uniswap 持仓价值超过1万U',
          description: '该任务奖励会发放到验证的地址中，地址验证后不可修改',
        },
        telegram('活动结束前退出电报群视为未完成任务', [10]),
        twitter('活动结束前取消关注视为未完成任务',[3]),
        retwitter('活动结束前删除推文视为未完成任务',[3]),
      ],
    },
    // 任务 4
    {
      id: uuid(),
      type: TaskType.sushiswap,
      title:
        'Sushiswap 持仓价值超过 1万 U，加入 MDEX 电报群；关注 MDEX Twitter；转发活动 Twitter。',
      description: '完成任意任务：{reward}（前1000名用户）',
      reward: [5, 15],
      children: [
        {
          type: TaskType.sushiswap,
          title: '任务资格：Sushiswap 持仓价值超过1万U',
          description: '该任务奖励会发放到验证的地址中，地址验证后不可修改',
        },
        telegram('活动结束前退出电报群视为未完成任务', [10]),
        twitter('活动结束前取消关注视为未完成任务', [3]),
        retwitter('活动结束前删除推文视为未完成任务', [3]),
      ],
    },
    // 任务 5
    {
      id: uuid(),
      type: TaskType.weibo,
      title: '撰写 500 字以上原创 MDEX 体验文章，并发布在主流媒体。',
      reward: [15, 200],
      children: [],
    },
    // 任务 5
    {
      id: uuid(),
      type: TaskType.allin,
      title: '阳光普照奖',
      children: [
        {
          title: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%',
        },
      ],
    },
  ],
}

export default data
