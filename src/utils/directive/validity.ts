/**
 * @file 活动判断
 * @author svon.me@gmail.com
 */

import safeSet from '@fengqiaogang/safe-set'
import activity from '~/logic/growthpad/activity'
import * as event from '~/utils/event/index'

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
  const eventName = 'click'
  // 添加指令
  vue.directive('validity', {
    created: (el: HTMLElement, binding: Binding, vNode: any) => {
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
      const click = function(e: Event) {
        const status = activity(store as any)
        if (status) {
          return true
        }
        e.stopPropagation()
        e.preventDefault()
      }
      // 绑定事件
      event.bind(vNode, eventName, click, true)
    },
    beforeUnmount: function(el: HTMLElement, binding: Binding, vNode: any) {
      // 删除事件
      event.unbind(vNode, eventName, true)
    }
  })
}

export default install
