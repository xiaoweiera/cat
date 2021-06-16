/**
 * @file 判断输入框内容
 * @author svon.me@gmail.com
 */

import { MissionStatus } from '~/store/growthpad/props'
import Store from '~/store/growthpad/store'

export const addressEnum = {
  telegram: 'setTelegram',
  twitter: 'setTwitter',
  retwitter: 'setReTwitter',

  pancake: 'setPancake',
  uniswap: 'setUniswap',
  sushiswap: 'setSushiswap',

  sina: 'setSinaNickname',
  venus: 'setVenus',
  compound: 'setCompound',
  cream: 'setCream',

  autofarm: 'setAutofarm',
  beltfit: 'setBeltfit',

  bunny: 'setBunny',
}

const check: any = {
  // 电报群
  telegram(store: Store): MissionStatus {
    return store.mission.telegram_group
  },
  // 是否关注推特
  twitter(store: Store): MissionStatus {
    return store.mission.follow_twitter
  },
  // 判断是否转发推文
  retwitter(store: Store): MissionStatus {
    return store.mission.retweet
  },
  // token 验证状态
  pancake(store: Store): MissionStatus {
    return store.mission.pancake
  },
  // uniswap 验证状态
  uniswap(store: Store): MissionStatus {
    return store.mission.uniswap
  },
  // sushiswap 验证状态
  sushiswap(store: Store): MissionStatus {
    return store.mission.sushiswap
  },
  // 判断是否已关注微博
  sina(store: Store): MissionStatus {
    return store.mission.follow_weibo
  },
  // 判断 venus 验证状态
  venus(store: Store): MissionStatus {
    // 判断 token 地址验证状态
    return store.mission.venus
  },
  // compound 验证状态
  compound(store: Store): MissionStatus {
    return store.mission.compound
  },
  // cream 验证状态
  cream(store: Store): MissionStatus {
    return store.mission.cream
  },
  autofarm(store: Store): MissionStatus {
    // 判断 token 地址验证状态
    return store.mission.autofarm
  },
  beltfit(store: Store): MissionStatus {
    // 判断 token 地址验证状态
    return store.mission.belt
  },
  bunny(store: Store): MissionStatus {
    // 判断 token 地址验证状态
    return store.mission.bunny
  },
}

export const getValueStatus = function(
  name: string | undefined,
  store: Store,
  data?: any
): MissionStatus {
  if (name) {
    const status: MissionStatus = check[name] ? check[name](store) : MissionStatus.init
    if (status && status === MissionStatus.success) {
      return MissionStatus.success
    }
    // 判断是否为暂停
    if (data.suspend) {
      return MissionStatus.suspend
    }
    if (status) {
      return status
    }
  }
  return MissionStatus.init
}
