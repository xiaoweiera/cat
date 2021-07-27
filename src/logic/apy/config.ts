import { numberFormat, percent2Precision } from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import {
  lendDataFormat,
  loanDataFormat,
  gunDataFormat,
  getChartProjectData,
  getChartTokenData,
  getxyData,
  getCoinData,
  getInfoData,
  requestLendData,
  requestLoanData,
  requestGunData,
  getProjectPlat,
  getTokenPlat,
  getInfoPlat,
  getInfoHasPlat,
} from '~/logic/apy/chartFormatTool'

export const unitConfig = {
  可投额度: { unit: '$' },
  总锁仓: { unit: '$' },
  剩余额度: { unit: '%' },
  存款总额: { unit: '$' },
  借款总量: { unit: '$' },
  可借: { unit: '$' },
  借出: { unit: '$' },
}
export const unitConfigen = {
  remain: { unit: '$' },
  tvl: { unit: '$' },
  remainRatio: { unit: '%' },
  totalSum: { unit: '$' },
  outSum: { unit: '$' },
  available: { unit: '$' },
  borrowed: { unit: '$' },
}
export const headerConfig = [
  {
    name: I18n.apy.header.chart,
    url: 'https://kingdata.com',
  },
  {
    name: I18n.apy.header.watch,
    url: 'https://kingdata.com/news',
  },
  {
    name: I18n.apy.header.report,
    url: 'https://kingdata.com/reports/',
    type: 'public',
  },
  {
    name: I18n.apy.header.growthPad,
    url: 'https://kingdata.com/growthpad',
    type: 'public',
  },
  {
    name: I18n.apy.header.apy,
    url: '',
    type: 'public',
  },
]
export const tools = [
  {
    name: '区块链数据分析资源网站',
    url: 'https://nav.kingdata.com/nav',
  },
  {
    name: '历史的今天',
    url: 'https://kingdata.com/tih',
  },
  {
    name: '板块龙头',
    url: 'https://kingdata.com/bull',
  },
]
export const tableIndex = {
  machine_gun_pool_single: 0,
  lend_single: 1,
  loan_single: 2,
}
export const chainConfig = [
  {
    select: true,
    key: 'all',
    name: I18n.apy.tagAll,
    img: 'https://res.ikingdata.com/nav/allTable.png',
  },
  {
    select: false,
    key: 'eth',
    name: 'ETH',
    img: 'https://res.ikingdata.com/nav/apyEth.png',
  },
  {
    select: false,
    key: 'heco',
    name: 'Heco',
    img: 'https://res.ikingdata.com/nav/apyHeco.png',
  },
  {
    select: false,
    key: 'bsc',
    name: 'BSC',
    img: 'https://res.ikingdata.com/nav/apyBsc.png',
  },
  {
    select: false,
    key: 'oec',
    name: 'OEC',
    img: 'https://res.ikingdata.com/nav/apyOec.png',
  },
  // {
  //   select: false,
  //   key: 'hsc',
  //   name: 'HSC',
  //   img: 'https://res.ikingdata.com/nav/apyHsc.png',
  // },
]
export const chartsConfig = {
  lend: [
    {
      title: I18n.apy.ckTable.oneChartTitle,
      requestData: requestLendData,
      chartData: getChartProjectData,
      xyData: getxyData,
      platData: getProjectPlat,
      param: {
        keyword1: 'project_name',
        keyword2: 'token_name',
      },
      unit: '%',
    },
    {
      title: I18n.apy.ckTable.twoChartTitle,
      requestData: requestLoanData,
      chartData: getChartTokenData,
      xyData: getCoinData,
      platData: getTokenPlat,
      param: {
        keyword1: 'token_name',
        keyword2: 'project_name',
      },
      unit: '%',
    },
    {
      title: I18n.apy.ckTable.streeChartTitle,
      requestData: requestGunData,
      chartData: lendDataFormat,
      xyData: getInfoData,
      platData: getInfoPlat,
      param: {},
      unit: '$',
    },
  ],
  loan: [
    {
      title: I18n.apy.jkTable.oneChartTitle,
      requestData: requestLendData,
      chartData: getChartProjectData,
      xyData: getxyData,
      platData: getProjectPlat,
      param: {
        keyword1: 'project_name',
        keyword2: 'token_name',
      },
      unit: '%',
    },
    {
      title: I18n.apy.jkTable.twoChartTitle,
      requestData: requestLoanData,
      chartData: getChartTokenData,
      xyData: getCoinData,
      platData: getTokenPlat,
      param: {
        keyword1: 'token_name',
        keyword2: 'project_name',
      },
      unit: '%',
    },
    {
      title: I18n.apy.jkTable.streeChartTitle,
      requestData: requestGunData,
      chartData: loanDataFormat,
      xyData: getInfoData,
      platData: getInfoPlat,
      param: {},
      unit: '$',
    },
  ],
  machine_gun_pool: [
    {
      title: I18n.apy.jqcTable.oneChartTitle,
      requestData: requestLendData,
      chartData: getChartProjectData,
      xyData: getxyData,
      platData: getProjectPlat,
      param: {
        keyword1: 'project_name',
        keyword2: 'token_name',
      },
      unit: '%',
    },
    {
      title: I18n.apy.jqcTable.twoChartTitle,
      requestData: requestLoanData,
      chartData: getChartTokenData,
      xyData: getCoinData,
      platData: getTokenPlat,
      param: {
        keyword1: 'token_name',
        keyword2: 'project_name',
      },
      unit: '%',
    },
    {
      title: '各平台的',
      requestData: requestGunData,
      chartData: gunDataFormat,
      xyData: getInfoData,
      platData: getInfoHasPlat,
      param: {},
      unit: '$',
    },
  ],
}
export const tableConfig = [
  {
    name: 'machine_gun_pool_single',
    title: I18n.apy.jqcTable.title,
    options: {
      data: [
        {
          key: 'apy',
          name: 'APY',
          status: true,
          format_func: percent2Precision,
        },
        {
          key: 'single_and_mine_award',
          // name: I18n.apy.single_APY,
          name: 'APY',
          status: false,
          format_func: percent2Precision,
        },
        {
          key: 'compound_and_mine_award',
          // name: I18n.apy.compound_APY,
          name: 'APY',
          status: false,
          format_func: percent2Precision,
        },
        {
          key: 'comprehensive',
          name: I18n.apy.yield,
          status: true,
        },
        {
          key: 'single_detail',
          name: I18n.apy.yield,
          status: false,
        },
        {
          key: 'compound_detail',
          name: I18n.apy.yield,
          status: false,
        },
        {
          key: 'quota_remain',
          name: I18n.apy.jqcTable.option.remain,
          status: true,
          format_func: numberFormat,
        },
        {
          key: 'tvl',
          name: I18n.apy.jqcTable.option.tvl,
          status: false,
          format_func: numberFormat,
        },
        {
          key: 'quota_remain_percent',
          name: I18n.apy.jqcTable.option.remainRatio,
          status: false,
          unit: '%',
          format_func: numberFormat,
        },
        {
          key: 'yield',
          name: I18n.apy.jqcTable.option.yield,
          status: false,
        },
      ],
      select: 'apy',
    },
    charts: chartsConfig.machine_gun_pool,
  },
  // {
  //   name: 'lend_single',
  //   title: I18n.apy.ckTable.title,
  //   options: {
  //     data: [
  //       {
  //         key: 'apy',
  //         name: 'APY',
  //         status: true,
  //         format_func: percent2Precision,
  //       },
  //       {
  //         key: 'single_and_mine_award',
  //         name: I18n.apy.single_APY,
  //         status: false,
  //         format_func: percent2Precision,
  //       },
  //       {
  //         key: 'compound_and_mine_award',
  //         name: I18n.apy.compound_APY,
  //         status: false,
  //         format_func: percent2Precision,
  //       },
  //       // {
  //       //   key: 'apy_detail',
  //       //   name: I18n.apy.ckTable.option.yield,
  //       //   status: false,
  //       // },
  //       {
  //         key: 'comprehensive',
  //         name: I18n.apy.yield,
  //         status: true,
  //       },
  //       {
  //         key: 'single_detail',
  //         name: I18n.apy.yield,
  //         status: false,
  //       },
  //       {
  //         key: 'compound_detail',
  //         name: I18n.apy.yield,
  //         status: false,
  //       },
  //       {
  //         key: 'tvl',
  //         name: I18n.apy.ckTable.option.totalSum,
  //         status: true,
  //         format_func: numberFormat,
  //       },
  //       {
  //         key: 'quota_used',
  //         name: I18n.apy.ckTable.option.outSum,
  //         status: false,
  //         format_func: numberFormat,
  //       },
  //       {
  //         key: 'yield',
  //         name: I18n.apy.jqcTable.option.yield,
  //         status: false,
  //       },
  //     ],
  //     select: 'apy',
  //   },
  //   charts: chartsConfig.lend,
  // },
  // {
  //   name: 'loan_single',
  //   title: I18n.apy.jkTable.title,
  //   options: {
  //     data: [
  //       {
  //         key: 'apy',
  //         name: I18n.apy.interest,
  //         status: true,
  //         format_func: percent2Precision,
  //       },
  //       {
  //         key: 'single_and_mine_award',
  //         name: I18n.apy.interest,
  //         status: false,
  //         format_func: percent2Precision,
  //       },
  //       {
  //         key: 'compound_and_mine_award',
  //         name: I18n.apy.compound_APY,
  //         status: false,
  //         format_func: percent2Precision,
  //       },
  //       // {
  //       //   key: 'apy_detail',
  //       //   name: I18n.apy.jkTable.option.InterestBear,
  //       //   status: false,
  //       // },
  //       {
  //         key: 'comprehensive',
  //         name: I18n.apy.InterestBear,
  //         status: true,
  //       },
  //       {
  //         key: 'single_detail',
  //         name: I18n.apy.InterestBear,
  //         status: false,
  //       },
  //       {
  //         key: 'compound_detail',
  //         name: I18n.apy.InterestBear,
  //         status: false,
  //       },
  //       {
  //         key: 'quota_remain',
  //         name: I18n.apy.jkTable.option.available,
  //         status: true,
  //         format_func: numberFormat,
  //       },
  //       {
  //         key: 'quota_remain*quota_remain_percent',
  //         name: I18n.apy.jkTable.option.borrowed,
  //         status: true,
  //         format_cb: (v: any) => numberFormat(v.quota_used),
  //       },
  //       {
  //         key: 'quota_remain_percent',
  //         name: I18n.apy.jkTable.option.remainRatio,
  //         status: false,
  //         unit: '%',
  //         format_func: numberFormat,
  //       },
  //       {
  //         key: 'yield',
  //         name: I18n.apy.InterestBear,
  //         status: false,
  //       },
  //     ],
  //     select: 'apy',
  //   },
  //   charts: chartsConfig.loan,
  // },
]
export const anchorConfig = [
  {
    key: 'machine_gun_pool_single',
    name: I18n.apy.rightFlaot.jqc,
  },
  {
    key: 'lend_single',
    name: I18n.apy.rightFlaot.ck,
  },
  {
    key: 'loan_single',
    name: I18n.apy.rightFlaot.jk,
  },
  {
    key: 'back',
    name: I18n.apy.rightFlaot.back,
  },
]
