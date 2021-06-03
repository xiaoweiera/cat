/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { reactive, ref } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import mockMdx from '../../../mock/growthpad/mdx'
import mockChannels from '../../../mock/growthpad/channels'
import mockCoinWind from '../../../mock/growthpad/coinwind'
import mockGrowth from '../../../mock/growthpad/growth'
import { Info, Mission, MissionStatus, transformStatus } from './props'
import { postInfo, postInfoBasis } from './directive'
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
  tooltipAfter?: Tooltip
  children?: Array<TaskItem>
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
  public info = reactive<Info>({
    bsc: '', // 领取奖励的地址
    pancake: '', // pancake  token地址
    uniswap: '', // uniswap  token地址
    sushiswap: '', // sushiswap  token地址
    follow_twitter: '', // twitter id
    retweet: '', // 转发 twitter id
    telegram_group: '', // telegram id
    autofarm: '', // autofarm token 地址
    belt: '', // belt.fit token 地址
    follow_weibo: '', // 微博昵称
    venus: '', // venus token 地址
    cream: '', // cream token 地址
    compound: '', // compound token 地址
    bunny: '', // bunny token 地址
  })

  // 完成状态
  public mission = reactive<Mission>({
    invited: MissionStatus.init, // 邀请任务状态
    pancake: MissionStatus.init, // pancake验资是否通过
    uniswap: MissionStatus.init, // uniswap验资是否通过
    sushiswap: MissionStatus.init, // sushiswap验资是否通过
    retweet: MissionStatus.init, // 是否转发推特
    follow_twitter: MissionStatus.init, // 是否关注推特
    telegram_group: MissionStatus.init, // 电报群
    autofarm: MissionStatus.init, // autofarm
    belt: MissionStatus.init, // belt.fit
    follow_weibo: MissionStatus.init, // 是否关注微博
    venus: MissionStatus.init, // venus 验资
    compound: MissionStatus.init, // compound 验资
    cream: MissionStatus.init, // cream 验资
    bunny: MissionStatus.init,
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
    } else if (type && API.getProjectType(type) === API.Project.growth) {
      this.projectName = API.Project.growth
      this.shareCode.value = '-G4'
      this.setInitData(mockGrowth)
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
    const info: Info = safeGet<Info>(result, 'info')
    const mission: Mission = safeGet<Mission>(result, 'mission')
    if (result?.price) {
      this.price.value = result.price
    }
    this.reward.value = result?.reward || 0
    this.invited_count.value = result?.invited_count || 0
    this.project_invited_count.value = result?.project_invited_count || 0
    // 更新 info 信息
    if (info) {
      this.info.bsc = info.bsc
      this.info.pancake = info.pancake
      this.info.uniswap = info.uniswap
      this.info.sushiswap = info.sushiswap
      this.info.follow_twitter = info.follow_twitter
      this.info.retweet = info.retweet
      this.info.telegram_group = info.telegram_group
      this.info.autofarm = info.autofarm
      this.info.belt = info.belt
      this.info.follow_twitter = info.follow_twitter
      this.info.venus = info.venus
      this.info.cream = info.cream
      this.info.compound = info.compound
      this.info.bunny = info.bunny
    }
    if (mission) {
      this.mission.invited = transformStatus(mission.invited)
      this.mission.pancake = transformStatus(mission.pancake)
      this.mission.uniswap = transformStatus(mission.uniswap)
      this.mission.sushiswap = transformStatus(mission.sushiswap)
      this.mission.retweet = transformStatus(mission.retweet)
      this.mission.follow_twitter = transformStatus(mission.follow_twitter)
      this.mission.telegram_group = transformStatus(mission.telegram_group)
      this.mission.autofarm = transformStatus(mission.autofarm)
      this.mission.belt = transformStatus(mission.belt)
      this.mission.follow_weibo = transformStatus(mission.follow_weibo)
      this.mission.venus = transformStatus(mission.venus)
      this.mission.compound = transformStatus(mission.compound)
      this.mission.cream = transformStatus(mission.cream)
      this.mission.bunny = transformStatus(mission.bunny)
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
  @postInfo('bsc')
  setAdress(value: string) {
    // 设置地址
    this.info.bsc = value
  }

  // 设置 telegram id
  @postInfo('telegram_group')
  // post 时携带基础数据
  @postInfoBasis()
  setTelegram(id: string) {
    this.info.telegram_group = id
  }

  // 设置 twitter id
  @postInfo('follow_twitter')
  // post 时携带基础数据
  @postInfoBasis()
  setTwitter(id: string) {
    this.info.follow_twitter = id
  }

  // 转发 twitter
  @postInfo('retweet')
  // post 时携带基础数据
  @postInfoBasis()
  setReTwitter(id: string) {
    this.info.retweet = id
  }

  // 发布微博, 微博文章
  async setWeiboContent(form: FormData): Promise<any> {
    this.clearTimeout()
    try {
      const result = await API.setWeiboContent(this.getNickName(), form)
      this.updateData(result)
      return result
    } catch (e) {
      this.updateData()
      return Promise.reject(e)
    }
  }

  // 设置 pancake
  @postInfo('pancake')
  @postInfoBasis()
  setPancake(value: string) {
    this.info.pancake = value
  }

  // 设置 uniswap
  @postInfo('uniswap')
  @postInfoBasis()
  setUniswap(value: string) {
    this.info.uniswap = value
  }

  // 设置 sushiswap
  @postInfo('sushiswap')
  @postInfoBasis()
  setSushiswap(value: string) {
    this.info.sushiswap = value
  }

  // 设置微博名称
  @postInfo('follow_weibo')
  @postInfoBasis()
  setSinaNickname(value: string) {
    this.info.follow_weibo = value
  }

  // 设置 venus
  @postInfo('venus')
  @postInfoBasis()
  setVenus(value: string) {
    this.info.venus = value
  }

  // 设置 compound
  @postInfo('compound')
  @postInfoBasis()
  setCompound(value: string) {
    this.info.compound = value
  }

  // 设置 cream
  @postInfo('cream')
  @postInfoBasis()
  setCream(value: string) {
    this.info.cream = value
  }

  // 设置 autofarm
  @postInfo('autofarm')
  @postInfoBasis()
  setAutofarm(value: string) {
    this.info.autofarm = value
  }

  // 设置 beltfit
  @postInfo('belt')
  @postInfoBasis()
  setBeltfit(value: string) {
    this.info.belt = value
  }

  // 设置 bunny
  @postInfo('bunny')
  @postInfoBasis()
  setBunny(value: string) {
    this.info.bunny = value
  }
}

export default Store
