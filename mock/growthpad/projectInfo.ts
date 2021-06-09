import I18n from '../../src/utils/i18n/kiwi'

export const mdxInfo = {
  title: 'MDEX', // 名称
  icon: 'https://res.ikingdata.com/icon/mdx.png', // icon
  url: '/growthpad/mdx',
  coin: 'MDX',
  projectName:'MDX',
  dashboard: {
    banner: 'https://res.ikingdata.com/static/growthpad/mdx.jpg',
    begin: '2021-06-09 15:00:00', // 开始时间
    end: '2021-06-23 15:00:00', // 结束时间
    description: I18n.growthpadShow.mdxProject.des, // 描述
    reward: {
      count: 100000, // 奖励数量
      countStr:'100,000 MDX',
      limits: [348], // 每人可领取范围
    },
  },
}
export const coinwindInfo = {
  title: 'CoinWind', // 名称
  icon: 'https://res.ikingdata.com/nav/coinwind.png', // icon
  url: '/growthpad/COINWIND',
  coin: 'COW',
  projectName:'COINWIND',
  dashboard: {
    banner: 'https://res.ikingdata.com/static/growthpad/coinwind.jpg',
    begin: '2021-06-09 15:00:00', // 开始时间
    end: '2021-06-23 15:00:00', // 结束时间
    description: I18n.growthpadShow.coinwindProject.des, // 描述
    reward: {
      count: 100000, // 奖励数量
      countStr:'100,000 COW',
      limits: [312], // 每人可领取范围
    },
  },
}
export const channelsInfo = {
  title: 'Channels', // 名称
  icon: 'https://res.ikingdata.com/icon/channels.svg', // icon
  url: '/growthpad/CHANNELS',
  coin: 'USDT',
  projectName:'CHANNELS',
  dashboard: {
    banner: 'https://res.ikingdata.com/static/growthpad/channels.jpg',
    begin: '2021-06-09 15:00:00', // 开始时间
    end: '2021-06-23 15:00:00', // 结束时间
    description: I18n.growthpadShow.channelsProject.des, // 描述
    reward: {
      count: 100000, // 奖励数量
      countStr:I18n.growthpadShow.channelsProject.channelsCount,
      limits: [148], // 每人可领取范围
    },
    status: '',
  },
}
export const growthInfo = {
  title: 'GrowthPad', // 名称
  icon: 'https://res.ikingdata.com/icon/kingdata.png', // icon
  url: '/growthpad/growth',
  coin: 'USDT',
  projectName:'Growth',
  dashboard: {
    banner:I18n.growthpad.growthpad.dashboard.banner,
    begin: '2021-06-09 15:00:00', // 开始时间
    end: '2021-06-23 15:00:00', // 结束时间
    description: I18n.growthpad.growthpad.dashboard.desc, // 描述
    reward: {
      count: 500000, // 奖励数量
      countStr:'12,000 USDT',
      limits: [1328], // 每人可领取范围
    },
    status: '',
  },
}
