import { equalsIgnoreCase, isEmpty } from '~/utils'

const brights = {
  'discard': 'icon-discord',
  'discord': 'icon-discord',
  'medium': 'icon-medium',
  'weibo': 'icon-weibo',
  'telegram': 'icon-telegram-bright',
  'twitter': 'icon-twitter-bright',
  'wechat': 'icon-wechat-1',

  'key': 'icon-key-1',
  'join': 'icon-join1',
  'safe': 'icon-safe-1'
}

const aliasConfig = {
  // 简化
  'telegram': 'icon-telegram',
  'android': 'icon-android',
  'apple': 'icon-apple',
  'wechat': 'icon-wechat',
  'email': 'icon-email',
  'twitter': 'icon-twitter',
  'weibo': 'icon-weibo1',
  'facebook': 'icon-facebook-circle-fill',
  'github': 'icon-github',
  'mobile': 'icon-shouji',
  'phone': 'icon-shouji',
  'medium':'icon-medium1',
  'discard': 'icon-discord1',
  'discord': 'icon-discord1',
  // 链
  'BSC': 'icon-BSC',
  'HOO': 'icon-HOO',
  'HECO': 'icon-HECO',
  'ETH': 'icon-ETH',
  'OEC': 'icon-OK',
  'POS': 'icon-POS',
  'POLYGON': 'icon-POS',

  // 项目类型
  'Farm': 'icon-F',
  'Vault': 'icon-V',
  'Lending': 'icon-L',
  'Borrow': 'icon-B',
  'Supply': 'icon-S',
  'Deposit': 'icon-D',
  'Staking': 'icon-S',
  'Liquidity': 'icon-L',

  'key': 'icon-key',
  'join': 'icon-join',
  'safe': 'icon-safe'
}

const getAlias = function(value: string, bright?: boolean): string {
  if (value) {
    let link: string = ''
    if (bright) {
      for(const name in brights) {
        if (equalsIgnoreCase(name, value)) {
          // @ts-ignore
          link = brights[name]
          break
        }
      }
    }
    if (isEmpty(link)) {
      link = value
      for(const name in aliasConfig) {
        if (equalsIgnoreCase(name, value)) {
          // @ts-ignore
          link = aliasConfig[name]
          break
        }
      }
    }
    return link;
  }
  return 'icon-morentoken'
}


export { aliasConfig, getAlias }
