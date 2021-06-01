/**
 * @file 判断输入框内容
 * @author svon.me@gmail.com
 */

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

export enum ValueStatus {
  empty = 'empty', // 未填写
  check = 'check', // 验证中
  success = 'success', // 成功
}

const check: any = {
  telegram(store: Store): ValueStatus {
    // 如果已加入电报群
    if (store.mission.telegram_group) {
      return ValueStatus.success
    }
    // 如果已填写电报 ID
    if (store.user.telegram) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  twitter(store: Store): ValueStatus {
    // 如果已关注 twitter
    if (store.mission.follow_twitter) {
      return ValueStatus.success
    }
    // 判断是否填写来 twiiter
    if (store.user.twitter) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  retwitter(store: Store): ValueStatus {
    // 判断是否转发来 twitter 内容
    if (store.mission.retweet) {
      return ValueStatus.success
    }
    // 判断是否填写来 twiiter
    if (store.user.twitter) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  pancake(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.pancake) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.pancake_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  uniswap(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.uniswap) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.uniswap_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  sushiswap(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.sushiswap) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.sushiswap_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  sina(store: Store): ValueStatus {
    // 判断是否已关注微博
    if (store.mission.follow_weibo) {
      return ValueStatus.success
    }
    // 判断是否填写来微博昵称
    if (store.user.weibo) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  venus(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.venus) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.venus_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  compound(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.compound) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.compound_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  cream(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.cream) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.cream_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  autofarm(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.autofarm) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.autofarm_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  beltfit(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.belt) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.belt_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
  bunny(store: Store): ValueStatus {
    // 判断 token 地址验证状态
    if (store.mission.bunny) {
      return ValueStatus.success
    }
    // 判断是否填写 token 地址
    if (store.user.bunny_token) {
      return ValueStatus.check
    }
    return ValueStatus.empty
  },
}

export const getValueStatus = function(
  name: string,
  store: Store,
): ValueStatus {
  if (name) {
    const status: ValueStatus = check[name]
      ? check[name](store)
      : ValueStatus.empty
    if (status) {
      return status
    }
  }
  return ValueStatus.empty
}
