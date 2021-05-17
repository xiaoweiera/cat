/**
 * @file 国际化
 */

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

const intlFormat: Langs = (IntlFormat.init('zh_CN', langs) as any)

export default intlFormat
