/**
 * @file 数据转换
 * @author svon.me@gmail.com
 */

import safeSet from '@fengqiaogang/safe-set'
import { forEach, dateMDFormat } from '~/utils/index'


// 转换时间格式数据
export const convertDate = function(list: Array<number[]>) {
  const xAxis: string[] = []
  const series: Array<number[]> = []
  // @ts-ignore
  forEach(function(item: number[], length: number): void {
    const time = item[0]
    xAxis.push(dateMDFormat(time))
    for (let i = 1, len = item.length; i < len; i++) {
      const index = i - 1
      const value = item[i]
      // @ts-ignore
      safeSet(series, `[${index}][${length}]`, value)
    }
  }, list)
  return { xAxis, series }
}
