/**
 * @file API 响应结果校验
 */
import safeGet from '@fengqiaogang/safe-get'

// 判断状态码
export const check = function<T>(result: any): T | undefined {
  const code = safeGet<number>(result, 'data.code')
  if (code === 0) {
    return safeGet<T>(result, 'data.data')
  }
  return void 0
}
