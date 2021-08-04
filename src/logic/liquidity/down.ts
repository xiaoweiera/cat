//流动性下钻header
export const flowHeader = [
    {name: '地址', width: '110px'},
    {name: '交易对', width: '110px'},
    {name: '净添加量', width: ''},
    {name: '添加总量', width: ''},
    {name: '移除总量', width: ''},
    {name: '参与次数', width: '60px'},
    {name: '添加次数', width: '60px'},
    {name: '移除次数', width: '60px'}
]
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
    {name: '净买入', width: ''},
    {name: '买入', width: ''},
    {name: '卖出', width: ''},
    {name: '交易笔数', width: '60px'},
    {name: '买入笔数', width: '60px'},
    {name: '卖出笔数', width: '60px'}
]
//交易数据pair二级下钻
export const payOpenHeader=[
    {name: '时间', width: ''},
    {name: '方向', width: ''},
    {name: '净买入', width: ''},
    {name: '总价值', width: ''},
    {name: 'TX ID', width: '110px'},
]

