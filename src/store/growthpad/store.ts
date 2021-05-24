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
  setPancake,
  setSushiswap,
  setTelegram,
  setTwitter,
  setUniswap,
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
  pancake_token: string // pancake  token地址
  uniswap_token: string // uniswap  token地址
  sushiswap_token: string // sushiswap  token地址
  twitter: string // twitter id
  telegram: string // telegram id
}

interface Mission {
  pancake: boolean // pancake验资是否通过
  uniswap: boolean // uniswap验资是否通过
  sushiswap: boolean // sushiswap验资是否通过
  retweet: boolean // 是否转发推特
  follow_twitter: boolean // 是否关注推特
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
    pancake_token: '', // pancake  token地址
    uniswap_token: '', // uniswap  token地址
    sushiswap_token: '', // sushiswap  token地址
    twitter: '', // twitter id
    telegram: '', // telegram id
  })

  // 完成状态
  public mission = reactive<Mission>({
    pancake: false, // pancake验资是否通过
    uniswap: false, // uniswap验资是否通过
    sushiswap: false, // sushiswap验资是否通过
    retweet: false, // 是否转发推特
    follow_twitter: false, // 是否关注推特
  })

  public article_url = ref<string>('article_url') // 用户上传的文章链接
  public article_image = ref<string>('') // 用户上传的图片
  public article_audit = ref<boolean>(false) // 用户文章审核状态

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
    const mission: Mission = safeGet<Mission>(result, 'mission')
    // 更新 info 信息
    if (user) {
      this.user.invited_count = user.invited_count as number
      this.user.reward = user.reward as number
      this.user.bsc_token = user.bsc_token as string
      this.user.pancake_token = user.pancake_token
      this.user.sushiswap_token = user.sushiswap_token
      this.user.uniswap_token = user.uniswap_token
      this.user.twitter = user.twitter
      this.user.telegram = user.telegram
    }
    if (mission) {
      this.mission.follow_twitter = !!mission.follow_twitter
      this.mission.retweet = !!mission.retweet
      this.mission.pancake = !!mission.pancake
      this.mission.uniswap = !!mission.uniswap
      this.mission.sushiswap = !!mission.sushiswap
    }
    this.article_audit.value = !!safeGet(result, 'article_audit')
    this.article_image.value = safeGet<string>(result, 'article_image')
    this.article_url.value = safeGet<string>(result, 'article_url')
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

  // 设置 pancake
  async setPancake(value: string): Promise<void> {
    this.clearTimeout()
    try {
      const token = this.user.bsc_token
      const result = await setPancake(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 uniswap
  async setUniswap(value: string): Promise<void> {
    this.clearTimeout()
    try {
      const token = this.user.bsc_token
      const result = await setUniswap(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 sushiswap
  async setSushiswap(value: string): Promise<void> {
    this.clearTimeout()
    try {
      const token = this.user.bsc_token
      const result = await setSushiswap(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }
}
