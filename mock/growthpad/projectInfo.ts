import I18n from '../../src/utils/i18n/kiwi'

export const mdxInfo = {
  title: 'MDEX', // 名称
  icon: 'https://res.ikingdata.com/icon/mdx.png', // icon
  url: '/growthpad/mdx',
  coin: 'MDX',
  dashboard: {
    banner: 'https://res.ikingdata.com/static/growthpad/mdx.png',
    begin: '2021-05-25 12:00:00', // 开始时间
    end: '2021-06-07 12:00:00', // 结束时间
    description: I18n.growthpadShow.mdxProject.des, // 描述
    reward: {
      count: 100000, // 奖励数量
      cost: 1000000, // 价值
      limits: [348], // 每人可领取范围
    },
  },
}
export const coinwindInfo = {
  title: 'CoinWind', // 名称
  icon: 'https://res.ikingdata.com/nav/coinwind.png', // icon
  url: '/growthpad/COINWIND',
  coin: 'MDX',
  dashboard: {
    banner: 'https://res.ikingdata.com/static/growthpad/coinwind2.png',
    begin: '2021-05-22 12:00:00', // 开始时间
    end: '2021-06-07 12:00:00', // 结束时间
    description: I18n.growthpadShow.coinwindProject.des, // 描述
    reward: {
      count: 100000, // 奖励数量
      cost: 1000000, // 价值
      limits: [312], // 每人可领取范围
    },
  },
}
export const channelsInfo = {
  title: 'Channels', // 名称
  icon: 'https://res.ikingdata.com/icon/channels.svg', // icon
  url: '/growthpad/CHANNELS',
  coin: 'USDT',
  dashboard: {
    banner: 'https://res.ikingdata.com/static/growthpad/channels.png',
    begin: '2021-05-29 12:00:00', // 开始时间
    end: '2021-06-30 12:00:00', // 结束时间
    description: I18n.growthpadShow.channelsProject.des, // 描述
    reward: {
      count: 100000, // 奖励数量
      cost: 2000000, // 价值
      limits: [148], // 每人可领取范围
    },
    status: '',
  },
}
