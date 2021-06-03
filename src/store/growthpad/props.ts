/**
 * @author svon.me@gmail.com
 */

export enum MissionStatus {
  init = 'init',
  loading = 'loading',
  success = 'succeed',
  fail = 'fail',
}

export const transformStatus = function(
  status: string | MissionStatus,
): MissionStatus {
  if (status) {
    if (status === MissionStatus.loading) {
      return MissionStatus.loading
    }
    if (status === MissionStatus.success) {
      return MissionStatus.success
    }
    if (status === MissionStatus.fail) {
      return MissionStatus.fail
    }
  }
  // 默认初始化状态
  return MissionStatus.init
}

export interface Info {
  // bsc_token: string // 领取奖励的地址
  bsc: string

  // pancake_token: string // pancake  token地址
  pancake: string

  // uniswap_token: string // uniswap  token地址
  uniswap: string

  // sushiswap_token: string // sushiswap  token地址
  sushiswap: string

  // twitter: string // twitter id
  follow_twitter: string
  retweet: string

  // telegram: string // telegram id
  telegram_group: string

  // autofarm_token: string // autofarm token 地址
  autofarm: string

  // belt_token: string // belt.fit token 地址
  belt: string

  // weibo: string // 微博昵称
  follow_weibo: string

  // venus_token: string // venus token 地址
  venus: string

  // cream_token: string // cream token 地址
  cream: string

  // compound_token: string // compound token 地址
  compound: string

  // bunny_token: string // bunny token 地址
  bunny: string
}

export interface Mission {
  pancake: MissionStatus // pancake验资是否通过
  uniswap: MissionStatus // uniswap验资是否通过
  sushiswap: MissionStatus // sushiswap验资是否通过
  retweet: MissionStatus // 是否转发推特
  follow_twitter: MissionStatus // 是否关注推特
  telegram_group: MissionStatus // 电报群

  autofarm: MissionStatus // autofarm
  belt: MissionStatus // belt.fit

  follow_weibo: MissionStatus // 是否关注微博

  venus: MissionStatus // venus 验资
  compound: MissionStatus // compound 验资
  cream: MissionStatus // cream 验资

  bunny: MissionStatus
}
