//流动性下钻header
export const flowHeader = [
    {name: '地址', width: '110px'},
    {name: '交易对', width: '110px'},
    {key:'net_inflowusd',name: '净添加量', width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'mints_amountusd',name: '添加总量', width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'burns_amountusd',name: '移除总量', width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'total_join_num',name: '参与次数', width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'mints_join_num',name: '添加次数', width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'burns_join_num',name: '移除次数', width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'}
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
    'mints':'添加流动性',
    'burns':'撤出流动性'
}
//流动性pair二级下钻
export const flowOpenHeader=[
    {name: '时间', width: ''},
    {name: '交易对', width: ''},
    {name: '方向', width: ''},
    {name: '净添加量', width: ''},
    {name: '总价值', width: ''},
    {name: 'TX ID', width: '110px'},
]
//交易数据下钻header
export const payHeader = [
    {name: '地址', width: '110px'},
    {name: '交易对', width: '110px'},
    {key:'symbol0_flow_in_fund',name: '净买入', width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'symbol0_buy_fund',name: '买入', width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'symbol0_sell_fund',name: '卖出', width: '',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'swap_count',name: '交易笔数', width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'buy_count',name: '买入笔数', width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    {key:'sell_count',name: '卖出笔数', width: '80px',img:'https://res.ikingdata.com/nav/apyNoOrder.png'}
]
//交易数据pair二级下钻
export const payOpenHeader=[
    {name: '时间', width: ''},
    {name: '方向', width: ''},
    {name: '净买入', width: ''},
    {name: '总价值', width: ''},
    {name: 'TX ID', width: '110px'},
]
export const orderTypeName={
    0:{key:'',img:'https://res.ikingdata.com/nav/apyNoOrder.png'},
    1:{key:'desc',img:'https://res.ikingdata.com/nav/apyDesc.png'},
    2:{key:'asc',img:'https://res.ikingdata.com/nav/apyAsc.png'}
}

