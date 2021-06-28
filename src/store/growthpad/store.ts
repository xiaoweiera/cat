/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { reactive, ref } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { Info, Mission, MissionStatus, transformStatus } from './props'
import { postInfo, postInfoBasis } from './directive'
import { isLogin } from '~/logic/user/login'
import * as API from '~/api/growtask'
import TaskType from '~/logic/growthpad/tasktype'
import { getProjectType, ProjectKey, ProjectMockData, ProjectShareCode } from '~/logic/growthpad/config'
import I18n from '~/utils/i18n'

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
  tokenDetail?: string
  qrcode?: string
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

interface Address {
  placeholder: string
}

class Store {
  token = ''
  shareCode = ref<string>('')
  intervalTime = 10000
  // 当前币价
  price = ref<string | number>(0)
  // 用户活动的奖励
  reward = ref<string | number>(0)
  // 用户要求参与活动的数量
  invited_count = ref<number>(0)
  // 当前项目用户要求参与活动的数量
  project_invited_count = ref<number>(0)
  // @ts-ignore
  projectName: ProjectKey // 项目名称
  title = ref<string>('') // title
  icon = ref<string>('') // icon
  // 首屏数据
  dashboard = reactive<DashboardData>({
    banner: '',
  })
  // 地址信息
  address = reactive<Address>({
    placeholder: I18n.growthpad.mdx.address.placeholder
  })
  // 项目介绍
  about = reactive<AboutData>({
    minutias: [],
    share: [],
    qrcode: '',
    website: '',
    detail: '',
    tokenDetail: '',
  })

  // 任务列表
  taskList = ref<TaskItem[]>([])
  // 个人信息, 用户数据
  info = reactive<Info>({
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
    chainwallet: '', // chainwallet token 地址
  })

  // 完成状态
  mission = reactive<Mission>({
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
    chainwallet: MissionStatus.init, // chainwallet 验资
  })

  article_url = ref<string>('article_url') // 用户上传的文章链接
  article_image = ref<string>('') // 用户上传的图片
  article_audit = ref<boolean>(false) // 用户文章审核状态
  article_reward = ref<number>(0) // 用户文章的奖励

  // 微信群图片
  chatPicture = ref<string[]>([])
  // 朋友圈图片
  friendPicture = ref<string[]>([])

  private timeout: any = 0

  // 构造方法
  constructor(type: string) {
    const key = getProjectType(type)
    if (type && key) {
      this.projectName = key
      this.shareCode.value = ProjectShareCode[key]

      // @ts-ignore
      const mock = ProjectMockData[key]
      if (mock) {
        this.setInitData(mock)
      }
    }
  }

  clearTimeout(): void {
    clearTimeout(this.timeout)
  }

  // 设置基础数据
  protected setInitData(data: any) {
    this.token = data.token as string
    this.title.value = data.title
    this.icon.value = data.icon
    // 地址信息
    this.address.placeholder = safeGet<string>(data, 'address.placeholder')
    // dashboard 数据
    this.dashboard.banner = safeGet<string>(data, 'dashboard.banner')
    this.dashboard.begin = safeGet<string>(data, 'dashboard.begin')
    this.dashboard.end = safeGet<string>(data, 'dashboard.end')
    this.dashboard.description = safeGet<string>(data, 'dashboard.description')
    this.dashboard.rewardCount = safeGet<number>(data, 'dashboard.reward.count')
    this.dashboard.rewardLimit = safeGet<number[]>(data, 'dashboard.reward.limits')
    // about 数据
    this.about.website = safeGet<string>(data, 'about.website')
    this.about.detail = safeGet<string>(data, 'about.detail')
    this.about.share = safeGet<ShareItem[]>(data, 'about.share')
    this.about.qrcode = safeGet<string>(data, 'about.qrcode')
    this.about.tokenDetail = safeGet<string>(data, 'about.tokenDetail')
    const minutias = safeGet<Minutia[]>(data, 'about.minutias') || []
    for (const item of minutias) {
      const minutia: Minutia = {
        label: item.label,
        value: item.value,
      }
      this.about.minutias.push(minutia)
    }

    // 任务列表
    this.taskList.value = safeGet<TaskItem[]>(data, 'taskList')
  }

  getNickName(): ProjectKey {
    return this.projectName
  }

  getName(): string {
    if (this.getNickName() === ProjectKey.channels) {
      return 'Channels'
    }
    if (this.getNickName() === ProjectKey.coinwind) {
      return 'CoinWind'
    }
    if (this.getNickName() === ProjectKey.growth) {
      return 'GrowthPad'
    }
    return this.getNickName()
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
      this.info.chainwallet = info.chainwallet
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
      this.mission.chainwallet = transformStatus(mission.chainwallet)
    }
    this.article_audit.value = !!safeGet(result, 'article_audit')
    this.article_image.value = safeGet<string>(result, 'article_image')
    this.article_url.value = safeGet<string>(result, 'article_url')
    this.article_reward.value = safeGet<number>(result, 'article_reward') || 0

    // 朋友圈图片
    this.friendPicture.value
      = safeGet<string[]>(result, 'wechat_friend_circle') || []
    // 微信群图片
    this.chatPicture.value = safeGet<string[]>(result, 'wechat_group') || []

    // growth pad 任务不启动自动刷新
    if (this.getNickName() !== ProjectKey.growth) {
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
    const name = this.getNickName()
    if (name !== ProjectKey.growth) {
      const result = await API.getProjectInfo(name)
      this.updateData(result)
    } else {
      const [result1, result2]: any = await Promise.all([
        API.getGrowthPicture(name),
        API.getProjectInfo(name),
      ])
      const code = safeGet<number>(result1, 'data.code')
      if (code === 0) {
        const data = safeGet<object>(result1, 'data.data')
        const value = Object.assign({}, result2, data)
        this.updateData(value)
      } else {
        this.updateData(result2)
      }
    }
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
      // 刷新接口
      this.init().then()
      return result
    } catch (e) {
      this.updateData({})
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

  // 设置 chainWallet
  @postInfo('chainWallet')
  @postInfoBasis()
  setChainWallet(value: string) {
    this.info.chainwallet = value
  }

  // 上传朋友圈图片
  async setFriendPicture(picture: string[]): Promise<string[] | void> {
    this.clearTimeout()
    try {
      this.friendPicture.value = picture
      const query = { wechat_friend_circle: picture }
      const result: any = await API.setFriendPicture(this.getNickName(), query)
      const code = safeGet<number>(result, 'data.code')
      if (code === 0) {
        const list = safeGet<string[]>(result, 'data.data.wechat_friend_circle')
        this.friendPicture.value = list
        return list
      }
    } catch (e) {
      // todo
      return Promise.reject(e)
    }
  }

  // 上传朋友圈图片
  async setChatPicture(picture: string[]): Promise<string[] | void> {
    this.clearTimeout()
    try {
      this.chatPicture.value = picture
      const query = { wechat_group: picture }
      const result: any = await API.setChatPicture(this.getNickName(), query)
      const code = safeGet<number>(result, 'data.code')
      if (code === 0) {
        const list: string[] = safeGet<string[]>(
          result,
          'data.data.wechat_group',
        )
        this.chatPicture.value = list
        return list
      }
    } catch (e) {
      // todo
      return Promise.reject(e)
    }
  }
}

export default Store
