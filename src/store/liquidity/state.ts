import {  reactive,ref } from 'vue'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'
import * as R from 'ramda'
interface platModel {
  logo: string
  name: string
}
//分析种类tag
export const analysisType=ref('flow')   //flow  pay
export const selectTxt = ref<string>('')
export const selectHistory=ref([{},{},{},{}])
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
  R.map((key) => {
      origin[key] = data[key]
  }, keys)
}
// 获取缓存的搜索记录
export const getHistory=()=>{
  if(localStorage.getItem('history')){
    //@ts-ignore
    const data=JSON.parse(localStorage?.getItem('history'))
    selectHistory.value=data
    return  data
  }
  return []
}
// 设置缓存的搜索记录 里面包含token和pair
export const setHistory=(list:any)=>{
  selectHistory.value.shift()
  selectHistory.value.push(list)
  //@ts-ignore
  localStorage.setItem('history',JSON.stringify(selectHistory.value))
}
