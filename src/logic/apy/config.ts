import { numberFormat, percent2Precision } from '~/lib/tool'
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
export const headerConfig = [
  {
    name: '数据图表',
    url: 'https://ikingdata.com',
  },
  {
    name: '7x24小时监控',
    url: 'https://ikingdata.com/news',
  },
  {
    name: '研究报告',
    url: 'https://ikingdata.com/reports/',
    type: 'public',
  },
  {
    name: 'GrowthPad',
    url: 'https://ikingdata.com/growthpad',
    type: 'public',
  },
  {
    name: 'DeFi挖矿收益APY大全',
    url: '',
    type: 'public',
  },
]
export const tools = [
  {
    name: '区块链数据分析资源网站',
    url: 'https://nav.ikingdata.com/nav',
  },
  {
    name: '历史的今天',
    url: 'https://ikingdata.com/tih',
  },
  {
    name: '板块龙头',
    url: 'https://ikingdata.com/bull',
  },
]
export const tableIndex = {
  machine_gun_pool_single: 0,
  lend_single: 1,
  loan_single: 2,
}
export const chainConfig = [
  {
    select: false,
    key: 'eth',
    name: 'ETH',
    img: 'https://res.ikingdata.com/nav/apyEth.png',
  },
  {
    select: true,
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
    key: 'hsc',
    name: 'HSC',
    img: 'https://res.ikingdata.com/nav/apyHsc.png',
  },
  {
    select: false,
    key: 'all',
    name: '全部',
    img: 'https://res.ikingdata.com/nav/apyAllTip.png',
  },
]
export const chartsConfig = {
  lend: [
    {
      title: '各币种存款APY趋势对比',
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
      title: '在不同平台存款的 APY 趋势对比',
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
      title: '各平台存款总额',
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
      title: '各币种借款APY趋势对比',
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
      title: '在不同平台借款的 APY 趋势对比',
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
      title: '各平台借款总额',
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
      title: '各币种机枪池APY趋势对比',
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
      title: '在不同机枪池 APY 趋势对比',
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
    title: 'DeFi 单币种机枪池 APY 对比',
    options: {
      data: [
        {
          key: 'apy',
          name: 'APY',
          status: true,
          format_func: percent2Precision,
        },
        {
          key: 'apy_detail',
          name: '产出',
          status: true,
        },
        {
          key: 'quota_remain',
          name: '可投额度',
          status: true,
          format_func: numberFormat,
        },
        {
          key: 'tvl',
          name: '总锁仓',
          status: true,
          format_func: numberFormat,
        },
        {
          key: 'quota_remain_percent',
          name: '剩余额度',
          status: true,
          unit: '%',
          format_func: numberFormat,
        },
      ],
      select: 'apy',
    },
    charts: chartsConfig.machine_gun_pool,
  },
  {
    name: 'lend_single',
    title: 'DeFi 借贷平台存款 APY 对比',
    options: {
      data: [
        {
          key: 'apy',
          name: 'APY',
          status: true,
          format_func: percent2Precision,
        },
        {
          key: 'apy_detail',
          name: '产出',
          status: true,
        },
        {
          key: 'tvl',
          name: '存款总额',
          status: true,
          format_func: numberFormat,
        },
        {
          key: 'quota_used',
          name: '借款总量',
          status: true,
          format_func: numberFormat,
        },
      ],
      select: 'apy',
    },
    charts: chartsConfig.lend,
  },
  {
    name: 'loan_single',
    title: 'DeFi 借贷平台借款利息对比',
    options: {
      data: [
        {
          key: 'apy',
          name: '利息',
          status: true,
          format_func: percent2Precision,
        },
        {
          key: 'apy_detail',
          name: '计息',
          status: true,
        },
        {
          key: 'quota_remain',
          name: '可借',
          status: true,
          format_func: numberFormat,
        },
        {
          key: 'quota_remain*quota_remain_percent',
          name: '借出',
          status: true,
          format_cb: (v: any) => numberFormat(v.quota_used),
        },
        {
          key: 'quota_remain_percent',
          name: '剩余额度',
          status: true,
          unit: '%',
          format_func: numberFormat,
        },
      ],
      select: 'apy',
    },
    charts: chartsConfig.loan,
  },
]
export const anchorConfig = [
  {
    key: 'machine_gun_pool_single',
    name: '机枪池APY',
  },
  {
    key: 'lend_single',
    name: '存款APY',
  },
  {
    key: 'loan_single',
    name: '借款APY',
  },
  {
    key: 'back',
    name: '回到顶部',
  },
]
