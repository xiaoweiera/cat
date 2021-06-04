/**
 * @file 活动判断
 * @author svon.me@gmail.com
 */

import safeSet from '@fengqiaogang/safe-set'
import activity from '~/logic/growthpad/activity'

interface Modifiers {
  begin?: boolean
  end?: boolean
}

interface Binding {
  modifiers: Modifiers
  value?: string
  arg?: string
}

const install = function(vue: any) {
  // console.log(1)
  // 添加指令
  vue.directive('validity', (el: HTMLElement, binding: Binding) => {
    const { modifiers } = binding
    const store = {}
    if (Array.isArray(binding.value)) {
      binding.value = binding.value.join(',')
    }
    const [begin, end]: Array<string> = binding.value
      ? binding.value.split(',')
      : []
    if (modifiers.begin) {
      safeSet(store, 'dashboard.begin', begin)
    }
    if (modifiers.end) {
      safeSet(store, 'dashboard.end', end)
    }
    el.addEventListener(
      'click',
      (e: Event) => {
        const status = activity(store as any)
        if (status) {
          return true
        }
        e.stopPropagation()
        e.preventDefault()
      },
      true,
    )
  })
}

export default install
