/**
 * @file 国际化
 */

import * as R from 'ramda'
import IntlFormat from 'intl-format'
import zhCNLangs from '../../../langs/zh_CN/index'

// const LangEnum = {
//   zh_CN: 'zh_CN',
//   en_US: 'en_US',
//   zh_TW: 'zh_TW',
// }

interface Args {
  [key: string]: any
}

interface API {
  /**
   * 初始化对应语言
   * @param lang: 对应语言
   * @param metas: 所有语言的语言文件
   */
  init(lang: string, metas: object): API
  /**
   * 设置对应语言
   * @param lang: 切换的对应语言
   */
  setLang(lang: string): void
  /**
   * 模板填充, 获取对应语言的模板值
   * @param template: 对应语言的模板
   * @param args: 模板的参数
   */
  template(str: string, args: Args): string
  /**
   * 模版分词
   * @param text
   * @param mode
   * @param args
   */
  part(text: string, mode?: number, args?: Args): string
  /**
   * 获取对应语言的值
   * @param name: 对应语言的模板的 Key
   * @param options: 模板的参数
   */
  get(name: string, args?: Args): string
}

type Langs = typeof zhCNLangs & API

const langs = {
  zh_CN: zhCNLangs,
}

const format: Langs = IntlFormat.init('zh_CN', langs) as any

const part = function(text: string, mode: number, args: Args): string {
  const array = R.map(R.trim, R.split('|', text))
  const size = R.length(array)
  let value = array[mode]
  // 如果下标大于分词数量，则以最后一个为准
  if (!value && mode >= size) {
    value = array[size - 1]
  }
  return format.template(value, args)
}

// @ts-ignore
format.part = function(text: string, mode?: number, args?: Args) {
  if (mode || mode === 0) {
    if (mode && typeof mode === 'object') {
      return format.template(text, mode as Args)
    }
    if (typeof mode === 'number' || typeof mode === 'string') {
      const index = parseInt(mode as any, 10)
      return part(text, isNaN(index)
        ? 0
        : index, args || {})
    }
  }
  return format.template(text, {})
}

export default format
