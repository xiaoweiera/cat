import {  reactive,ref } from 'vue'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import * as R from 'ramda'
interface platModel {
  logo: string
  name: string
}
//热门搜索
export const hot=ref([
  {token_id:'0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c',name:'MDX',type:'token'},
  {token_id:'0x0298c2b32eae4da002a15f36fdf7615bea3da047',name:'HUSD',type:'token'},
  {token_id:'0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',name:'WHT',type:'token'},
  {token_id:'0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',name:'ETH',type:'token'},
  {token_id:'0x66a79d23e58475d2738179ca52cd0b41d73f0bea',name:'HBTC',type:'token'},
  {token_id:'0xae3a768f9ab104c69a7cd6041fe16ffa235d1810',name:'HFIL',type:'token'},
  {token_id:'0x202b4936fe1a82a4965220860ae46d7d3939bb25',name:'AAVE',type:'token'}
])
//分析种类tag
export const analysisType=ref('flow')   //flow  pay
export const selectTxt = ref<string>('')
export const selectHistory=ref([{},{},{},{},{},{},{},{},{},{}])
// 选择的平台
export const platStore: platModel = reactive({ logo: '', name: '' }) // 弹窗状态
// 左侧列表table 选择的 交易对
export const pairStore = reactive({ name: '', id: '' })
export const symbolStore = reactive({ name: '', id: '0xe36ffd17b2661eb57144ceaef942d95295e637f0' })  //主币
export const symbol0 = reactive({ name: '', id: '' })  // WHT/FILDA  WHT
export const symbol1 = reactive({ name: '', id: '' })   // WHT/FILDA  FILDA
export const priceData=ref()
export const selectCoin = reactive({
  tokenId: '',
  name: '',
  origin: '',
})
export const paramChart = reactive({
  timeBegin: getagoTimeStamp(90), // 开始时间
  timeEnd: dataToTimestamp(formatDefaultTime(null,'YYYY-MM-DD')), // 结束时间
  time:'',//时间是否改变，改变值  判断是否改变
  timeType:90,//7 30 90    0是自定义
  interval: '1D', // 颗粒度
  coinType: 'usd', // USD或者币
  tokenType: 'pair', // pair ETH USDT
})
// 整合对象赋值  reactive {}
export const updateData = (origin: any, data: any) => {
  const keys = Object.keys(data)
  R.map(key => {
      origin[key] = data[key]
  }, keys)
}

// 获取缓存的搜索记录
export const getHistory=()=>{
  if(localStorage.getItem('history') && localStorage.getItem('history')!=='null'){
    //@ts-ignore
    const data=JSON.parse(localStorage?.getItem('history'))
    if(data.length!==selectHistory.value.length){
      //@ts-ignore
      localStorage.setItem('history',null)
      return [{},{},{},{},{},{},{},{},{},{}]
    }
    selectHistory.value=data
    return  data
  }
  return []
}
// 设置缓存的搜索记录 里面包含token和pair
export const setHistory=(token_or_pair:any)=>{
  let isHas=false
  R.forEach(item=>{
    //@ts-ignore
    if(item.name===token_or_pair.name) isHas=true
  },selectHistory.value)
  if(!isHas){
    selectHistory.value = [...selectHistory.value.slice(1), token_or_pair]
    //@ts-ignore
    localStorage.setItem('history',JSON.stringify(selectHistory.value))
  }
}
//清除历史记录缓存
export const clearHistory=()=>{
  //@ts-ignore
  localStorage.setItem('history',null)
  selectHistory.value=[{},{},{},{},{},{},{},{},{},{}]
}
