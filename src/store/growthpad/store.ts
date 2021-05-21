/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { reactive } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { getProjectInfo, setAdress } from '~/api/growtask'

interface User {
  reward: number
  invited_count: number
}

export default class Store {
  protected projectName = '' // 项目名称
  // @ts-ignore
  public user: UnwrapNestedRefs<User> // 用户数据
  constructor() {
    this.user = reactive<User>({
      invited_count: 0,
      reward: 0,
    })
  }

  private updateData(result: any) {
    const user: User = safeGet<User>(result, 'info') || {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key in user) {
      // @ts-ignore
      this.user[key] = user[key]
    }
  }

  /**
   * 初始化方法
   */
  async init(type: string): Promise<void> {
    this.projectName = type
    try {
      const result = await getProjectInfo(this.projectName)
      this.updateData(result)
    } catch (e) {
      // todo
    }
  }

  async setAdress(address: string): Promise<any> {
    try {
      const result = await setAdress(this.projectName, address)
      this.updateData(result)
      return result
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
