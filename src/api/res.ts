/**
 * @file 资源文件上传
 * @author svon.me@gmail.com
 */
import I18n from '~/utils/i18n/index'
import { last } from 'ramda'
import { res } from './pathname'
import request from '~/lib/service'
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

const getFileName = function(file: File): string {
  const name: string = file.name
  const arr: string[] = name.split('/')
  return last<string>(arr) as any
}
// @ts-ignore
const getSuffix = function(src: string): string {
  const indexof = src.lastIndexOf('.')
  if (indexof !== -1) {
    return src.substring(indexof)
  }
  return '';
}

// 图片上传
// @ts-ignore
export const uploadImage = LoginStatus(res.image, async(file: File) => {
  const query = new FormData()
  const option: any = await getPolicy()
  const key = '${filename}'
  query.append('OSSAccessKeyId', option.accessid)
  query.append('callback', option.callback)
  query.append('name', getFileName(file))
  query.append('success_action_status', '200')
  query.append('key', `${option.dir}${key}`)
  query.append('policy', option.policy)
  query.append('signature', option.signature)
  query.append('file', file)

  try {
    const result = await request.post(option.host, query)
    console.log(result)
    // const data = result?.data || {}
    // if (data?.code === 0) {
    //   return data.url
    // }
  } catch (e) {
    // todo
  }
  return Promise.reject({
    message: I18n.common.api.wrong
  })
})
