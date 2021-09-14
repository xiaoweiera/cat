import { equalsIgnoreCase } from '~/utils'


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
}

const getAlias = function(value: string): string {
  if (value) {
    let link: string = value
    for(const name in aliasConfig) {
      if (equalsIgnoreCase(name, value)) {
        // @ts-ignore
        link = aliasConfig[name]
        break
      }
    }
    return link;
  }
  return 'icon-morentoken'
}


export { aliasConfig, getAlias }
