/**
 * @file 判断登录
 * @author svon.me@gmail.com
 */

import { ElMessageBox } from 'element-plus'

enum Status {
  Cancel = 'cancel',
  Confirm = 'confirm',
}

const option = {
  customClass: 'directive-message',
  dangerouslyUseHTMLString: true,
  closeOnClickModal: true,
  showConfirmButton: true,
  confirmButtonText: '确认',
  showCancelButton: true,
  cancelButtonText: '取消',
  closeOnPressEscape: true,
}

interface Content {
  value: string
  warn?: string
}

const message = function(
  title = '',
  content: Content | string,
): Promise<boolean> {
  let text = ''
  if (typeof content === 'string') {
    content = {
      value: content,
    }
  }
  if (content.value) {
    text += `<p class="text-base font-normal" style="color: rgba(37, 62, 111, 0.85);">${content.value}</p>`
  }
  if (content.warn) {
    text += `<p class="text-xs font-normal" style="color: #E9592D;">*${content.warn}</p>`
  }
  return new Promise((resolve) => {
    const setting: any = {
      ...option,
      callback: (status: Status) => {
        if (Status.Cancel === status) {
          resolve(false)
        }
        if (Status.Confirm === status) {
          resolve(true)
        }
      },
    }
    ElMessageBox.alert(`<div>${text}</div>`, title, setting)
  })
}

export default message
