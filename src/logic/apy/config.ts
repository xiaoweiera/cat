import { numberFormat, percent2Precision } from '~/lib/tool'

export const chainConfig = [{
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
    select: true,
    key: 'bsc',
    name: 'BSC',
    img: 'https://res.ikingdata.com/nav/apyBsc.png',
  },
]

export const tableConfig = [
  {
    name: 'lend',
    title: 'DeFi 借贷平台存款 APY 对比',
    options: {
      data: [{
        key: 'apy',
        name: '收到利息',
        status: true,
        format_func: percent2Precision,
      }, {
        key: 'apy_detail',
        name: '产出',
        status: true,
      }, {
        key: 'tvl',
        name: '存款总额',
        status: true,
        format_func: numberFormat,
      }, {
        key: 'quota_used',
        name: '借款总量',
        status: false,
        format_func: numberFormat,
      },
      ],
      select: 'apy',
    },
  },
  {
    name: 'loan',
    title: 'DeFi 借贷平台借款利息对比',
    options: {
      data: [
        {
          key: 'apy',
          name: '支付利率',
          status: true,
          format_func: percent2Precision,
        }, {
          key: 'apy_detail',
          name: '计息',
          status: true,
        },
        {
          key: 'quota_remain',
          name: '可借',
          status: false,
          format_func: numberFormat,
        },
        {
          key: 'quota_remain*quota_remain_percent',
          name: '借出',
          status: false,
          format_cb: (v: any) => numberFormat(v.quota_remain * v.quota_remain_percent),
        },
        {
          key: 'quota_remain_percent',
          name: '剩余额度',
          status: false,
          format_func: numberFormat,
        }],
      select: 'apy',
    },
  }, {
    name: 'machine_gun_pool',
    title: 'DeFi 单币种机枪池 APY 对比',
    options: {
      data: [
        {
          key: 'apy',
          name: '收到利息',
          status: true,
          format_func: percent2Precision,
        }, {
          key: 'apy_detail',
          name: '产出币种',
          status: true,
        }, {
          key: 'quote',
          name: '可投额度',
          status: true,
          format_func: numberFormat,
        },
        {
          key: 'tvl',
          name: '总锁仓',
          status: false,
          format_func: numberFormat,
        },
        {
          key: 'quota_remain_percent',
          name: '剩余额度',
          status: false,
          format_func: numberFormat,
        },
      ],
      select: 'apy',
    },
  },
]

export const anchorConfig = [
  {
    key: 'lend',
    name: '存款 APY',
  }, {
    key: 'loan',
    name: '借款利息',
  }, {
    key: 'machine_gun_pool',
    name: '单币机枪池',
  }, {
    key: 'back',
    name: '回到顶部',
  },
]
