/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { reactive, ref } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import mockMdx from '../../../mock/growthpad/mdx'
import {
  getProjectInfo,
  getProjectType,
  Project,
  setAdress,
  setTelegram,
  setTwitter,
  setWeiboContent,
} from '~/api/growtask'
import TaskType from '~/logic/growthpad/tasktype'

interface DashboardData {
  begin?: string // 开始时间
  end?: string // 结束时间
  description?: string // 说明
  rewardCount?: number // 总奖励数量
  rewardLimit?: number[] // 个人奖励范围
}

interface Minutia {
  label: string
  value: string | number
}

interface AboutData {
  website?: string
  detail?: string
  minutias: Array<Minutia>
}

interface Tooltip {
  icon?: string // icon
  value: string // 展示信息
  href?: string // 跳转地址
}

interface TaskItem {
  id?: string // 任务ID
  type: TaskType // 任务类型
  title: string
  description?: string
  reward: number[] // 奖励
  help?: string // 帮助信息
  tooltip?: Tooltip
  children?: Array<TaskItem>
}

interface User {
  reward: number // 用户当前获得的奖金
  invited_count: number // 用户邀请参与活动的数量
  bsc_token: string // 领取奖励的地址
}

export default class Store {
  // @ts-ignore
  protected projectName: Project // 项目名称
  protected title = ref<string>('') // title
  protected icon = ref<string>('') // icon
  // 首屏数据
  protected dashboard = reactive<DashboardData>({})
  // 项目介绍
  protected about = reactive<AboutData>({
    minutias: [],
  })

  // 任务列表
  protected taskList = ref<TaskItem[]>([])
  // 个人信息, 用户数据
  public user = reactive<User>({
    invited_count: 0,
    reward: 0,
    bsc_token: '',
  })

  private timeout: any = 0

  // 构造方法
  constructor(type: string) {
    if (type && getProjectType(type) === Project.mdx) {
      this.projectName = Project.mdx
      this.setInitData(mockMdx)
    }
  }

  private clearTimeout(): void {
    clearTimeout(this.timeout)
  }

  // 设置基础数据
  private setInitData(data: any) {
    this.title.value = data.title
    this.icon.value = data.icon
    // dashboard 数据
    this.dashboard.begin = data.dasboard.begin
    this.dashboard.end = data.dasboard.end
    this.dashboard.description = data.dasboard.description
    this.dashboard.rewardCount = data.dasboard.reward.count
    this.dashboard.rewardLimit = data.dasboard.reward.limits
    // about 数据
    this.about.website = data.about.website
    this.about.detail = data.about.detail
    for (const item of data.about.minutias) {
      const minutia: Minutia = {
        label: item.label,
        value: item.value,
      }
      this.about.minutias.push(minutia)
    }

    // 任务列表
    this.taskList.value = data.taskList
  }

  protected getNickName(): Project {
    // return this.projectName ? R.toUpper(this.projectName) : ''
    return this.projectName
  }

  private updateData(result?: any) {
    const user: User = safeGet<User>(result, 'info')
    // 更新 info 信息
    if (user) {
      this.user.invited_count = user.invited_count
      this.user.reward = user.reward
      this.user.bsc_token = user.bsc_token
    }
    // this.timeout = setTimeout(() => {
    //   this.init()
    // }, 1000 * 5)
  }

  /**
   * 初始化方法
   */
  async init(): Promise<void> {
    this.clearTimeout()
    try {
      const result = await getProjectInfo(this.projectName)
      this.updateData(result)
    } catch (e) {
      // this.updateData({
      //   info: {
      //     reward: 0,
      //     invited_count: 0,
      //     bsc_token: '123456',
      //   },
      // })
      this.updateData()
    }
  }

  // 设置合约地址
  async setAdress(address: string): Promise<any> {
    this.clearTimeout()
    try {
      const result = await setAdress(this.projectName, address)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 telegram id
  async setTelegram(id: string): Promise<any> {
    this.clearTimeout()
    try {
      const token = this.user.bsc_token
      const result = await setTelegram(this.projectName, token, id)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 twitter id
  async setTwitter(id: string): Promise<any> {
    this.clearTimeout()
    try {
      const token = this.user.bsc_token
      const result = await setTwitter(this.projectName, token, id)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 转发 twitter
  async setReTwitter(id: string): Promise<any> {
    return this.setTwitter(id)
  }

  // 发布微博
  async setWeiboContent(form: FormData): Promise<void> {
    this.clearTimeout()
    try {
      const result = await setWeiboContent(this.projectName, form)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }
}
