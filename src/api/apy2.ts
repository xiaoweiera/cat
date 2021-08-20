/**
 * @file APY 2.0 接口
 */
import request from '~/lib/service'
// 币种列表
export { list as tokenList } from '~/api/apy/token/index'

//搜索框搜索币种
export const searchToken=async (param:any)=>{
  const list=[]
  for (let i=0;i<10;i++){
    const value1={
      ids:'aqaweqdqaa',
      name:'ETH',
      logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
      apy:34.33,
    }
    const value2={
      ids:'aqawqdqaa',
      name:'BTC',
      logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
      apy:-34.33,
    }
    const value3={
      ids:'aqaqdqaa',
      name:'MDX',
      logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
      apy:-34.33,
    }
    list.push(value1,value2,value3)
  }
  return list
}
//搜索框搜索池子
export const searchPool=async (param:any)=>{
  const list=[]
  for (let i=0;i<10;i++){
    const value1={
      ids:'aqaweqdqaa',
      name:'ETH',
      type:'token',
      logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
      apy:34.33,
    }
    const value2={
      ids:'aqawqdqaa',
      name:'BTC',
      type:'pair',
      logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
      apy:-34.33,
    }
    const value3={
      ids:'aqaqdqaa',
      name:'MDX',
      type:'token',
      logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
      apy:-34.33,
    }
    list.push(value1,value2,value3)
  }
  return list
}
export const project_summary=async ()=>{
  return request({
    url: '/api/apy/ninja/project_summary',
    method: 'get'
  })
}
