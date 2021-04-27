import {numberFormat, percent2Precision} from '~/lib/tool'
import {lendDataFormat,loanDataFormat,gunDataFormat,getChartProjectData,getChartTokenData,getxyData,getInfoData,requestLendData,requestLoanData,requestGunData} from '~/logic/apy/chartFormatTool'
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


export const chartsConfig = {
    lend: [
        {title: '各币种借款APY趋势对比', requestData:requestLendData, chartData:getChartProjectData, xyData:getxyData,param:{keyword1: 'project_name', keyword2: 'token_name'}},
        {title: '在不同平台存款的 APY 趋势对比',requestData:requestLoanData,chartData:getChartTokenData, xyData:getxyData,param:{keyword1: 'token_name', keyword2: 'project_name'}},
        {title: '各平台存款总额',requestData:requestGunData,chartData:lendDataFormat, xyData:getInfoData,param:{}},
    ]
    ,
    loan: [
        {title: '各币种借款APY趋势对比',requestData:requestLendData,chartData:getChartProjectData,xyData:getxyData,param:{keyword1: 'project_name', keyword2: 'token_name'}},
        {title: '在不同平台存款的 APY 趋势对比',requestData:requestLoanData,chartData:getChartTokenData, xyData:getxyData,param:{keyword1: 'token_name', keyword2: 'project_name'}},
        {title: '各平台借款总额',requestData:requestGunData,chartData:loanDataFormat, xyData:getInfoData,param:{}},
    ]
    ,
    machine_gun_pool: [
        {title: '各币种借款APY趋势对比',requestData:requestLendData,chartData:getChartProjectData, xyData:getxyData,param:{keyword1: 'project_name', keyword2: 'token_name'}},
        {title: '在不同机枪池 APY 趋势对比',requestData:requestLoanData,chartData:getChartTokenData, xyData:getxyData,param:{keyword1: 'token_name', keyword2: 'project_name'}},
        {title: '各平台的信息对比',requestData:requestGunData,chartData:gunDataFormat, xyData:getInfoData,param:{}},
    ]
}

export const tableConfig = [
    {
        name: 'lend',
        title: 'DeFi 借贷平台存款 APY 对比',
        options: {
            data: [{
                key: 'apy',
                name: 'APY',
                status: true,
                format_func: percent2Precision,
            }, {
                key: 'apy_detail',
                name: '产出',
                status: false,
            }, {
                key: 'tvl',
                name: '存款总额',
                status: false,
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
        charts: chartsConfig.lend
    },
    {
        name: 'loan',
        title: 'DeFi 借贷平台借款利息对比',
        options: {
            data: [
                {
                    key: 'apy',
                    name: '利息',
                    status: true,
                    format_func: percent2Precision,
                }, {
                    key: 'apy_detail',
                    name: '计息',
                    status: false,
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
                    format_cb: (v: any) => numberFormat(v.quota_remain * v.quota_remain_percent, false),
                },
                {
                    key: 'quota_remain_percent',
                    name: '剩余额度',
                    status: false,
                    format_func: numberFormat,
                }],
            select: 'apy',
        },
        charts: chartsConfig.loan
    },
    {
        name: 'machine_gun_pool',
        title: 'DeFi 单币种机枪池 APY 对比',
        options: {
            data: [
                {
                    key: 'apy',
                    name: 'APY',
                    status: true,
                    format_func: percent2Precision,
                }, {
                    key: 'apy_detail',
                    name: '产出币种',
                    status: false,
                }, {
                    key: 'quote',
                    name: '可投额度',
                    status: false,
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
        charts: chartsConfig.machine_gun_pool
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
