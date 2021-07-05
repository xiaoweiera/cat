import {  reactive,ref } from 'vue'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import * as R from 'ramda'
interface platModel {
  logo: string
  name: string
}
//热门搜索
export const hot=ref([
  {token_id:'0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',name:'热门1',type:'token'},
  {token_id:'0x6cac826c9ee29a7ac60a3ec64c69c5d3f6a7e12a',name:'热门2',type:'token'},
  {token_id:'0x8ae16990ef269ba0ccdb6290b67430bfd5b6be49',name:'热门3',type:'token'},
  {token_id:'0x68ef44dbc87badf502b0dfc974981ffa4209b139',name:'热门4',type:'token'}
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
