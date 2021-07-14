//哪些指标显示单位
export const unitDatas={
    '单位时间内流动性净流入':true,
    '累计流动性资金':true,
    '单位时间内流动性添加总量':true,
    '单位时间内流动性撤出总量':true,
    '单位时间内资金净流入':true,
    '单位时间内主动买入':true,
    '单位时间内主动卖出':true,
    '交易额趋势':true
}
export const titleCofig={
    '6':{change:true,replaceStr:''},
    '7':{change:true,replaceStr:'资金明细'},
    '10':{change:true,replaceStr:'频次'},
}
export const analysisConfig=[
    {title:'流动性分析',des:'展示选定币种/交易对在单位时间内的流动性净流入，计算方法为单位时间内的流。'},
    {title:'交易数据分析',des:'展示选定币种/交易对在单位时间内的流动性净流入，计算方法为单位时间内的流。'}
]
export const chartDataConfig=[
    {
        title:'资金净流入',
        desc:'展示选定币种或者交易对的相关资金净流入情况。资金的净流入方向一定程度上代表着用户对产品的认可程度，对后市价格也影响较大。',
        flow:{
            id:0,
            tokenCofig:{
                usdCoin:true,
            },
            pairCofig:{
                usdCoin:false
            }
        },
        pay:{
            id:5,
            tokenCofig:{
                usdCoin:true,
            },
            pairCofig:{
                usdCoin:true
            }
        }
    },
    // {
    //     title:'流入流出明细',
    //     desc:'展示选定币种或者交易对的相关资金净流入流出的明细，更直观的展示资金在多空博弈时的体量。',
    //     flow:{
    //         id:1,
    //         tokenCofig:{
    //             usdCoin:true,
    //         },
    //         pairCofig:{
    //             usdCoin:false
    //         }
    //     },
    //     pay:{
    //         id:6,
    //         tokenCofig:{
    //             usdCoin:true,
    //         },
    //         pairCofig:{
    //             usdCoin:true
    //         }
    //     }
    //
    // },
    // {
    //     title:'流出流出频次',
    //     desc:'展示选定币种或者交易对的用户操作的频率，能直观的反映人们参与的热情。',
    //     flow:{
    //         id:4,
    //         tokenCofig:{
    //             usdCoin:false,
    //         },
    //         pairCofig:{
    //             usdCoin:false
    //         }
    //     },
    //     pay:{
    //         id:9,
    //         tokenCofig:{
    //             usdCoin:false,
    //         },
    //         pairCofig:{
    //             usdCoin:false
    //         }
    //     }
    // },
    // {
    //     title:'参与人数分析',
    //     desc:'展示选定币种或者交易对的参数人数的明细，能直观的看出相关项目的用户规模。',
    //     flow:{
    //         id:3,
    //         tokenCofig:{
    //             usdCoin:false,
    //         },
    //         pairCofig:{
    //             usdCoin:false
    //         }
    //     },
    //     pay:{
    //         id:8,
    //         tokenCofig:{
    //             usdCoin:false,
    //         },
    //         pairCofig:{
    //             usdCoin:false
    //         }
    //     }
    // },
    // {
    //     title:'新增人数分析',
    //     desc:'展示选定币种或者交易对的新增用户的明细，能直观的看出相关项目有多少新用户进入。',
    //     flow:{
    //         id:2,
    //         tokenCofig:{
    //             usdCoin:false,
    //         },
    //         pairCofig:{
    //             usdCoin:false
    //         }
    //     },
    //     pay:{
    //         id:7,
    //         tokenCofig:{
    //             usdCoin:false,
    //         },
    //         pairCofig:{
    //             usdCoin:false
    //         }
    //     }
    // }
]