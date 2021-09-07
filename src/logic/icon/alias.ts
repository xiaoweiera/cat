import { equalsIgnoreCase } from '~/utils'


const aliasConfig = {
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


export { aliasConfig, getAlias }
