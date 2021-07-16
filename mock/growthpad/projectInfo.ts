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


export const chainWallet = {
  title: 'ChainWallet', // 名称
  icon: 'https://res.ikingdata.com/icon/chainwallet.png', // icon
  url: '/growthpad/ChainWallet',
  coin: 'CHA',
  projectName: 'ChainWallet',
  website: 'app.chainwallet.me',
  // warn: I18n.growthpad.chainwallet.project.warn, // 警示
  dashboard: {
    banner: I18n.growthpad.chainwallet.dashboard.banner,
    begin: '2021-07-02 20:00:00', // 开始时间
    end: '', // 结束时间
    description: I18n.growthpad.chainwallet.dashboard.desc, // 描述
    reward: {
      count: 200000, // 奖励数量
      countStr: '200,000 CHA',
      limits: [3030], // 每人可领取范围
    },
    status: '',
  },
}

export const heco = {
  title: 'HECO', // 名称
  icon: 'https://res.ikingdata.com/image/growthpad/heco/logo2.png', // icon
  url: '/growthpad/heco',
  coin: '',
  projectName: 'LUCKY HECO',
  dashboard: {
    banner: 'https://res.ikingdata.com/image/growthpad/heco/banner.jpg',
    begin: '2021-07-16 10:00:00', // 开始时间
    end: '2021-07-21 00:00:00', // 结束时间
    // 描述
    description: `The Mystery box event--"Lucky Heco" co-founded by Hecochain, Dapp and crypto artists. This is the first phase of the “Lucky Heco”. Rare NFTs are waiting for you! 
Register the Huobi Global UID and HECO address information, and complete any of the tasks below to participate in the lottery.
Event Time:
1、Please fill in the information before 16:00 (UTC) on 2021 / 7 / 21
2、Please check the announcement on 2021 / 7 / 23 (UTC) to confirm if you have won the NFT reward.
3、If you win, you will receive the NFT reward in your heco wallet within 3 days.`,
    reward: {
      count: 0, // 奖励数量
      countStr: '',
      limits: [], // 每人可领取范围
    },
  },
}

// 所有任务
export const taskList = [
  mdxInfo, coinwindInfo, channelsInfo, growthInfo, heco
  // chainWallet 下架
]
