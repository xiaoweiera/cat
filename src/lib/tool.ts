


// @ts-ignore
import dayjs from 'dayjs'
import * as R from 'ramda'
import { ElMessage } from 'element-plus'
import message from '~/utils/message'
import I18n from '~/utils/i18n/index'
import {BigNumber} from 'bignumber.js'
//apy的特殊处理，别更改
export const numberFormat = (value: any) => {
  if (value===null) {
    return null
  }
  const k = 10000
  const sizes = ['', '万', '亿', '万亿']
  if (value < k) {
    return Math.round(value * 100) / 100
  }
  const i: number = Math.floor(Math.log(value) / Math.log(k))
  const values = parseFloat((value / Math.pow(k, i)).toFixed(2))
  const unit = sizes[i]
  return values + unit
}

export const toFixedNumber = (value: any, rounded = 2) => {
  if (!value && value !== 0) {
    return ''
  }
  const vil = Math.pow(10, rounded)
  return Math.round(value * vil) / vil
}
export const percent2Precision = (value: any): String => {
  if (!value && value !== 0) {
    return ''
  }
  return `${toFixedNumber(value)}%`
}
// 数字正负判断
export const numColor = (value: any) => {
  if (!value) {
    return '-'
  } else if (value >= 0) {
    return `+${toFixedNumber(value, 2)}`
  } else {
    return toFixedNumber(value, 2)
  }
}

export const formatTimeMD = (date: string) =>
    dayjs(parseInt(`${date}000`)).format('MM/DD')
export const formatTimeHour = (date: string) =>
    dayjs(parseInt(`${date}000`)).format('M/DD HH:mm')
export const tooptipsModel = (
    item: any,
    color: any,
    value: any,
    unit: string,
) => {
  const origin = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.35216 5.53165L5.03262 8.17072C4.77853 8.6789 4.25914 8.9999 3.69098 8.9999H1.33333C0.781043 8.9999 0.333328 8.55219 0.333328 7.9999C0.333328 7.44762 0.781043 6.9999 1.33333 6.9999H3.38196L5.53045 2.70293C6.02868 1.70646 7.49773 1.86772 7.76793 2.94854L9.64783 10.4682L10.9674 7.82908C11.2215 7.32091 11.7409 6.9999 12.309 6.9999H14.6667C15.2189 6.9999 15.6667 7.44762 15.6667 7.9999C15.6667 8.55219 15.2189 8.9999 14.6667 8.9999H12.618L10.4695 13.2969C9.9713 14.2934 8.50226 14.1321 8.23206 13.0513L6.35216 5.53165Z" fill="${color}"/>
      </svg>`
  const svg = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(origin)),
  )}`
  const info =
      unit === '$' ? `${item} ${unit}${value}` : `${item}  ${value}${unit}`

  return `<span style="display:flex;
    align-items: center;"><p style="font-size:12px;color:#272C33;line-height:1;margin:6px 0 0;display:flex;
    align-items: center;"><img style="margin-bottom:1.5px;width:16px;height:auto;margin-right:5px;" src='${svg}'/> ${info}</p></span>`
}

// 时间转化为时间戳
export function dataToTimestamp(time: string) {
  return dayjs(time).valueOf() / 1000
}
// 得到天颗粒度的时间
export const formatDefaultTime = (date: any,format:string) => {
  format=format?format:'YYYY-MM-DD'
  if (date) {
    if(typeof date !=='number'){
      return dayjs(date).format(format)
    }
    return dayjs(parseInt(date+'000')).format(format)
  } else {
    return dayjs().format(format)
  }
}
// 得到小时颗粒度的时间
export const formatHourTime = (date: number) => {
  if (date) {
    return dayjs(parseInt(date+'000')).format('MM/DD HH:mm')
  } else {
    return dayjs().format('MM/DD HH:mm')
  }
}
// 得到对应时间的时间戳  如 前7天 前30天
export const getagoTimeStamp = (day: number) => {
  return dataToTimestamp(dayjs().subtract(day, 'days').format('YYYY-MM-DD'))
}
export const min_max = (min: any, max: any, v: any) => {
  if (v === null) {
    return [min, max]
  }
  if (min === null || min > v) {
    min = v
  }
  if (max === null || max < v) {
    max = v
  }
  return [min, max]
}

export const messageError = function (message: any): void {
  if (typeof message === 'string') {
    ElMessage.warning(message)
  } else {
    const values = R.values(message)
    const [text]: Array<string> = R.flatten(values)
    if (text) {
      ElMessage.warning(text)
    } else {
      ElMessage.warning(message)
    }
  }
}

export const messageSuccess = function (text: string): void {
  ElMessage({
    message: text,
    type: 'success',
    showClose: false,
    customClass: 'message-tips',
  })
}

// copy
export const copyTxt = (text: string, alert?: boolean) => {
  const dom = document.createElement('input')
  dom.setAttribute('value', text)
  document.body.appendChild(dom)
  dom.select()
  document.execCommand('copy')
  document.body.removeChild(dom)
  if (alert) {
    // messageSuccess(I18n.common.message.copy)
    message.copy({
      value: I18n.common.message.copyAlert,
      desc: text,
    })
  }
}
// 更改路由参数
export const changeRoute = (
    route: any,
    router: any,
    paramName: string,
    paramValue: string,
) => {
  const query = { ...route.query }
  query[paramName] = paramValue
  router.replace({
    ...route,
    query: { ...query },
  })
}
// 更改路由参数传对象
export const changeRouteParam = (
    route: any,
    router: any,
    param:any
) => {
  const query = { ...route.query }
  R.map(key=>query[key]=param[key],R.keys(param))
  router.replace({
    ...route,
    query: { ...query },
  })
}
// 省略token
export const smallToken = (tokenId: string) => {
  if (!tokenId) return
  return `${tokenId.slice(0, 6)}...${tokenId.slice(
      tokenId.length - 4,
      tokenId.length,
  )}`
}
export const subStr = (str:string)=>{
  if (!str || str.length<=7) return str
  return str.slice(0, 7)+'...'
}
//弱提示框
export const messageTip=(content:string,typeName:string)=>{
  ElMessage({
    showClose: true,
    dangerouslyUseHTMLString:true,
    message:`<div class="flex items-center "><img class="w-4 h-4 -ml-4" src="https://res.ikingdata.com/nav/successIcon.png"><span class="ml-4">${content}</span></div>`,
    //@ts-ignore
    type: typeName
  });
}
//得到两位小数
export const getSaveNumber=(v:any,number:number)=>{
  const value=new BigNumber(v)
  return value.toFixed(number)
}
//更改数字文案
export const numberUnitFormat = (value: any) => {
  if (!value ) {
    return value===0?0:'-'
  }
  const k = 10000
  const sizes = ['', '万', '亿', '万亿']
  const v=new BigNumber(value)
  if ((value < 100000 && value>=0) || (value<0 && value>-2)) {
    return parseFloat(v.toFixed(2))
    // return Math.round(value * 100) / 100
  } else{
    const i: number = Math.floor(Math.log(Math.abs(value)) / (Math.log(k)))
    if(i>3) return v.toFixed(2)
    const values = parseFloat((Math.abs(value) / Math.pow(k, i)).toFixed(2))
    const unit = sizes[i]
    return value>=0?values + unit:'-'+values+unit
  }
}
//价格约分为 小数点非0两位有效数字，但最高不超过小数点后4位(0000)。
export const getVNumber=(value:any,zeroIndex:number,isFour:boolean)=>{
  const v=new BigNumber(value)
  //@ts-ignore
  const intNumber=parseInt(Math.abs(v)).toString().length
  if(isFour){
    return v.precision(intNumber+5).toFixed(5)
  }else{
    if(zeroIndex===0){
      return parseFloat(v.precision(intNumber+4).toFixed(2))
    }else{
      return parseFloat(v.precision(intNumber+4).toFixed(2+(zeroIndex)))
    }
  }
}
//hour 小数后18位数字全展示，18位以后科学技术法
export const getBigNumber=(n:string | number)=>{
  const v=new BigNumber(n)
  const newV=v.toFixed() //科学技术法展开
  if(newV.split('.')[1].length<19) return newV
  else return parseFloat(newV)
}
//数字格式化 约分
export const getRulesNumber=(v:any,isShowAll:boolean)=>{
  if(!v){
    return v?v:v===0?0:'-'
  }
  const bigV=new BigNumber(v)
  if(bigV.toFixed().indexOf('.')<0){
    return v
  }
  const result=getVNumber(v,0,true).toString()
  if(result.split('.')[1].split('0').length-1===5){
    return isShowAll?getBigNumber(v): '<0.00001'   //result等于0.00000
  }else{
    const twoNumber= result.split('.')[1].split('')
    let i=0;
    for (let j=0;j<twoNumber.length;j++){
      if(twoNumber[j]==='0'){
        i++
      }else{
        break
      }
    }
    return getVNumber(result,i,false)
  }
}
//统一用这个 isShowAll 是否展示小于0的数并且小数点后面小于18位或者大于18位带e的科学技术法，用于hovr上
export const formatRulesNumber=(v:any,isShowAll:boolean)=>{
  if(!v){
    return v===0?0:'-'
  }
  const value=new BigNumber(v)
  if(parseFloat(value.toFixed())>1 || parseFloat(value.toFixed())<-1){
    return numberUnitFormat(v)
  }else{
    return getRulesNumber(v,isShowAll)
  }
}
//tipModel单位
export const unitOrder=(v:any,unit:string)=>{
  if(!unit) return formatRulesNumber(v,true)
  if(unit==='$'){
    return  unit+formatRulesNumber(v,true)
  }else{
    return formatRulesNumber(v,true)+unit
  }
}
