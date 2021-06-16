// 校验规则

import { inputBeautify } from '~/utils/index'

const rules: any = {
  input: [
    {
      required: true,
      trigger: ['blur', 'change'],
    },
    {
      trigger: ['blur', 'change'],
      validator: function(rule: any, value: string, callback: (message?: any) => void) {
        const text = inputBeautify(value)
        if (text) {
          return callback()
        } else {
          callback({
            message: 'error'
          })
        }
      }
    },
  ],
}

export default rules
