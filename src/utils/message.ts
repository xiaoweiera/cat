/**
 * @file 判断登录
 * @author svon.me@gmail.com
 */
import { ElMessageBox } from 'element-plus'
import I18n from '~/utils/i18n/index'

enum Status {
  Cancel = 'cancel',
  Confirm = 'confirm',
}

interface Content {
  value: string
  warn?: string
  desc?: string
}

const getContent = function(content?: Content | string): string {
  let text = ''
  if (!content) {
    content = ''
  }
  if (typeof content === 'string') {
    content = {
      value: content,
    }
  }
  if (content.value) {
    text += `<p class="text-base font-normal" style="color: rgba(37, 62, 111, 0.85); word-break: break-word; overflow-wrap: break-word;">${content.value}</p>`
  }
  if (content.warn) {
    text += `<p class="text-xs font-normal" style="color: #E9592D; word-break: break-word; overflow-wrap: break-word;">* ${content.warn}</p>`
  }
  if (content.desc) {
    text += `<p class="text-xs font-normal pt-2" style="color: rgba(37, 62, 111, 0.85); word-break: break-word; overflow-wrap: break-word;">${content.desc}</p>`
  }
  return `<div class="text-center">${text}</div>`
}

const app = function(
  title: string,
  content: string,
  type: 'alert' | 'confirm',
): Promise<boolean> {
  const option = {
    customClass: 'directive-message',
    dangerouslyUseHTMLString: true,
    closeOnClickModal: true,
    showConfirmButton: true,
    confirmButtonText: I18n.common.button.confirm,
    showCancelButton: false,
    cancelButtonText: I18n.common.button.close,
    closeOnPressEscape: true,
  }
  if (type === 'confirm') {
    option.showCancelButton = true
  }
  return new Promise((resolve: any) => {
    // @ts-ignore
    option.callback = (status: Status) => {
      if (Status.Cancel === status) {
        resolve(false)
      }
      if (Status.Confirm === status) {
        resolve(true)
      }
    }
    ElMessageBox.alert(content, title || '', option)
  })
}

const message = function(
  title: string,
  content?: Content | string,
): Promise<boolean> {
  if (content) {
    return app(title, getContent(content), 'confirm')
  }
  return app(title, '', 'alert')
}

message.confirm = function(
  title: string,
  content?: Content | string,
): Promise<boolean> {
  return message(title, content)
}

message.alert = function(title: string, content?: Content | string) {
  if (content) {
    return app(title, '', 'alert')
  }
  return app(title, getContent(content), 'alert')
}

message.copy = function(content?: Content | string) {
  return app('', getContent(content), 'alert')
}

export default message
