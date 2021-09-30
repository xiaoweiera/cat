import hmt from '~/lib/hmt'
const clickTypeList = {
  'detail': { name: '池子详情页', key: 'poolsinfo' },
  'my': { name: '池子详情页加自选', key: 'poolsinfo_favorit' },
  'deposit': { name: '池子详情页点击去挖矿', key: 'poolsinfo_deposit' },
  'borrow': { name: '池子详情页点击去借贷', key: 'poolsinfo_borrow' },
  'compare': { name: '池子详情页切换趋势对比', key: 'poolsinfo_trending' },
}
// type 页面  dialogType 弹框类型
export const dialogBaidu = (type: string, dialogType: string, title: string, clickType: any) => {
  console.log(type,dialogType)
  let clickModel
  if(clickType==='go'){
    clickModel=dialogType==='mining'?clickTypeList['deposit']:clickTypeList['borrow']
  }else{
    //@ts-ignore
    clickModel=clickTypeList[clickType]
  }
  if (dialogType === 'mining') {
    hmt.event(`挖矿${clickModel?.name}`, `${type}_${title}_Farm${clickModel?.key}`)
  } else {
    hmt.event(`借贷${clickModel?.name}`, `${type}_${title}_Borrow${clickModel?.key}`)
  }
}