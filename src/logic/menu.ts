import I18n from '~/utils/i18n/index'
import { config } from '~/utils/router'

export interface Menu {
  name: string
  key?: string
  icon?: string
  href?: string
  desc?: string
  query?: any // url 携带参数
  badge?: string // 提示标记
  beta?:string//是否是内测
  newTip?:boolean
  more?: boolean // 展示在更多菜单中
  header?: boolean // 是否在菜单中展示
  children?: Menu[]
}

export const headers = [
  {
    name: 'Dapp',
    children: [
      {
        name: 'DeFi 排行版',
        icon: 'icon-paihang',
        desc: '快速发现高收益矿池',
        more: true,
        header: true
      },
      {
        name: 'NFT 排行版',
        header: true
      },
      {
        name: 'GameFi 排行版',
        header: true
      },
      {
        name: 'DeFi 新项目',
        icon: 'icon-defi',
        desc: '快速发现高收益矿池',
        more: true,
        header: true
      },
      {
        name: 'NFT 新项目',
        header: true
      },
      {
        name: 'GameFi 新项目',
        header: true
      },
    ]
  },
  {
    // DeFi
    name: I18n.nav.defi.name,
    children: [
      {
        name: '挖矿 APY',
        href: `${config.apy}/mining`,
        icon: 'icon-apy',
        desc: '快速发现高收益矿池',
        more: true,
        header: true
      },
      {
        name: '借贷 APR',
        href: `${config.apy}/loan`,
        desc: '快速发现高收益矿池',
        icon: 'icon-APR',
        more: true,
        header: true
      },
      {
        name: '项目 APY 分析',
        href: `${config.apy}/project`,
        desc: '快速发现高收益矿池',
        icon: 'icon-xiangmu',
        more: true,
        header: true
      },
      {
        name: '币种 APY 分析',
        href: `${config.apy}/token`,
        desc: '快速发现高收益矿池',
        icon: 'icon-bizhong',
        more: true,
        header: true
      },
      {
        name: 'HECO 节点 APY',
        href: `${config.apy}/heco`,
        desc: '快速发现高收益矿池',
        icon: 'icon-heco',
        more: true,
        header: true
      },
    ]
  },
  {
    // '数据'
    name: I18n.nav.analysis.name,
    children: [
      {
        name: '数据专题',
        desc: '专业的K线图和聚合交易',
        icon: 'icon-zhuanti',
        href: config.topic,
        more: true,
        header: true
      },
      {
        name: '数据监控',
        desc: '专业的K线图和聚合交易',
        icon: 'icon-jiankong1',
        href: config.news,
        more: true,
        header: true
      },
      {
        name: '数据研报',
        desc: '专业的K线图和聚合交易',
        icon: 'icon-yanbao',
        href: config.reports,
        more: true,
        header: true
      }
    ]
  },
  {
    // DEX 聪明钱
    name: I18n.nav.defi.liquidity.name,
    href: config.liquidity,
    children: [
      {
        name: I18n.nav.defi.liquidity.name,
        desc: '专业的K线图和聚合交易',
        icon: 'icon-DEX',
        href: config.liquidity,
        more: true
      }
    ]
  },
]

export const menu: Menu[] = [
  {
    // DeFi
    name: I18n.nav.defi.name,
    newTip:true,
    children: [
      {
        name: I18n.nav.defi.apy.name,
        desc: I18n.nav.defi.apy.desc,
        icon: 'https://res.ikingdata.com/icon/apy.svg',
        href: config.apy,
        children: [
          {
            name: '币种分析',
            desc: '币种分析',
            icon: 'https://res.ikingdata.com/icon/24.svg',
            href: `${config.apy}/token`
          }
        ]
      },
      {
        name: I18n.nav.defi.liquidity.name,
        desc: I18n.nav.defi.liquidity.desc,
        beta: I18n.nav.betaSrc,
        icon: 'https://res.ikingdata.com/icon/defi_flow.svg',
        href: config.liquidity
      },
      {
        name: I18n.nav.defi.quotes.name,
        desc: I18n.nav.defi.quotes.desc,
        badge: '即将上线',
        icon: 'https://res.ikingdata.com/icon/defi.svg',
        href:''
      },
    ],
  },
  {
    name: I18n.nav.analysis.name,
    newTip:false,
    children: [
      {
        name: I18n.nav.analysis.hData.name,
        desc: I18n.nav.analysis.hData.desc,
        icon: 'https://res.ikingdata.com/icon/24.svg',
        href: config.news
      },
      {
        name: I18n.nav.analysis.chart.name,
        desc: I18n.nav.analysis.chart.desc,
        icon: 'https://res.ikingdata.com/icon/table.svg',
        href: config.topic,
        children: [
          // {
          //   name: I18n.nav.analysis.chart.children.chart.name,
          //   icon: 'https://res.ikingdata.com/nav/topicMy.png',
          //   href: router(`${config.topic}?tagID=item&topicID`)
          // },
          {
            name: I18n.nav.analysis.chart.children.recommad.name,
            icon: 'https://res.ikingdata.com/nav/topicRecom.png',
            href: `${config.topic}?tagID=item&topicID=0`
          },
          {
            name: I18n.nav.analysis.chart.children.special.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/96c75b9ed70cef5608d4a449caf0f547_VxU6z3o.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.special.children.usdt.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/6741d2f11f5e09e769e84f9a9e37631b.png',
                href: `${config.topic}?tagID=1&topicID=22`
              },
              {
                name: I18n.nav.analysis.chart.children.special.children.shichang
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d56e9e72f9c14ef716f5ef39f8482953.png',
                href: `${config.topic}?tagID=1&topicID=23`
              },
              {
                name: I18n.nav.analysis.chart.children.special.children.quanqiu
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/0596f3a540a41fef28fa468ea98cd661_i3YCk8Z.png',
                href: `${config.topic}?tagID=1&topicID=27`
              },
              {
                name: I18n.nav.analysis.chart.children.special.children.huidu
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/bc78c1c3bee94757423614573c0678ed.png',
                href: `${config.topic}?tagID=1&topicID=25`
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.project.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/f5deaa1716cb14804e33a9dd656af5a8_PYKvpwu.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.project.children.dex
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/81c296c01cabc0a11f2fa3e80a9f2326_8vLv1In.png',
                href: `${config.topic}?tagID=11&topicID=24`
              },
              {
                name: I18n.nav.analysis.chart.children.project.children.defi
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/81c296c01cabc0a11f2fa3e80a9f2326_8vLv1In.png',
                href: `${config.topic}?tagID=11&topicID=10`
              },
              {
                name: I18n.nav.analysis.chart.children.project.children.gonglian
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/9995bc0520fe7d295273eda00052f946.png',
                href: `${config.topic}?tagID=11&topicID=34`
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.bsc.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/4/8f8d5382bf57cd82ca4d5613d4855b17.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.bsc.children.bsc.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/4/8f8d5382bf57cd82ca4d5613d4855b17.png',
                href: `${config.topic}?tagID=12&topicID=33`
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.heco.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/72b5c6bbccf71693824fee65b04c0120_l1KJuXT.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.heco.children.mdex.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/137d890d34c3de8950b979978883ddd0_dPawxjK.png',
                href: `${config.topic}?tagID=10&topicID=15`
              },
              {
                name: I18n.nav.analysis.chart.children.heco.children.heco.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/72b5c6bbccf71693824fee65b04c0120.png',
                href: `${config.topic}?tagID=10&topicID=17`
              },
              {
                name: I18n.nav.analysis.chart.children.heco.children.mdx.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/cd49eecab209402f3a3c7610471f5c1c.png',
                href: `${config.topic}?tagID=10&topicID=30`
              },
              {
                name: I18n.nav.analysis.chart.children.heco.children.coin.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/3cefd016c462976d4c2b4af75ab62219.png',
                href: `${config.topic}?tagID=10&topicID=32`
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.eth.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/6a244a01eae6260c69f4218e1309272c.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.eth.children.sushi.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/aea6de9cbaee9d2704dcf81f4a194991.png',
                href: `${config.topic}?tagID=9&topicID=13`
              },
              {
                name: I18n.nav.analysis.chart.children.eth.children.uni.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/94030d57154f1133d934df07c99dc09b.png',
                href: `${config.topic}?tagID=9&topicID=12`
              },
              {
                name: I18n.nav.analysis.chart.children.eth.children.ampl.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/2402967b54df5edc222e0439625556db.png',
                href: `${config.topic}?tagID=9&topicID=5`
              },
              {
                name: I18n.nav.analysis.chart.children.eth.children.eth.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/5/118c1d5d04b10f6cffb153bbba139664.png',
                href: `${config.topic}?tagID=9&topicID=35`
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.dot.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/40679521b5da0954b705341a2859f782_cukEecO.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.dot.children.dot.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/40679521b5da0954b705341a2859f782.png',
                href: `${config.topic}?tagID=8&topicID=3`
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.fil.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/5a231538f89d689c65723f0575a9d732_R4fGNPW.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.fil.children.fil.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/5a231538f89d689c65723f0575a9d732.png',
                href: `${config.topic}?tagID=7&topicID=14`
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.exchange.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d60b79e15b748930698461b4c10d20dc_mgH6h6E.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.exchange.children.zhuliu.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/2f47473cb17617a869c03ca539e490cc.png',
                href: `${config.topic}?tagID=6&topicID=26`
              },
              {
                name: I18n.nav.analysis.chart.children.exchange.children.jiaoyi.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d60b79e15b748930698461b4c10d20dc.png',
                href: `${config.topic}?tagID=6&topicID=29`
              },
            ],
          },
        ],
      },
      {
        name: I18n.nav.analysis.report.name,
        desc: I18n.nav.analysis.report.desc,
        icon: 'https://res.ikingdata.com/icon/report.svg',
        href: config.reports
      },
    ],
  },
  {
    name: I18n.nav.dataTools.name,
    newTip:false,
    children: [
      {
        name: I18n.nav.dataTools.top.name,
        desc: I18n.nav.dataTools.top.desc,
        icon: 'https://res.ikingdata.com/icon/top1.svg',
        href: config.bull
      },
      {
        name: I18n.nav.dataTools.history.name,
        desc: I18n.nav.dataTools.history.desc,
        icon: 'https://res.ikingdata.com/icon/calendar.svg',
        href: config.tih
      },
      {
        name: I18n.nav.dataTools.nav.name,
        desc: I18n.nav.dataTools.nav.desc,
        icon: 'https://res.ikingdata.com/icon/navigation.svg',
        href: config.nav
      },
    ],
  },
  {
    name: I18n.nav.service.name,
    newTip:false,
    children: [
      {
        name: 'GrowthPad',
        desc: I18n.nav.service.growthPad.desc,
        icon: 'https://res.ikingdata.com/icon/growthPad.svg',
        href: config.growthpad,
        children: [
          {
            name: 'GrowthPad',
            href: config.growthpad
          },
          // { name: '案例' },
          {
            name: I18n.nav.service.growthPad.children.project.name,
            href:'http://ikingdata.mikecrm.com/kbZDdCb?utm_source=https://kingdata.com'
          },
          {
            name: I18n.nav.service.growthPad.children.about.name,
            href:'https://www.yuque.com/kingdata_growthpad/tlll4r/blz39c?utm_source=https://kingdata.com'
          },
        ],
      },
    ],
  },
]

export default menu
