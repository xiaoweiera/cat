/**
 * 处理 input 时时输入时的内容
 * @param keywordName 返回数据时搜索框中值对应的键名
 */

import safeGet from '@fengqiaogang/safe-get'
import { Info, Mission, MissionStatus } from './props'
import { setProjectUserInfo } from '~/api/growtask'
import { messageError } from '~/lib/tool'
import { inputBeautify } from '~/utils/index'

interface Query {
  [key: string]: any
}



export const postInfo = function(key: string) {
  return function(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) {
    const fun = descriptor.value
    descriptor.value = async function <T>(value: string): Promise<T> {
      const self = this
      // 取消定时器
      // @ts-ignore
      this.clearTimeout()
      // 项目名称
      // @ts-ignore
      const project = this.getNickName()
      // 需要提交的数据
      const data: Query = {}
      data[key] = inputBeautify(value)
      // 将结果传递给原方法
      try {
        const temp = await Promise.resolve(fun.call(self, value, data))
        if (temp) {
          Object.assign(data, temp)
        }
        // @ts-ignore
        const mission: Mission = this.mission
        // @ts-ignore
        if (mission[key]) {
          // @ts-ignore
          mission[key] = MissionStatus.loading // 设置对应任务为检测中状态
        }
        const result: any = await setProjectUserInfo(project, data)
        const code = safeGet<number>(result, 'data.code')
        if (code === 0) {
          // @ts-ignore
          this.updateData(result) // 更新数据
        } else {
          const message = safeGet<string[]>(result, 'data.message')
          messageError(message)
          // @ts-ignore
          this.init() // 刷新一次数据
        }
        return result as any
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}

export const postInfoBasis = function(key = 'bsc') {
  return function(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) {
    const fun = descriptor.value
    descriptor.value = async function <T>(
      value: string,
      data: Query,
    ): Promise<T> {
      // @ts-ignore
      const info: Info = this.info
      const address = inputBeautify(info.bsc)
      data[key] = address
      try {
        const result = await Promise.resolve(fun.call(this, value, data))
        if (result) {
          return result
        }
        return data as T
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}
