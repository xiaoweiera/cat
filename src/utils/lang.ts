/**
 * @file 当前语言
 * @author svon.me@gmail.com
 */

import Url from 'url'
import { ref } from 'vue'
import safeSet from '@fengqiaogang/safe-set'

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

function getSearch(): Language {
  try {
    if (window) {
      // @ts-ignore
      const data = Url.parse(window.location.href, true)
      console.log(data)
      const { lang } = data.query || {}
      console.log(lang)
      if (lang) {
        // @ts-ignore
        const array: string[] = [].concat(lang)
        const value = array[array.length - 1]
        if (value) {
          return value as Language
        }
      }
    }
  } catch (e) {
    // todo
  }
  return Language.cn
}

// 获取 url 中的 lang 数据
// @ts-ignore
const getQueryLang = function(): Language {
  const value = getSearch()
  console.log('value = %s', value)
  return value
}

export const current = ref<Language>(getQueryLang())

export const setCurrent = function(lang: Language): void {
  current.value = lang
}

export const nextLang = function(): Language {
  if (current.value === Language.cn) {
    return Language.en
  }
  return Language.cn
}

const switchLang = function(value?: Language): Language {
  return value || current.value
}

const splitJoin = function(href: string, value?: Language): string {
  // @ts-ignore
  const data = Url.parse(href, true)
  data.search = ''
  data.query.lang = switchLang(value)
  return Url.format(data)
}

interface Params {
  [key: string]: object
}

type Query = string | Params

export const href = function <T>(data: Query, lang?: Language): T {
  if (typeof data === 'string') {
    return splitJoin(data, lang) as any
  }
  return safeSet<T>(data, 'query.lang', switchLang(lang))
}
