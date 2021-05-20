/**
 * @file growthpad dex
 * @author svon.me@gmail.com
 * @description examples
 */

import { ref, reactive } from 'vue'
import I18n from '~/utils/i18n/index'

// 名称
export const Name = ref('DEX')
// icon
export const Icon = ref('https://res.ikingdata.com/icon/mdx.png')

interface Reward {
  count: number // 奖励数量
  cost: number // 价值
  limits: [number, number] // 限制范围
}

interface DasboardData {
  status: string // 状态
  description: string // 描述
  reward: Reward
}
export const Dasboard = reactive<DasboardData>({
  // 状态
  status: I18n.growthpad.examples.progress,
  description: I18n.growthpad.examples.dashoard.desc,
  reward: {
    count: 100000,
    cost: 1000000,
    limits: [100, 500],
  },
})

export interface Minutia {
  label: string
  value: string | number
}

interface AboutData {
  website: string
  minutias: Array<Minutia>
  detail?: string
}

export const About = reactive<AboutData>({
  website: 'https://dex-demo.com',
  minutias: [
    { label: I18n.growthpad.examples.about.name, value: 'MDX' },
    { label: I18n.growthpad.examples.about.symbol, value: 'MDX' },
    { label: I18n.growthpad.examples.about.online, value: '2021年1月19日' },
    { label: I18n.growthpad.examples.about.count, value: '10亿' },
    { label: I18n.growthpad.examples.about.marketValue, value: '3亿' },
    { label: I18n.growthpad.examples.about.circulation, value: '3亿' },
    { label: I18n.growthpad.examples.about.price, value: '$3.5' },
    { label: I18n.growthpad.examples.about.luanched, value: 'HECO/BSC' },
    {
      label: I18n.growthpad.examples.about.exchanges,
      value: '火币/币安',
    },
  ],
  detail: I18n.growthpad.examples.about.detail,
})

export enum TaskType {
  vip = 'vip',
  pancake = 'pancake',
  uniswap = 'uniswap',
  sushiswap = 'sushiswap',
  follow_twitter = 'follow_twitter',
  telegram_group = 'telegram_group',
  weibo = 'weibo',
  allin = 'allin',
  telegram = 'telegram',
  twitter = 'twitter',
  retwitter = 'retwitter',
}

interface Tooltip {
  icon: string
  value: string
  href?: string // 跳转链接
}

export interface TaskItem {
  id: string // 任务ID
  type?: TaskType // 任务类型, 为空时校验子任务
  title: string // 任务标题
  description?: string // 描述
  help?: string // 帮助信息
  reward?: number[] // 奖励 多个元素是表示最小奖励与最大奖励
  tooltip?: Tooltip // 提示信息
  badge?: string // 标记
  children?: any
}

const uuid = function(): string {
  const value = String(Math.random()).slice(2)
  return `task-${value}`
}
// 加入 telegram
const telegram = function(): TaskItem {
  return {
    id: uuid(),
    title: '加入',
    type: TaskType.telegram,
    tooltip: {
      icon: 'telegram',
      value: 'Mdex 电报群',
      href: 'http://www.baidu.com',
    },
    description: '活动结束前取消关注视为未完成任务',
  }
}
// 关注 twitter
const twitter = function(): TaskItem {
  return {
    id: uuid(),
    title: '关注',
    type: TaskType.twitter,
    tooltip: {
      icon: 'twitter',
      value: 'Mdex Twitter',
      href: 'http://www.baidu.com',
    },
    description: '活动结束前取消关注视为未完成任务',
  }
}
// 转发 twitter
const retwitter = function(): TaskItem {
  return {
    id: uuid(),
    title: '转发',
    type: TaskType.retwitter,
    tooltip: {
      icon: 'twitter',
      value: '本条活动 Twitter',
      href: 'http://www.baidu.com',
    },
    description: '活动结束前取消关注视为未完成任务',
  }
}

export const TaskList = reactive<TaskItem[]>([
  // 任务 1
  {
    id: uuid(),
    type: TaskType.vip,
    title:
      'Kingdata VIP 用户；加入 MDEX 电报群；关注 MDEX Twitter 并转发本条活动 Twitter。',
    description: '完成全部任务：{reward}（前1000名用户）',
    reward: [3],
    children: [
      {
        type: TaskType.vip,
        title: '成为 Kingdata VIP 用户',
        help: '邀请三个用户注册即可成为 VIP 用户',
      },
      telegram(),
      twitter(),
      retwitter(),
    ],
  },
  // 任务 2
  {
    id: uuid(),
    type: TaskType.pancake,
    title:
      'PanCake 持仓价值超过 1万 U，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
    description: '完成任意任务：{reward}（前1000名用户）',
    reward: [5, 15],
    children: [
      {
        type: TaskType.pancake,
        title: '任务资格：Pancake swap 持仓价值超过1万U',
        description: '该任务奖励会发放到验证的地址中，地址验证后不可修改',
      },
      telegram(),
      twitter(),
      retwitter(),
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
      telegram(),
      twitter(),
      retwitter(),
    ],
  },
  // 任务 4
  {
    id: uuid(),
    type: TaskType.sushiswap,
    title:
      'Sushiswap 持仓价值超过 1万 U，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
    description: '完成任意任务：{reward}（前1000名用户）',
    reward: [5, 15],
    children: [
      {
        type: TaskType.sushiswap,
        title: '任务资格：Sushiswap 持仓价值超过1万U',
        description: '该任务奖励会发放到验证的地址中，地址验证后不可修改',
      },
      telegram(),
      twitter(),
      retwitter(),
    ],
  },
  // 任务 5
  {
    id: uuid(),
    type: TaskType.weibo,
    title: '撰写 500 字原创 MDEX 体验文章，并发布在主流媒体。',
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
])
