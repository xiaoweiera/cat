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
        if (Array.isArray(binding.value)) {
          binding.value = binding.value.join(',')
        }
        if (typeof binding.value === 'function') {
          const fun = binding.value
          // @ts-ignore
          binding.value = fun()
        }
        const [value, message]: Array<string> = binding.value
          ? binding.value.split(',')
          : []

        if (modifiers.message) {
          copyTxt(value, message)
        } else {
          copyTxt(value)
        }
        e.stopPropagation()
        e.preventDefault()
      },
      true,
    )
  })
}

export default install
