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
export const Icon = ref('/assets/growthpad/examples/dex.png')

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
    count: 1000,
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
    { label: I18n.growthpad.examples.about.name, value: 'TOKEN' },
    { label: I18n.growthpad.examples.about.symbol, value: 'TOKEN' },
    { label: I18n.growthpad.examples.about.online, value: '2021/10/10' },
    { label: I18n.growthpad.examples.about.supply, value: '1B' },
    { label: I18n.growthpad.examples.about.tvl, value: '1B' },
    { label: I18n.growthpad.examples.about.circulation, value: '3M' },
    { label: I18n.growthpad.examples.about.price, value: '$3.5' },
    { label: I18n.growthpad.examples.about.luanched, value: 'HECO/BSC' },
    {
      label: I18n.growthpad.examples.about.exchanges,
      value: 'Binance / Huobi',
    },
    { label: I18n.growthpad.examples.about.volume, value: '3B' },
  ],
  detail: I18n.growthpad.examples.about.detail,
})

// 分享代码
export const shareCode = ref(
  '<frame src="https://embed.KingData.com/embed/s/914814682750.htm" style-"border: none;" width="490" height="164" frameborder="0" scrolling="no" allowfullscreen></iframe>',
)

interface Tooltip {
  icon: string
  value: string
}

export interface TaskItem {
  description: string // 描述
  status: boolean // 状态
  success: string // 完成按钮文字
  wait: string // 未完成时提示文字
  href: string // 跳转链接
  tooltip?: Tooltip // 提示信息
  badge?: string // 标记
  suffix?: string // 尾部内容
}

export const TaskList1 = reactive<TaskItem[]>([
  {
    description: 'KingData 前10000注册用户',
    status: true,
    success: I18n.part(I18n.growthpad.examples.task.success, 0),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 0),
    href: '/',
  },
  {
    description: 'KingData 邀请用户大于5人',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 0),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 0),
    href: '/',
  },
  {
    description: '关注 KingData 指标',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 0),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 0),
    href: '/',
    tooltip: {
      icon: 'trend',
      value: 'GrowthPad 内容精选',
    },
  },
  {
    description: '在4月10日之前，地址中拥有 100BNB 或者 50个 HT',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 0),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 0),
    href: '/',
  },
  {
    description: '在4月10日之前，在 Pancake 或者 MDEX 做过一次交易',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 0),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 0),
    href: '/',
  },
])

export const TaskList2 = reactive<TaskItem[]>([
  {
    description: '加入 Kingdata 电报群  t.me/KingData',
    status: true,
    success: I18n.part(I18n.growthpad.examples.task.success, 1),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 1),
    href: '/',
    suffix: I18n.part(I18n.growthpad.examples.task.suffix, 1, { count: 100 }),
  },
  {
    description: '加入 DEX 电报群 t.me/DEX-DEMO',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 1),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 1),
    href: '/',
    suffix: I18n.part(I18n.growthpad.examples.task.suffix, 1, { count: 65 }),
  },
  {
    description: '关注',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 1),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 1),
    href: '/',
    tooltip: {
      icon: 'twitter-white',
      value: 'Follow@KingData_com',
    },
    badge: '3K followers',
  },
  {
    description: '关注',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 1),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 1),
    href: '/',
    tooltip: {
      icon: 'twitter-white',
      value: 'Follow@Dev',
    },
    badge: '518K followers',
  },
  {
    description: '点赞、转发并@两名好友 点击连接跳转',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 1),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 1),
    href: '/',
    suffix: I18n.part(I18n.growthpad.examples.task.suffix, 1, { count: 65 }),
  },
  {
    description: '提交 1000 字的原创文章发表在关于 DEX 的媒体平台',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 1),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 1),
    href: '/',
    suffix: I18n.part(I18n.growthpad.examples.task.suffix, 1, { count: 65 }),
  },
  {
    description: '去 DEX 完成任意一步 SWAP',
    status: false,
    success: I18n.part(I18n.growthpad.examples.task.success, 1),
    wait: I18n.part(I18n.growthpad.examples.task.wait, 1),
    href: '/',
    suffix: I18n.part(I18n.growthpad.examples.task.suffix, 1, { count: 65 }),
  },
])
