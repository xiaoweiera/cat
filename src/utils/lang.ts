/**
 * @file 当前语言
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import * as R from 'ramda'

export enum Language {
  auto = 'auto', // 自动检测
  cn = 'cn', // 中文
  en = 'en', // 英语
  yue = 'yue', // 粤语
  wyw = 'wyw', // 文言文
  jp = 'jp', // 日语
  kor = 'kor', // 韩语
  fra = 'fra', // 法语
  spa = 'spa', // 西班牙语
  th = 'th', // 泰语
  ara = 'ara', // 阿拉伯语
  ru = 'ru', // 俄语
  pt = 'pt', // 葡萄牙语
  de = 'de', // 德语
  it = 'it', // 意大利语
  el = 'el', // 希腊语
  nl = 'nl', // 荷兰语
  pl = 'pl', // 波兰语
  bul = 'bul', // 保加利亚语
  est = 'est', // 爱沙尼亚语
  dan = 'dan', // 丹麦语
  fin = 'fin', // 芬兰语
  cs = 'cs', // 捷克语
  rom = 'rom', // 罗马尼亚语
  slo = 'slo', // 斯洛文尼亚语
  swe = 'swe', // 瑞典语
  hu = 'hu', // 匈牙利语
  cht = 'cht', // 繁体中文
  vie = 'vie', // 越南语
}

function getSearch(): string {
  try {
    if (window) {
      const search = window.location?.search
      return search ? search.slice(1) : ''
    }
  } catch (e) {
    // todo
  }
  return ''
}

// 获取 url 中的 lang 数据
// @ts-ignore
const getQueryLang = function(): Language {
  const map = new Map<string, Language>()
  // @ts-ignore
  // eslint-disable-next-line no-restricted-syntax
  for (const name in Language) {
    const key = name as string
    // @ts-ignore
    const value: Language = Language[name]
    map.set(key, value)
  }
  let type: Language = Language.cn
  const search = getSearch()
  if (search) {
    const array = R.split('&', search)
    for (let i = 0, len = R.length(array); i < len; i++) {
      const list = R.split('=', array[i])
      const value = list[1]
      if (value && map.has(value)) {
        type = map.get(value) || Language.cn
        break
      }
    }
  }
  return type
}

export const current = ref<Language>(getQueryLang())

export const setCurrent = function(lang: Language): void {
  current.value = lang
}
