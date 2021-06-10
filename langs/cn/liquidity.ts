export default {
    info: {
        tokenAddress: 'Token地址',
    },
    side: {
        self: '自选',
        selfPair: '自选交易对',
        pair: '交易对',
        tvl: 'TVL($)',
        price: '价格($)',
        change: '涨跌幅'
    },
    mainHeader: {
        liquidity: '流动性分析',
        payData: '交易数据分析',
        week: '近7天',
        month: '近1月',
        streeMonth: '近3月',
        custom: '自定义',
        coin: '币'
    },
    mainChart: {
        inflow: {
            name: '流动性净流入',
            des: '展示选定币种/交易对在单位时间内的流动性净流入，计算方法为单位时间内的流出-流入。流动性作为“交易深度”，在一定时间内发生异常变化，可能导致行情发生剧烈变化。',
            lengend:{
                inNumber:'单位时间内流动性净流入',
                money:'累计流动性资金',
                price:'价格'
            }
        },
        inOutPeople: {
            name: '流动性添加与撤出人数',
            des: '展示选定币种/交易对在单位时间内参与流动性添加和撤出的人数分布情况。该指标一定程度上表现了市场上散户的情绪',
            lengend:{
                inPeople:'单位时间内添加流动性人数',
                outPeople:'单位时间内撤出流动性人数',
                joinPeople:'单位时间内参与流动性总人数',
                sumPeople:'累计参与人数'
            }
        },
        inOutNumber: {name: '流动性添加与撤出量', des: '展示选定币种/交易对在单位时间内流动性添加量和撤出量的分布情况，流动性作为“交易深度”，在一定时间内发生异常变化，可能导致行情发生剧烈变化。'},
        joinNumber: {
            name: '新增流动性参与人数 (之前从未参与)',
            des: '展示选定币种/交易对在单位时间内参与流动性添加或撤出的新增独立用户数量，该指标中的新增人数为之前从未参与过流动性变化的人数，该指标一定程度上表现了该项目的受关注程度。'
        },
        inOutOnce: {name: '流动性添加与撤出次数', des: '展示选定币种/交易对在单位时间内参与流动性添加和撤出的频率情况，该指标一定程度上表现了该币种的流动性强弱情况。'}
    }

}