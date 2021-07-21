import I18n from '~/utils/i18n/index'
//哪些指标显示单位
// export const unitDatas={
//     '单位时间内流动性净流入':true,
//     '累计流动性资金':true,
//     '单位时间内流动性添加总量':true,
//     '单位时间内流动性撤出总量':true,
//     '单位时间内资金净流入':true,
//     '单位时间内主动买入':true,
//     '单位时间内主动卖出':true,
//     '交易额趋势':true
// }
export const titleCofig={
    '6':{change:true,replaceStr:''},
    '7':{change:true,replaceStr:I18n.liquidity.titleCofig.money},
    '10':{change:true,replaceStr:I18n.liquidity.titleCofig.number},
}
//token是否根据pair交易对的未知，来确定tokenType为symbol0或者symbol1
export const isSymbol0Symbol1=[6,7,10]
export const chartDataConfig=[
    {
        title:I18n.liquidity.mainChart.moneyInto.title,
        desc:I18n.liquidity.mainChart.moneyInto.desc,
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
    {
        title:I18n.liquidity.mainChart.IntoInOutAnalysis.title,
        desc:I18n.liquidity.mainChart.IntoInOutAnalysis.desc,
        flow:{
            id:1,
            tokenCofig:{
                usdCoin:true,
            },
            pairCofig:{
                usdCoin:false
            }
        },
        pay:{
            id:6,
            tokenCofig:{
                usdCoin:true,
            },
            pairCofig:{
                usdCoin:true
            }
        }

    },
    {
        title:I18n.liquidity.mainChart.IntoInOutNumber.title,
        desc:I18n.liquidity.mainChart.IntoInOutNumber.desc,
        flow:{
            id:4,
            tokenCofig:{
                usdCoin:false,
            },
            pairCofig:{
                usdCoin:false
            }
        },
        pay:{
            id:9,
            tokenCofig:{
                usdCoin:false,
            },
            pairCofig:{
                usdCoin:false
            }
        }
    },
    {
        title:I18n.liquidity.mainChart.joinUsersAnalysis.title,
        desc:I18n.liquidity.mainChart.joinUsersAnalysis.desc,
        flow:{
            id:3,
            tokenCofig:{
                usdCoin:false,
            },
            pairCofig:{
                usdCoin:false
            }
        },
        pay:{
            id:8,
            tokenCofig:{
                usdCoin:false,
            },
            pairCofig:{
                usdCoin:false
            }
        }
    },
    {
        title:I18n.liquidity.mainChart.addUsersAnalysis.title,
        desc:I18n.liquidity.mainChart.addUsersAnalysis.desc,
        flow:{
            id:2,
            tokenCofig:{
                usdCoin:false,
            },
            pairCofig:{
                usdCoin:false
            }
        },
        pay:{
            id:7,
            tokenCofig:{
                usdCoin:false,
            },
            pairCofig:{
                usdCoin:false
            }
        }
    }
]