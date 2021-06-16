/**
 * @file 资源文件上传
 * @author svon.me@gmail.com
 */
import { last } from 'ramda'
import { res } from './pathname'
import request from '~/lib/service'
import I18n from '~/utils/i18n/index'
import { uuid } from '~/utils/index'
import { LoginStatus } from '~/logic/user/check'
import safeGet from '@fengqiaogang/safe-get'


// 获取文件上传签名
// 接口调用时先判断用户是否登录
export const getPolicy = LoginStatus(res.policy, async () => {
  // 已登录情况下在执行接口请求
  try {
    const response = await request.get(res.policy)
    return safeGet<any>(response, 'data') || {}
  } catch (e) {
    return {}
  }
})

const getSuffix = function(src: string): string {
  const indexOf: number = src.lastIndexOf('.')
  if (indexOf !== -1) {
    const value = src.substring(indexOf + 1)
    // 去掉开头为 . 的字符
    return value.replace(/^\.+/, '')
  }
  return '';
}

const getFileName = function(file: File): string {
  const name: string = file.name
  const arr: string[] = name.split('/')
  const value = last<string>(arr) as any
  const suffix = getSuffix(value)
  const key = uuid()
  return `${key}.${suffix}`
}

const error = {
  message: I18n.common.api.wrong
}

// 图片上传
// @ts-ignore
export const uploadImage = LoginStatus(res.image, async(file: File) => {
  // 获取签名
  const option: any = await getPolicy()
  // 签名为空时
  if (!option.policy) {
    // 提示错误信息
    return Promise.reject(error)
  }
  const query = new FormData()
  // 生成文件名称
  const name = getFileName(file)
  // const key = '${filename}' // 保留原文件名
  const key = `${name}` // 使用随机名称
  query.append('OSSAccessKeyId', option.accessid)
  query.append('callback', option.callback)
  query.append('name', name)
  query.append('success_action_status', '200')
  query.append('key', `${option.dir}${key}`)
  query.append('policy', option.policy)
  query.append('signature', option.signature)
  // file 文件必须放在最后
  query.append('file', file)
  try {
    const result = await request.post(option.host, query)
    const status = safeGet<string>(result, 'data.Status')
    if (status === 'ok') {
      // 拼接资源链接地址
      const url = `${option.domain}/${option.dir}${name}`
      return url
    }
  } catch (e) {
    // todo
  }
  // 提示错误信息
  return Promise.reject(error)
})
