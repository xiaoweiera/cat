/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import * as R from 'ramda'
import { reactive } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import {
  getProjectInfo,
  setAdress,
  setTelegram,
  setTwitter,
} from '~/api/growtask'

interface User {
  reward: number
  invited_count: number
}

export default class Store {
  protected projectName = '' // 项目名称
  // @ts-ignore
  public user: UnwrapNestedRefs<User> // 用户数据
  constructor(type: string) {
    this.projectName = type
    this.user = reactive<User>({
      invited_count: 0,
      reward: 0,
    })
  }

  protected getNickName(): string {
    return this.projectName ? R.toUpper(this.projectName) : ''
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
  async init(): Promise<void> {
    try {
      const result = await getProjectInfo(this.projectName)
      this.updateData(result)
    } catch (e) {
      // todo
    }
  }

  // 设置合约地址
  async setAdress(address: string): Promise<any> {
    try {
      const result = await setAdress(this.projectName, address)
      this.updateData(result)
      return result
    } catch (e) {
      return Promise.reject(e)
    }
  }

  // 设置 telegram id
  async setTelegram(id: string): Promise<any> {
    try {
      const token = this.user.bsc_token
      const result = await setTelegram(this.projectName, token, id)
      this.updateData(result)
      return result
    } catch (e) {
      return Promise.reject(e)
    }
  }

  // 设置 twitter id
  async setTwitter(id: string): Promise<any> {
    try {
      const token = this.user.bsc_token
      const result = await setTwitter(this.projectName, token, id)
      this.updateData(result)
      return result
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async setReTwitter(id: string): Promise<any> {
    return this.setTwitter(id)
  }
}
