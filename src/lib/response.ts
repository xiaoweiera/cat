/**
 * @file API 响应结果校验
 */
//@ts-ignore
import safeGet from '@fengqiaogang/safe-get'

// 判断状态码
export const check = function<T>(result: any): T {
  const code = safeGet<number>(result, 'data.code')
  if (code === 0) {
    return safeGet<T>(result, 'data.data')
  }
  return safeGet<T>(result, 'data')
}
export const asyncCheck = async function<T>(result: any): Promise<T> {
  const data = await Promise.resolve(result)
  return check(data)
}
