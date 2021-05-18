/**
 * @file 工具集合
 * @author svon.me@gmail.com
 */

type Callback = () => void

// 防抖节流
export const debounce = function <T>(callback: Callback, time?: number): T {
  if (!time) {
    return callback as any
  }
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this
  let timeout: any
  // @ts-ignore
  return function(...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // @ts-ignore
      return callback.apply(self, args)
    }, time)
  }
}
