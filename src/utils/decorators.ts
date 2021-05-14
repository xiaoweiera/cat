/**
 * @file 装饰器
 * @author svon.me@gmail.com
 */

import * as _ from './index'

// 防抖节流
export const debounce = function<T>(time: 600): T {
  // @ts-ignore
  return function(target: () => T) {
    //
  }
}
