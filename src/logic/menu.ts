import I18n from '~/utils/i18n/index'
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

export const menu: Menu[] = [
  {
    name: I18n.nav.defi.name,
    children: [
      {
        name: I18n.nav.defi.apy.name,
        desc: I18n.nav.defi.apy.desc,
        icon: 'https://res.ikingdata.com/icon/apy.svg',
        href: I18n.nav.defi.apy.href,
      },
      {
        name: I18n.nav.defi.liquidity.name,
        desc: I18n.nav.defi.liquidity.desc,
        badge: '即将上线',
        icon: 'https://res.ikingdata.com/icon/defi_flow.svg',
        href: I18n.nav.defi.liquidity.href,
      },
      {
        name: I18n.nav.defi.quotes.name,
        desc: I18n.nav.defi.quotes.desc,
        badge: '即将上线',
        icon: 'https://res.ikingdata.com/icon/defi.svg',
        href: I18n.nav.defi.quotes.href,
      },
    ],
  },
  {
    name: I18n.nav.analysis.name,
    children: [
      {
        name: I18n.nav.analysis.hData.name,
        desc: I18n.nav.analysis.hData.desc,
        icon: 'https://res.ikingdata.com/icon/24.svg',
        href: I18n.nav.analysis.hData.href,
      },
      {
        name: I18n.nav.analysis.chart.name,
        desc: I18n.nav.analysis.chart.desc,
        icon: 'https://res.ikingdata.com/icon/table.svg',
        href: I18n.nav.analysis.chart.href,
        children: [
          // {
          //   name: I18n.nav.analysis.chart.children.chart.name,
          //   icon: 'https://res.ikingdata.com/nav/topicMy.png',
          //   href: I18n.nav.analysis.chart.children.chart.href,
          // },
          {
            name: I18n.nav.analysis.chart.children.recommad.name,
            icon: 'https://res.ikingdata.com/nav/topicRecom.png',
            href: I18n.nav.analysis.chart.children.recommad.href,
          },
          {
            name: I18n.nav.analysis.chart.children.special.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/96c75b9ed70cef5608d4a449caf0f547_VxU6z3o.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.special.children.usdt
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/6741d2f11f5e09e769e84f9a9e37631b.png',
                href: I18n.nav.analysis.chart.children.special.children.usdt
                  .href,
              },
              {
                name: I18n.nav.analysis.chart.children.special.children.shichang
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d56e9e72f9c14ef716f5ef39f8482953.png',
                href: I18n.nav.analysis.chart.children.special.children.shichang
                  .href,
              },
              {
                name: I18n.nav.analysis.chart.children.special.children.quanqiu
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/0596f3a540a41fef28fa468ea98cd661_i3YCk8Z.png',
                href: I18n.nav.analysis.chart.children.special.children.quanqiu
                  .href,
              },
              {
                name: I18n.nav.analysis.chart.children.special.children.huidu
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/bc78c1c3bee94757423614573c0678ed.png',
                href: I18n.nav.analysis.chart.children.special.children.huidu
                  .href,
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
                href: I18n.nav.analysis.chart.children.project.children.dex
                  .href,
              },
              {
                name: I18n.nav.analysis.chart.children.project.children.defi
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/81c296c01cabc0a11f2fa3e80a9f2326_8vLv1In.png',
                href: I18n.nav.analysis.chart.children.project.children.defi
                  .href,
              },
              {
                name: I18n.nav.analysis.chart.children.project.children.gonglian
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/9995bc0520fe7d295273eda00052f946.png',
                href: I18n.nav.analysis.chart.children.project.children.gonglian
                  .href,
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
                href: I18n.nav.analysis.chart.children.bsc.children.bsc.href,
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
                href: I18n.nav.analysis.chart.children.heco.children.mdex.href,
              },
              {
                name: I18n.nav.analysis.chart.children.heco.children.heco.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/72b5c6bbccf71693824fee65b04c0120.png',
                href: I18n.nav.analysis.chart.children.heco.children.heco.href,
              },
              {
                name: I18n.nav.analysis.chart.children.heco.children.mdx.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/cd49eecab209402f3a3c7610471f5c1c.png',
                href: I18n.nav.analysis.chart.children.heco.children.mdx.href,
              },
              {
                name: I18n.nav.analysis.chart.children.heco.children.coin.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/3cefd016c462976d4c2b4af75ab62219.png',
                href: I18n.nav.analysis.chart.children.heco.children.coin.href,
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
                href: I18n.nav.analysis.chart.children.eth.children.sushi.href,
              },
              {
                name: I18n.nav.analysis.chart.children.eth.children.uni.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/94030d57154f1133d934df07c99dc09b.png',
                href: I18n.nav.analysis.chart.children.eth.children.uni.href,
              },
              {
                name: I18n.nav.analysis.chart.children.eth.children.ampl.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/2402967b54df5edc222e0439625556db.png',
                href: I18n.nav.analysis.chart.children.eth.children.ampl.href,
              },
              {
                name: I18n.nav.analysis.chart.children.eth.children.eth.name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/5/118c1d5d04b10f6cffb153bbba139664.png',
                href: I18n.nav.analysis.chart.children.eth.children.eth.href,
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
                href: I18n.nav.analysis.chart.children.dot.children.dot.href,
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
                href: I18n.nav.analysis.chart.children.fil.children.fil.href,
              },
            ],
          },
          {
            name: I18n.nav.analysis.chart.children.exchange.name,
            icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d60b79e15b748930698461b4c10d20dc_mgH6h6E.png',
            children: [
              {
                name: I18n.nav.analysis.chart.children.exchange.children.zhuliu
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/2f47473cb17617a869c03ca539e490cc.png',
                href: I18n.nav.analysis.chart.children.exchange.children.zhuliu
                  .href,
              },
              {
                name: I18n.nav.analysis.chart.children.exchange.children.jiaoyi
                  .name,
                icon: 'https://jsdata-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/3/d60b79e15b748930698461b4c10d20dc.png',
                href: I18n.nav.analysis.chart.children.exchange.children.jiaoyi
                  .href,
              },
            ],
          },
        ],
      },
      {
        name: I18n.nav.analysis.report.name,
        desc: I18n.nav.analysis.report.desc,
        icon: 'https://res.ikingdata.com/icon/report.svg',
        href: I18n.nav.analysis.report.href,
      },
    ],
  },
  {
    name: I18n.nav.dataTools.name,
    children: [
      {
        name: I18n.nav.dataTools.top.name,
        desc: I18n.nav.dataTools.top.desc,
        icon: 'https://res.ikingdata.com/icon/top1.svg',
        href: I18n.nav.dataTools.top.href,
      },
      {
        name: I18n.nav.dataTools.history.name,
        desc: I18n.nav.dataTools.history.desc,
        icon: 'https://res.ikingdata.com/icon/calendar.svg',
        href: I18n.nav.dataTools.history.href,
      },
      {
        name: I18n.nav.dataTools.nav.name,
        desc: I18n.nav.dataTools.nav.desc,
        icon: 'https://res.ikingdata.com/icon/navigation.svg',
        href: I18n.nav.dataTools.nav.href,
      },
    ],
  },
  {
    name: I18n.nav.service.name,
    children: [
      {
        name: 'GrowthPad',
        desc: I18n.nav.service.growthPad.desc,
        icon: 'https://res.ikingdata.com/icon/growthPad.svg',
        href: I18n.nav.service.growthPad.href,
        children: [
          {
            name: 'GrowthPad',
            href: I18n.nav.service.growthPad.children.growthPad.href,
          },
          // { name: '案例' },
          {
            name: I18n.nav.service.growthPad.children.project.name,
            href: I18n.nav.service.growthPad.children.project.href,
          },
          {
            name: I18n.nav.service.growthPad.children.about.name,
            href: I18n.nav.service.growthPad.children.about.href,
          },
        ],
      },
    ],
  },
]

export default menu
