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
  const indexof = src.lastIndexOf('.')
  if (indexof !== -1) {
    return src.substring(indexof + 1)
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


// 图片上传
// @ts-ignore
export const uploadImage = LoginStatus(res.image, async(file: File) => {
  const query = new FormData()
  const option: any = await getPolicy()

  const name = getFileName(file)
  const url = `${option.domain}/${option.dir}${name}`
  console.log(url)

  // const key = '${filename}' // 保留原文件名
  const key = `${name}` // 使用随机名称

  query.append('OSSAccessKeyId', option.accessid)
  query.append('callback', option.callback)
  query.append('name', name)
  query.append('success_action_status', '200')
  query.append('key', `${option.dir}${key}`)
  query.append('policy', option.policy)
  query.append('signature', option.signature)
  query.append('file', file)

  try {
    const result = await request.post(option.host, query)
    const status = safeGet<string>(result, 'data.Status')
    if (status === 'ok') {
      return url
    }
  } catch (e) {
    // todo
  }
  return Promise.reject({
    message: I18n.common.api.wrong
  })
})
