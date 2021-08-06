// @ts-ignore
// import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'
import { createI18n } from '~/lib/vue-i18n.esm-browser'
import { UserModule } from '~/types'
// import 'dayjs/locale/zh-cn'
import ElementPlus from 'element-plus'
import localeCN from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'
import { current } from '~/utils/lang'

// import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../../locales/*.y(a)?ml')).map(
    ([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml
        ? -5
        : -4), value.default]
    },
  ),
)
export const install: UserModule = ({ app }) => {
  // if (current.value === Language.cn) {
  //   messages.cn['el'] = localeCN.el
  //   messages.en['el'] = localeCN.el
  // }
  // if (current.value === Language.en) {
  //   messages.cn['el'] = localeEN.el
  //   messages.en['el'] = localeEN.el
  // }
  messages.cn['el'] = localeCN.el
  messages.en['el'] = localeEN.el
  const i18n = createI18n({
    legacy: false,
    locale: current.value, // zh-CN
    messages,
  })


  app.use(ElementPlus, {i18n: i18n.global.t})
  app.use(i18n)
}
