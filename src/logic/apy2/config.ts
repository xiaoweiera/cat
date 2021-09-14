import I18n from '~/utils/i18n/index'
export const chains=[
    {key:'all',name:I18n.apyIndex.allChain,icon:'https://res.ikingdata.com/apyTwo/allChain.png'},
    // {key:'SOLANA',name:'Solana',icon:'https://res.ikingdata.com/apyTwo/sol.png'},
    {key:'eth',name:'ETH',icon:'https://res.ikingdata.com/apyTwo/ethChain.png'},
    {key:'bsc',name:'BSC',icon:'https://res.ikingdata.com/apyTwo/bscChain.png'},
    {key:'heco',name:'Heco',icon:'https://res.ikingdata.com/apyTwo/hecoChain.png'},
    {key:'oec',name:'OEC',icon:'https://res.ikingdata.com/apyTwo/oecChain.png'},
    // {key:'hoo',name:'Hoo',icon:'https://res.ikingdata.com/apyTwo/hooChain.png'},
    {key:'polygon',name:'Pos',icon:'https://res.ikingdata.com/apyTwo/posChain.png'},

]
export const selectChains=[
    {label: I18n.apyIndex.chain, value:'all'},
    // {label:'Solana',value:'SOLANA'},
    {label:'ETH', value:'eth'},
    {label:'BSC', value:'bsc'},
    {label:'Heco', value:'heco'},
    {label:'OEC', value:'oec'},
    {label:'Hoo', value:'hoo'},
    {label:'PoS', value:'pos'},

]
export const chainsIcon={
    // 'Solana':'https://res.ikingdata.com/apyTwo/sol.png',
    'eth':'https://res.ikingdata.com/apyTwo/ethChain.png',
    'bsc':'https://res.ikingdata.com/apyTwo/bscChain.png',
    'heco':'https://res.ikingdata.com/apyTwo/hecoChain.png',
    'oec':'https://res.ikingdata.com/apyTwo/oecChain.png',
    'hoo':'https://res.ikingdata.com/apyTwo/hooChain.png',
    'polygon':'https://res.ikingdata.com/apyTwo/posChain.png',
    'hsc':'https://res.ikingdata.com/nav/apyHsc.png',
}
export const searchStaticToken=[
    {name:'BTC',id:''},
    {name:'ETH',id:''},
    {name:'MDX',id:''},
]
export const noticType={
    'announcement':I18n.apyIndex.notice,
    'tutorial':I18n.apyIndex.tutorial,
    'warning':I18n.apyIndex.warning
}
export const project_type={
    Vault:'V',
    Lending:'L',
    Farm:'F'
}
export const colors: string[] = [
    '#2B8CFF', //'rgb(43, 140, 255)',
    '#38D600', // 'rgb(56, 214, 0)',
    '#333333', // rgba(0, 0, 0, 0.8)',
    '#239F95', // 'rgb(35, 159, 149)',
    '#00C6E1', //'rgb(0, 198, 225)',
    '#2155A9', //'rgb(33, 85, 169)',
    '#2237EE', //'rgb(34, 55, 238)',
    '#A11FF0', //'rgb(161, 31, 240)',
    '#F42A97', //'rgb(244, 42, 151)',
    '#E92D2D', //'rgb(233, 45, 45)'
]

export const chartTop=['BTC','ETH','USDC','DAI','MDX','BNB','CAKE','HT','OKB','MATIC','UNI']
export const chartTopMobile=['BTC','ETH','USDC','DAI']
