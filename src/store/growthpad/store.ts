/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { reactive, ref } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'
import mockMdx from '../../../mock/growthpad/mdx'
import mockChannels from '../../../mock/growthpad/channels'
import mockCoinWind from '../../../mock/growthpad/coinwind'
import { isLogin } from '~/logic/user/login'
import * as API from '~/api/growtask'
import TaskType from '~/logic/growthpad/tasktype'

interface Minutia {
  label: string
  value: string | number
}

interface DashboardData {
  banner: string // banner
  begin?: string // 开始时间
  end?: string // 结束时间
  description?: string // 说明
  rewardCount?: number // 总奖励数量
  rewardLimit?: number[] // 个人奖励范围
}
interface ShareItem {
  icon: string
  href: string
}

interface AboutData {
  website?: string
  detail?: string
  minutias: Array<Minutia>
  share: Array<ShareItem>
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
  titleAfter?: string
  description?: string
  reward: number[] // 奖励
  help?: string // 帮助信息
  tooltip?: Tooltip
  children?: Array<TaskItem>
}

interface User {
  bsc_token: string // 领取奖励的地址
  pancake_token: string // pancake  token地址
  uniswap_token: string // uniswap  token地址
  sushiswap_token: string // sushiswap  token地址
  twitter: string // twitter id
  telegram: string // telegram id

  autofarm_token: string // autofarm token 地址
  belt_token: string // belt.fit token 地址

  weibo: string // 微博昵称
  venus_token: string // venus token 地址
  cream_token: string // cream token 地址
  compound_token: string // compound token 地址
  bunny_token: string // bunny token 地址
}

interface Mission {
  pancake: boolean // pancake验资是否通过
  uniswap: boolean // uniswap验资是否通过
  sushiswap: boolean // sushiswap验资是否通过
  retweet: boolean // 是否转发推特
  follow_twitter: boolean // 是否关注推特
  telegram_group: boolean // 电报群

  autofarm: boolean // autofarm
  belt: boolean // belt.fit

  follow_weibo: boolean // 是否关注微博

  venus: boolean // venus 验资
  compound: boolean // compound 验资
  cream: boolean // cream 验资

  bunny: boolean
}

class Store {
  protected token = ''
  protected shareCode = ref<string>('')
  private intervalTime = 10000
  // 当前币价
  protected price = ref<string | number>(0)
  // 用户活动的奖励
  protected reward = ref<string | number>(0)
  // 用户要求参与活动的数量
  protected invited_count = ref<number>(0)
  // 当前项目用户要求参与活动的数量
  protected project_invited_count = ref<number>(0)
  // @ts-ignore
  protected projectName: API.Project // 项目名称
  protected title = ref<string>('') // title
  protected icon = ref<string>('') // icon
  // 首屏数据
  protected dashboard = reactive<DashboardData>({
    banner: '',
  })

  // 项目介绍
  protected about = reactive<AboutData>({
    minutias: [],
    share: [],
  })

  // 任务列表
  protected taskList = ref<TaskItem[]>([])
  // 个人信息, 用户数据
  public user = reactive<User>({
    bsc_token: '',
    pancake_token: '', // pancake  token地址
    uniswap_token: '', // uniswap  token地址
    sushiswap_token: '', // sushiswap  token地址
    twitter: '', // twitter id
    telegram: '', // telegram id
    autofarm_token: '', // autofarm token 地址
    belt_token: '', // belt.fit token 地址
    weibo: '', // 微博昵称
    venus_token: '', // venus token 地址
    cream_token: '', // cream token 地址
    compound_token: '', // compound token 地址
    bunny_token: '', // bunny token 地址
  })

  // 完成状态
  public mission = reactive<Mission>({
    pancake: false, // pancake验资是否通过
    uniswap: false, // uniswap验资是否通过
    sushiswap: false, // sushiswap验资是否通过
    retweet: false, // 是否转发推特
    follow_twitter: false, // 是否关注推特
    telegram_group: false, // 电报群
    autofarm: false, // autofarm
    belt: false, // belt.fit
    follow_weibo: false, // 是否关注微博
    venus: false, // venus 验资
    compound: false, // compound 验资
    cream: false, // cream 验资
    bunny: false, // bunny 验资料
  })

  public article_url = ref<string>('article_url') // 用户上传的文章链接
  public article_image = ref<string>('') // 用户上传的图片
  public article_audit = ref<boolean>(false) // 用户文章审核状态
  public article_reward = ref<number>(0) // 用户文章的奖励

  private timeout: any = 0

  // 构造方法
  constructor(type: string) {
    if (type && API.getProjectType(type) === API.Project.mdx) {
      this.projectName = API.Project.mdx
      this.shareCode.value = '-G1'
      this.setInitData(mockMdx)
    } else if (type && API.getProjectType(type) === API.Project.channels) {
      this.projectName = API.Project.channels
      this.shareCode.value = '-G3'
      this.setInitData(mockChannels)
    } else if (type && API.getProjectType(type) === API.Project.coinwind) {
      this.projectName = API.Project.coinwind
      this.shareCode.value = '-G2'
      this.setInitData(mockCoinWind)
    }
  }

  private clearTimeout(): void {
    clearTimeout(this.timeout)
  }

  // 设置基础数据
  private setInitData(data: any) {
    this.token = data.token as string
    this.title.value = data.title
    this.icon.value = data.icon
    // dashboard 数据
    this.dashboard.banner = data.dashboard.banner
    this.dashboard.begin = data.dashboard.begin
    this.dashboard.end = data.dashboard.end
    this.dashboard.description = data.dashboard.description
    this.dashboard.rewardCount = data.dashboard.reward.count
    this.dashboard.rewardLimit = data.dashboard.reward.limits
    // about 数据
    this.about.website = data.about.website
    this.about.detail = data.about.detail
    this.about.share = data.about.share
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

  protected getNickName(): API.Project {
    return this.projectName
  }

  private updateData(result?: any) {
    const user: User = safeGet<User>(result, 'info')
    const mission: Mission = safeGet<Mission>(result, 'mission')
    if (result?.price) {
      this.price.value = result.price
    }
    this.reward.value = result?.reward || 0
    this.invited_count.value = result?.invited_count || 0
    this.project_invited_count.value = result?.project_invited_count || 0
    // 更新 info 信息
    if (user) {
      this.user.bsc_token = user.bsc_token as string
      this.user.pancake_token = user.pancake_token
      this.user.sushiswap_token = user.sushiswap_token
      this.user.uniswap_token = user.uniswap_token
      this.user.twitter = user.twitter
      this.user.telegram = user.telegram
      this.user.autofarm_token = user.autofarm_token
      this.user.belt_token = user.belt_token
      this.user.weibo = user.weibo
      this.user.venus_token = user.venus_token
      this.user.cream_token = user.cream_token
      this.user.compound_token = user.compound_token
      this.user.bunny_token = user.bunny_token
    }
    if (mission) {
      this.mission.follow_twitter = !!mission.follow_twitter
      this.mission.retweet = !!mission.retweet
      this.mission.pancake = !!mission.pancake
      this.mission.uniswap = !!mission.uniswap
      this.mission.sushiswap = !!mission.sushiswap
      this.mission.telegram_group = !!mission.telegram_group
      this.mission.autofarm = !!mission.autofarm
      this.mission.belt = !!mission.belt
      this.mission.follow_weibo = !!mission.follow_weibo
      this.mission.venus = !!mission.venus // venus 验资
      this.mission.compound = !!mission.compound // compound 验资
      this.mission.cream = !!mission.cream // cream 验资
      this.mission.bunny = !!mission.bunny
    }
    this.article_audit.value = !!safeGet(result, 'article_audit')
    this.article_image.value = safeGet<string>(result, 'article_image')
    this.article_url.value = safeGet<string>(result, 'article_url')
    this.article_reward.value = safeGet<number>(result, 'article_reward') || 0

    // 自动刷新逻辑
    const keys: string[] = Object.keys(result)
    if (keys.length > 1) {
      // 定时刷新
      let time: number
      if (isLogin.value) {
        time = parseInt(this.getIntervalTime() as any)
      } else {
        time = parseInt((this.getIntervalTime() / 2) as any)
      }
      if (time < 3000 || isNaN(time)) {
        time = 3000
      }
      this.timeout = setTimeout(() => {
        return this.init()
      }, time)
    }
  }

  setIntervalTime(time: number): void {
    this.intervalTime = time
  }

  getIntervalTime(): number {
    return this.intervalTime
  }

  /**
   * 初始化方法
   */
  async init(): Promise<void> {
    this.clearTimeout()
    const result = await API.getProjectInfo(this.projectName)
    this.updateData(result)
  }

  // 设置合约地址
  async setAdress(address: string): Promise<any> {
    this.clearTimeout()
    try {
      this.user.bsc_token = address
      const result = await API.setAdress(this.projectName, address)
      // 默认设置地址返回值
      safeSet(result, 'info.bsc_token', address)
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
      this.user.telegram = id
      const token = this.user.bsc_token
      const result = await API.setTelegram(this.projectName, token, id)
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
      this.user.twitter = id
      const token = this.user.bsc_token
      const result = await API.setTwitter(this.projectName, token, id)
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
      const result = await API.setWeiboContent(this.projectName, form)
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
      this.user.pancake_token = value
      const token = this.user.bsc_token
      const result = await API.setPancake(this.projectName, token, value)
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
      this.user.uniswap_token = value
      const token = this.user.bsc_token
      const result = await API.setUniswap(this.projectName, token, value)
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
      this.user.sushiswap_token = value
      const token = this.user.bsc_token
      const result = await API.setSushiswap(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置微博名称
  async setSinaNickname(value: string): Promise<void> {
    this.clearTimeout()
    try {
      this.user.weibo = value
      const token = this.user.bsc_token
      const result = await API.setSinaNickname(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 venus
  async setVenus(value: string): Promise<void> {
    this.clearTimeout()
    try {
      this.user.venus_token = value
      const token = this.user.bsc_token
      const result = await API.setVenus(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 compound
  async setCompound(value: string): Promise<void> {
    this.clearTimeout()
    try {
      this.user.compound_token = value
      const token = this.user.bsc_token
      const result = await API.setCompound(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 cream
  async setCream(value: string): Promise<void> {
    this.clearTimeout()
    try {
      this.user.cream_token = value
      const token = this.user.bsc_token
      const result = await API.setCream(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 autofarm
  async setAutofarm(value: string): Promise<void> {
    this.clearTimeout()
    try {
      this.user.autofarm_token = value
      const token = this.user.bsc_token
      const result = await API.setAutofarm(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 beltfit
  async setBeltfit(value: string): Promise<void> {
    this.clearTimeout()
    try {
      this.user.belt_token = value
      const token = this.user.bsc_token
      const result = await API.setBeltfit(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 bunny
  async setBunny(value: string): Promise<void> {
    this.clearTimeout()
    try {
      this.user.bunny_token = value
      const token = this.user.bsc_token
      const result = await API.setBunny(this.projectName, token, value)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }
}

export default Store
