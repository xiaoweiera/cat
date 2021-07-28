/**
 * @file 国际化
 */

import * as R from 'ramda'
import IntlFormat from 'intl-format'
import { watch } from 'vue'
import * as lang from '../lang'
// 中文
import cnLangs from '../../../langs/cn/index'
// 英文
import enLangs from '../../../langs/en/index'

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

type Langs = typeof cnLangs & API

const langs = {
  // 中文
  [lang.Language.cn]: cnLangs,
  // 英文
  [lang.Language.en]: enLangs,
  // cht: zhTWLangs,
}

const format: Langs = IntlFormat.init(lang.current.value, langs) as any

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
      // @ts-ignore
      return format.template(text, mode as Args)
    }
    if (typeof mode === 'number' || typeof mode === 'string') {
      let index = Math.abs(parseFloat(mode as any))
      if (index > 0) {
        index = Math.ceil(index)
      } else {
        index = 0
      }
      return part(text, isNaN(index) ? 0 : index, args || {})
    }
  }
  return format.template(text, {})
}

const app = function() {
  format.setLang(lang.current.value)
}

watch(lang.current, () => {
  app()
})

app()

export default format
