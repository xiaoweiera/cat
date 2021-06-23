/**
 * @file 工具集合
 * @author svon.me@gmail.com
 */

import { trim } from 'ramda'
//@ts-ignore
import { v1 as uuidV1, v4 as uuidV4 } from 'uuid'

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
  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // @ts-ignore
      return callback.apply(self, args)
    }, time)
  }
}

export const toFixed = function (value: string | number, fixed = 2): number {
  const text = String(value)
  const [num1, num2 = ''] = text.split('.')
  let temp = parseFloat(num1)
  if (num2) {
    temp = parseFloat(`${num1 || 0}.${num2.slice(0, fixed)}`)
  }
  if (isNaN(temp)) {
    return 0
  }
  return temp
}

export const toNumber = function (value: string | number, fixed = 2): number {
  const number = parseFloat(value as any)
  if (isNaN(number)) {
    return 0
  }
  return toFixed(number, fixed)
}

export const inputBeautify = function(value: string): string {
  // 去掉前后空格
  let text = trim(value) || ''
  // 首字母如果是 @ 符合，则去掉
  text = text.replace(/^@+/i, '')
  return trim(text)
}

export const formatCash = function (value: string | number): string {
  const number = `${toNumber(value)}`
  const text = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return text
}

// 生成唯一ID
export const uuid = function(): string {
  function create(): string {
    if (Math.random() > 0.5) {
      return uuidV1();
    }
    return uuidV4();
  }

  const app = function(): string {
    const value = create();
    const id = value.replace(/-/g, '');
    return id;
  };
  return app()
}

export const isHttp = function(value: string): boolean {
  if (value) {
    if (/^http/.test(value)) {
      return true
    }
    if (/^\//.test(value)) {
      return true
    }
    const list = value.split('/')
    if (list.length >= 2) {
      return true
    }
  }
  return false;
}
