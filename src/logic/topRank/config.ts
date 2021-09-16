export const dappHeader = [
  { key:'order',name: '排名', width: 'w-10.5 ', class: '', sort: false },
  { key:'name',name: '名称', width: 'w-35', class: ' ', sort: false },
  { key:'categories',name: '类别', width: 'w-30', class: ' justify-center ', sort: false },
  { key:'chains',name: '公链', width: 'w-40', class: ' justify-center ', sort: false },
  { key:'users',name: '用户/变化率', width: 'w-40', class: ' justify-end ', sort: true },
  { key:'revenue',name: '收入/变化率', width: 'w-40', class: ' justify-end ', sort: true },
  { key:'tvl',name: 'TVL/变化率', width: 'w-40', class: ' justify-end  ', sort: true },
  { key:'mcap_tvl',name: 'MCap/TVL', width: 'w-40', class: ' justify-end  ', sort: true },
]
export const dappHeaderMobile = [
  { key:'order',name: '排名', width: 'w-10.5 ', class: '', sort: false },
  { key:'name',name: '名称', width: 'w-33', class: '  ', sort: false },
  { key:'tvl',name: 'TVL/变化率', width: 'w-33', class: ' justify-center  ', sort: true },
  { key:'mcap_tvl',name: 'MCap/TVL', width: 'w-33', class: ' justify-center  ', sort: true },
  { key:'categories',name: '类别', width: 'w-33', class: ' justify-center  ', sort: false },
  { key:'chains',name: '公链', width: 'w-33', class: ' justify-center  ', sort: false },
  { key:'users',name: '用户/变化率', width: 'w-33', class: ' justify-center  ', sort: true },
  { key:'revenue',name: '收入/变化率', width: 'w-33', class: ' justify-center  ', sort: true },
]

export const nftHeader = [
  { key:'order',name: '排名', width: 'w-10.5 md:min-w-7 ', class: ' ', sort: false },
  { key:'name',name: '名称', width: 'w-47', class: ' justify-center ', sort: false },
  { key:'categories',name: '类别', width: 'w-87', class: ' justify-center ', sort: false },
  { key:'volume',name: 'Volume', width: 'w-30', class: ' justify-end ', sort: true },
  { key:'h24_volume_change_percent',name: '24H', width: 'w-46', class: ' justify-end ', sort: true },
  { key:'d7_volume_change_percent',name: '7D', width: 'w-46', class: ' justify-end ', sort: true },
  { key:'owners',name: 'Owners', width: 'w-46', class: ' justify-end  ', sort: true },
  { key:'assets',name: 'Assets', width: 'w-46', class: ' justify-end  ', sort: true },
  { key:'floor_price',name: 'Floor Price', width: 'w-46', class: ' justify-end  ', sort: true },
  { key:'avg_price',name: 'Avg Price', width: 'w-46', class: ' justify-end  ', sort: true },
  { key:'mcap',name: 'MCap', width: 'w-46', class: ' justify-end  ', sort: true },
]



export enum chainPage {
  dapp_new='dapp_new',
  dapp_rank='dapp_rank',
  nft_new='nft_new',
  nft_rank='nft_rank',
}