/**
 * @file growthpad dex
 * @author svon.me@gmail.com
 * @description examples
 */

import { ref, reactive } from 'vue'

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
  status: '进行中',
  description: '为庆祝 DEX 成功上线 BSC 和 HECO，感谢用户的支持，现联合 KingData, 对部分用户进行奖励，符合条件的用户可以在活动结束后，领取价值 $10000 的奖励。',
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
    { label: 'Name', value: 'TOKEN' },
    { label: 'Symbol', value: 'TOKEN' },
    { label: 'Online', value: '2021/10/10' },
    { label: 'Supply', value: '1B' },
    { label: 'TVL', value: '1B' },
    { label: 'Circulation', value: '3M' },
    { label: 'Price', value: '$3.5' },
    { label: 'Luanched', value: 'HECO/BSC' },
    { label: 'Exchanges', value: 'Binance / Huobi' },
    { label: '24H Volume', value: '3B' },
  ],
  detail: `Dex is an AMM decentralized exchange based on the concept of fund pools. It proposes and implements a dual-chain DEX model based on the Huobi ecological Heco chain and Ethereum. At the same time, DEX will also support a dual mining mechanism for liquidity and transactions.

Dex innovatively adopts a dual mining mechanism. The “dual mining” here refers to the first one: support Uniswap LP, Sushiswap LP and single currency mortgage mining on Ethereum before LP migration. Among them, mortgage Sushiswap LP can get Sushi at the same time. With Dex tokens, one-click dual mining is realized, and it also refers to: After the migration, trading and liquidity dual mining will be opened on Heco.`,
})

// 分享代码
export const shareCode = ref('<frame src="https://embed.KingData.com/embed/s/914814682750.htm" style-"border: none;" width="490" height="164" frameborder="0" scrolling="no" allowfullscreen></iframe>')

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
    success: '已审核',
    wait: '去检查',
    href: '/',
  },
  {
    description: 'KingData 邀请用户大于5人',
    status: false,
    success: '已审核',
    wait: '去检查',
    href: '/',
  },
  {
    description: '关注 KingData 指标',
    status: false,
    success: '已审核',
    wait: '去检查',
    href: '/',
    tooltip: {
      icon: 'trend',
      value: 'GrowthPad 内容精选',
    },
  },
  {
    description: '在4月10日之前，地址中拥有 100BNB 或者 50个 HT',
    status: false,
    success: '已审核',
    wait: '去检查',
    href: '/',
  },
  {
    description: '在4月10日之前，在 Pancake 或者 MDEX 做过一次交易',
    status: false,
    success: '已审核',
    wait: '去检查',
    href: '/',
  },
])

export const TaskList2 = reactive<TaskItem[]>([
  {
    description: '加入 Kingdata 电报群  t.me/KingData',
    status: true,
    success: '已完成',
    wait: '去检查',
    href: '/',
    suffix: '+65USDT',
  },
  {
    description: '加入 DEX 电报群 t.me/DEX-DEMO',
    status: false,
    success: '已完成',
    wait: '去完成',
    href: '/',
    suffix: '+65USDT',
  },
  {
    description: '关注',
    status: false,
    success: '已完成',
    wait: '去完成',
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
    success: '已完成',
    wait: '去完成',
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
    success: '已完成',
    wait: '去完成',
    href: '/',
    suffix: '+65USDT',
  },
  {
    description: '提交 1000 字的原创文章发表在关于 DEX 的媒体平台',
    status: false,
    success: '已完成',
    wait: '去完成',
    href: '/',
    suffix: '+65USDT',
  },
  {
    description: '去 DEX 完成任意一步 SWAP',
    status: false,
    success: '已完成',
    wait: '去完成',
    href: '/',
    suffix: '+65USDT',
  },
])
