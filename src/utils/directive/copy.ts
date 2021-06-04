/**
 * @file 复制
 * @author svon.me@gmail.com
 */

import { copyTxt } from '~/lib/tool'

interface Modifiers {
  message?: boolean
}

interface Binding {
  modifiers: Modifiers
  value?: string
  arg?: string
}

const install = function(vue: any) {
  // 添加指令
  vue.directive('copy', (el: HTMLElement, binding: Binding) => {
    const { modifiers } = binding
    el.addEventListener(
      'click',
      (e: Event) => {
        e.stopPropagation()
        e.preventDefault()
        if (typeof binding.value === 'function') {
          const fun = binding.value
          // @ts-ignore
          binding.value = fun()
        }
        const value: string = binding.value || ''

        if (modifiers.message) {
          copyTxt(value, true)
        } else {
          copyTxt(value)
        }
        return false
      },
      true,
    )
  })
}

// @ts-ignore
export default install
