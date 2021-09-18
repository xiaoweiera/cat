/**
 * @file 当前语言
 * @author svon.me@gmail.com
 */

import Url from 'url'
import { ref } from 'vue'
import { domain } from '~/lib/config'
import safeSet from '@fengqiaogang/safe-set'
import safeGet from '@fengqiaogang/safe-get'
import { omit } from 'ramda'

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
      const { lang } = data.query || {}
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
  return Language.en // 默认英文
}

// 获取 url 中的 lang 数据
const getQueryLang = function(): Language {
  return getSearch()
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

const setUtmSsource = function(data: any, hostname?: string | null | undefined) {
  if (data) {
    const query = safeGet<object>(data, 'query') || {}
    // 删除
    safeSet(data, 'query', omit(['utm_source'], query))
    if (hostname && hostname === 'localhost') {
      return data
    }
    if (hostname && hostname === '127.0.0.1') {
      return data
    }
    if (hostname && hostname.includes('kingdata')) {
      return data
    }
    if (!hostname) {
      return data
    }
    // 添加
    safeSet(data, 'query.utm_source', encodeURI(domain))
  }
  return data
}

const splitJoin = function(href: string, value?: Language): string {
  // @ts-ignore
  let data = Url.parse(href, true)
  data.search = ''
  safeSet(data, 'query.lang', switchLang(value))
  data = setUtmSsource(data, data.hostname)
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
  let temp: any = {...data}
  safeSet<T>(temp, 'query.lang', switchLang(lang))
  temp = setUtmSsource(data, temp.path)
  return temp
}
