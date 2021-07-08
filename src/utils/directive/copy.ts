/**
 * @file 复制
 * @author svon.me@gmail.com
 */

import { is } from 'ramda'
import { copyTxt } from '~/lib/tool'
import * as event from '~/utils/event/index'

interface Modifiers {
  message?: boolean
}

interface Binding {
  modifiers: Modifiers
  value?: string
  arg?: string
}

const install = function(vue: any) {
  const eventName = 'click'
  // 添加指令
  vue.directive('copy', (el: HTMLElement, binding: Binding, vNode: any) => {
    const { modifiers } = binding

    const app = async function(value: string | any, alert: boolean) {
      if (typeof is(Function, value)) {
        try {
          const res = await Promise.resolve(value())
          if (res) {
            copyTxt(res, !!alert)
          }
        } catch (e) {
          // todo
        }
      }
      else if (value) {
        copyTxt(value, !!alert)
      }
    }

    const click = function(e: Event) {
      event.stop(e)
      event.prevent(e)
      return app(binding.value, !!modifiers.message)
    }
    event.bind(vNode, eventName, click, true)
  })
}

// @ts-ignore
export default install
