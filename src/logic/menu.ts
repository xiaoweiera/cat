export interface Menu {
  name: string
  key?: string
  icon?: string
  href?: string
  desc?: string
  query?: any // url 携带参数
  badge?: string // 提示标记
  children?: Menu[]
}

const menu: Menu[] = [
  {
    name: 'DeFi 数据分析',
    children: [
      {
        name: 'APY大全',
        desc: '快速发现高收益矿池',
        icon: 'https://res.ikingdata.com/icon/apy.svg',
      },
      {
        name: 'DeFi 流动性分析',
        desc: 'DEX 流动性分析',
        badge: '即将上线',
        icon: 'https://res.ikingdata.com/icon/defi_flow.svg',
      },
      {
        name: 'DeFi 行情与交易',
        desc: '专业的K线图和聚合交易',
        badge: '即将上线',
        icon: 'https://res.ikingdata.com/icon/defi.svg',
      },
    ],
  },
  {
    name: '企业数据服务',
    children: [
      {
        name: 'GrowthPad',
        desc: '做任务赢奖励',
        icon: 'https://res.ikingdata.com/icon/growthPad.svg',
        children: [
          { name: 'GrowthPad' },
          { name: '案例' },
          { name: '项目申请' },
          { name: '产品介绍' },
        ],
      },
    ],
  },
  {
    name: '项目数据监控与分析',
    children: [
      {
        name: '24H 数据监控预警',
        desc: '时刻接收异动，发现市场机会',
        icon: 'https://res.ikingdata.com/icon/24.svg',
      },
      {
        name: '项目数据图表',
        desc: '数据驱动交易，财富快人一步',
        icon: 'https://res.ikingdata.com/icon/table.svg',
        children: [
          {
            name: '我的图表',
            icon: 'https://res.ikingdata.com/nav/topicMy.png',
          },
          {
            name: '精选推荐',
            icon: 'https://res.ikingdata.com/nav/topicRecom.png',
          },
          {
            name: '特色数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/96c75b9ed70cef5608d4a449caf0f547_VxU6z3o.png',
            children: [
              {
                name: 'USDT基金数据专题',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/6741d2f11f5e09e769e84f9a9e37631b.png',
              },
              {
                name: '市场情绪数据专题',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d56e9e72f9c14ef716f5ef39f8482953.png',
              },
              {
                name: '全球主要金融指数',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/0596f3a540a41fef28fa468ea98cd661_i3YCk8Z.png',
              },
              {
                name: '灰度基金',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/bc78c1c3bee94757423614573c0678ed.png',
              },
            ],
          },
          {
            name: '项目对比数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/f5deaa1716cb14804e33a9dd656af5a8_PYKvpwu.png',
            children: [
              {
                name: 'DEX 数据对比',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/81c296c01cabc0a11f2fa3e80a9f2326_8vLv1In.png',
              },
              {
                name: 'DeFi 总体数据专题',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/81c296c01cabc0a11f2fa3e80a9f2326_8vLv1In.png',
              },
              {
                name: '公链数据对比',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/9995bc0520fe7d295273eda00052f946.png',
              },
            ],
          },
          {
            name: 'BSC及生态项目数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/4/8f8d5382bf57cd82ca4d5613d4855b17.png',
            children: [
              {
                name: '币安BSC数据专题',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/4/8f8d5382bf57cd82ca4d5613d4855b17.png',
              },
            ],
          },
          {
            name: 'HECO 及生态项目数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/72b5c6bbccf71693824fee65b04c0120_l1KJuXT.png',
            children: [
              {
                name: 'MDEX 项目数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/137d890d34c3de8950b979978883ddd0_dPawxjK.png',
              },
              {
                name: 'HECO 公链数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/72b5c6bbccf71693824fee65b04c0120.png',
              },
              {
                name: 'MDX Token 数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/cd49eecab209402f3a3c7610471f5c1c.png',
              },
              {
                name: 'CoinWind 整体数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/3cefd016c462976d4c2b4af75ab62219.png',
              },
            ],
          },
          {
            name: 'ETH及生态项目数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/6a244a01eae6260c69f4218e1309272c.png',
            children: [
              {
                name: 'SUSHI 项目数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/aea6de9cbaee9d2704dcf81f4a194991.png',
              },
              {
                name: 'UNI 项目数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/94030d57154f1133d934df07c99dc09b.png',
              },
              {
                name: 'AMPL 项目数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/2402967b54df5edc222e0439625556db.png',
              },
              {
                name: 'ETH 链上数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/5/118c1d5d04b10f6cffb153bbba139664.png',
              },
            ],
          },
          {
            name: 'DOT 及生态项目数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/40679521b5da0954b705341a2859f782_cukEecO.png',
            children: [
              {
                name: 'DOT 平台数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/40679521b5da0954b705341a2859f782.png',
              },
            ],
          },
          {
            name: 'FIL 及生态项目数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/5a231538f89d689c65723f0575a9d732_R4fGNPW.png',
            children: [
              {
                name: 'FIL 平台数据',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/5a231538f89d689c65723f0575a9d732.png',
              },
            ],
          },
          {
            name: '交易所相关数据',
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d60b79e15b748930698461b4c10d20dc_mgH6h6E.png',
            children: [
              {
                name: '主流交易所钱包余额专题',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/2f47473cb17617a869c03ca539e490cc.png',
              },
              {
                name: '交易所BTC流向监控',
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d60b79e15b748930698461b4c10d20dc.png',
              },
            ],
          },
        ],
      },
      {
        name: '行业研究报告',
        desc: '行业深度分析',
        icon: 'https://res.ikingdata.com/icon/report.svg',
      },
    ],
  },
  {
    name: '实用工具',
    children: [
      {
        name: '板块龙头',
        desc: '选赛道，买龙头',
        icon: 'https://res.ikingdata.com/icon/top1.svg',
      },
      {
        name: '历史的今天',
        desc: '历史总是惊人的相似',
        icon: 'https://res.ikingdata.com/icon/24.svg',
      },
      {
        name: '数据网站导航',
        desc: '区块链数据分析资源网站',
        icon: 'https://res.ikingdata.com/icon/navigation.svg',
      },
    ],
  },
]

export default menu
