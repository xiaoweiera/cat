export const numberFormat = (value: any,noUnit:any) => {
  if (!value) {
    return null;
  }
  let k = 10000,
      sizes = ["", "万", "亿", "万亿"],
      i;
  if (value < k) {
    return parseFloat(value).toFixed(2)
  }
  i = Math.floor(Math.log(value) / Math.log(k));
  let values = parseFloat((value / Math.pow(k, i)).toFixed(2))
  let unit = sizes[i]
  let v=noUnit?values + unit:'$' + values + unit
  return v
}
// 保留两位
// export const numberTwo = (value: any) => {
//   if (!value) {
//     return ''
//   }
//   else {
//     return value.toFixed(2) + '%'
//   }
// }
export const toFixedNumber = (value: any, rounded = 2) => {
  if (!value) {
    return ''
  }
  return Number(value).toFixed(rounded)
}

export const percent2Precision = (value: any): String => {
  if (!value) {
    return ''
  }
  return `${toFixedNumber(value)}%`
}

// 数字正负判断
export const numColor = (value: any) => {
  if (!value) {
    return '+0'
  }
  else if (value >= 0) {
    return '+' + value
  }
  else {
    return value
  }
}


