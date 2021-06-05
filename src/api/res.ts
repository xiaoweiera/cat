/**
 * @file 资源文件上传
 * @author svon.me@gmail.com
 */

import { res } from './pathname'
import request from '~/lib/service'
import { LoginStatus } from '~/logic/user/check'

// 图片上传
export const uploadImage = LoginStatus(res.image, async(file: File) => {
  const query = new FormData()
  query.append('image', file)
  try {
    const result = await request.post(res.image, query)
    const data = result?.data || {}
    if (data?.code === 0) {
      return data.url
    }
  } catch (e) {
    // todo
  }
  return ''
})
