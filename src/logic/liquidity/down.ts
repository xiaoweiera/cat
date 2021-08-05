import I18n from '~/utils/i18n/index'
//流动性下钻header
export const flowHeader = [
    {name: I18n.liquidity.down.address, width: '110px'},
    {name: I18n.liquidity.down.pair, width: '110px'},
    {key:'net_inflowusd',name: I18n.liquidity.down.netAdd, width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'mints_amountusd',name: I18n.liquidity.down.add, width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'burns_amountusd',name: I18n.liquidity.down.remove, width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'total_join_num',name: I18n.liquidity.down.times, width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'mints_join_num',name: I18n.liquidity.down.addTimes, width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'burns_join_num',name: I18n.liquidity.down.removeTimes, width: '100px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'}
]
export const orderRules={
    flow:{
        '1':'net_inflowusd',
        '2':'net_inflowusd',
        '3':'total_join_num',
        '4':'total_join_num',
        '5':'total_join_num',
    },
    pay:{
        '6':'symbol0_flow_in_fund',
        '7':'symbol0_flow_in_fund',
        '8':'swap_count',
        '9':'swap_count',
        '10':'swap_count'
    }
}
export const typeName={
    'mints':I18n.liquidity.down.addLiquidity,
    'burns':I18n.liquidity.down.removeLiquidity
}
//流动性pair二级下钻
export const flowOpenHeader=[
    {name: I18n.liquidity.down.time, width: ''},
    {name: I18n.liquidity.down.pair, width: ''},
    {name: I18n.liquidity.down.direction, width: ''},
    {name: I18n.liquidity.down.netAdd, width: ''},
    {name: I18n.liquidity.down.value, width: ''},
    {name: 'TX ID', width: '110px'},
]
//交易数据下钻header
export const payHeader = [
    {name: I18n.liquidity.down.address, width: '110px'},
    {name: I18n.liquidity.down.pair, width: '110px'},
    {key:'symbol0_flow_in_fund',name: I18n.liquidity.down.netBuy, width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'symbol0_buy_fund',name: I18n.liquidity.down.buy, width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'symbol0_sell_fund',name: I18n.liquidity.down.sell, width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'swap_count',name: I18n.liquidity.down.payTimes, width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'buy_count',name: I18n.liquidity.down.buyTimes, width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'sell_count',name: I18n.liquidity.down.sellTimes, width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'}
]
//交易数据pair二级下钻
export const payOpenHeader=[
    {name: I18n.liquidity.down.time, width: ''},
    {name: I18n.liquidity.down.direction, width: ''},
    {name: I18n.liquidity.down.netBuy, width: ''},
    {name: I18n.liquidity.down.value, width: ''},
    {name: 'TX ID', width: '110px'},
]
export const orderTypeName={
    0:{key:'',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    1:{key:'desc',img:'https://res.ikingdata.com/nav/apyDesc.png'},
    2:{key:'asc',img:'https://res.ikingdata.com/nav/apyAsc.png'}
}

