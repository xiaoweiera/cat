import I18n from '~/utils/i18n/index'
export const dappHeader = [
  { key:'order',name: I18n.dapp.rank.table.order, width: 'w-10.5 ', class: ' i8n-font-Barlow', sort: false },
  { key:'name',name: I18n.dapp.rank.table.name, width: 'w-78', class: ' i8n-font-Barlow ', sort: false },
  { key:'categories',name: I18n.dapp.rank.table.type, width: 'w-30', class: ' justify-center i8n-font-Barlow', sort: false },
  { key:'chains',name: I18n.dapp.rank.table.chain, width: 'w-20', class: ' justify-center i8n-font-Barlow', sort: false },
  { key:'users',name: I18n.dapp.rank.table.user, width: 'w-40', class: ' justify-end i8n-font-Barlow', sort: true },
  // { key:'revenue',name: '收入/变化率', width: 'w-40', class: ' justify-end ', sort: true },
  { key:'balance',name: I18n.dapp.rank.table.balance, width: 'w-40', class: ' justify-end i8n-font-Barlow', sort: true },
  { key:'volume',name: I18n.dapp.rank.table.volume, width: 'w-40', class: ' justify-end i8n-font-Barlow', sort: true },
  { key:'marketcap',name: I18n.dapp.rank.table.marketcap, width: 'w-40', class: ' justify-end i8n-font-Barlow', sort: true },
  { key:'tvl',name: I18n.dapp.rank.table.tvl, width: 'w-40', class: ' justify-end  i8n-font-Barlow', sort: true },
  { key:'mcap_tvl',name: I18n.dapp.rank.table.mcap, width: 'w-40', class: ' justify-end  i8n-font-Barlow', sort: true },
]
export const dappHeaderMobile = [
  { key:'order',name: I18n.dapp.rank.table.order, width: 'w-10.5 ', class: ' i8n-font-Barlow', sort: false },
  { key:'name',name: I18n.dapp.rank.table.name, width: 'w-85', class: ' i8n-font-Barlow', sort: false },
  { key:'tvl',name: I18n.dapp.rank.table.tvl, width: 'w-33', class: ' justify-center  i8n-font-Barlow', sort: true },
  { key:'mcap_tvl',name: I18n.dapp.rank.table.mcap, width: 'w-33', class: ' justify-center   i8n-font-Barlow', sort: true },
  { key:'categories',name: I18n.dapp.rank.table.type, width: 'w-33', class: ' justify-center  i8n-font-Barlow', sort: false },
  { key:'chains',name: I18n.dapp.rank.table.chain, width: 'w-20', class: ' justify-center i8n-font-Barlow', sort: false },
  { key:'users',name: I18n.dapp.rank.table.user, width: 'w-33', class: ' justify-center  i8n-font-Barlow', sort: true },
  { key:'balance',name:I18n.dapp.rank.table.balance, width: 'w-33', class: ' justify-center i8n-font-Barlow', sort: true },
  { key:'volume',name: I18n.dapp.rank.table.volume, width: 'w-33', class: ' justify-center i8n-font-Barlow', sort: true },
  { key:'marketcap',name: I18n.dapp.rank.table.marketcap, width: 'w-33', class: ' justify-center i8n-font-Barlow', sort: true },
  // { key:'revenue',name: '收入/变化率', width: 'w-33', class: ' justify-center  ', sort: true },
]

export const nftHeader = [
  { key:'order',name: I18n.nft.rank.table.order, width: 'w-10.5 md:min-w-7 ', class: ' i8n-font-Barlow', sort: false },
  { key:'name',name: I18n.nft.rank.table.name, width: 'w-95', class: ' justify-center i8n-font-Barlow ', sort: false },
  { key:'categories',name: I18n.nft.rank.table.type, width: 'w-85 ', class: ' justify-center i8n-font-Barlow ', sort: false },
  { key:'volume',name: 'Volume', width: 'w-42', class: ' justify-end i8n-font-Barlow ', sort: true },
  { key:'h24_volume_change_percent',name: '24H', width: 'w-42', class: ' justify-end i8n-font-Barlow', sort: true },
  { key:'d7_volume_change_percent',name: '7D', width: 'w-42', class: ' justify-end i8n-font-Barlow', sort: true },
  { key:'owners',name: 'Owners', width: 'w-42', class: ' justify-end  i8n-font-Barlow', sort: true },
  { key:'assets',name: 'Assets', width: 'w-42', class: ' justify-end  i8n-font-Barlow', sort: true },
  { key:'floor_price',name: 'Floor Price', width: 'w-42', class: ' justify-end  i8n-font-Barlow', sort: true },
  { key:'avg_price',name: 'Avg Price', width: '', class: ' justify-end  i8n-font-Barlow', sort: true },
  { key:'mcap',name: 'MCap', width: 'w-42', class: ' justify-end i8n-font-Barlow ', sort: true },
]



export enum chainPage {
  dapp_new='dapp_new',
  dapp_rank='dapp_rank',
  nft_new='nft_new',
  nft_rank='nft_rank',
}