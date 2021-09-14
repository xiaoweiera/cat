export const dappHeader = [
  { name: '排名', width: 'w-10.5 ', class: '', sort: false },
  { name: '名称', width: 'w-35', class: ' ', sort: false },
  { name: '类别', width: 'w-30', class: ' justify-center ', sort: false },
  { name: '公链', width: 'w-40', class: ' justify-center ', sort: false },
  { name: '用户/变化率', width: 'w-40', class: ' justify-end ', sort: false },
  { name: '收入/变化率', width: 'w-40', class: ' justify-end ', sort: false },
  { name: 'TVL/变化率', width: 'w-40', class: ' justify-end  ', sort: false },
  { name: 'MCap/TVL', width: 'w-40', class: ' justify-end  ', sort: false },
]
export const dappHeaderMobile = [
  { name: '排名', width: 'w-10.5 ', class: '', sort: false },
  { name: '名称', width: 'w-33', class: '  ', sort: false },
  { name: 'TVL/变化率', width: 'w-33', class: ' justify-center  ', sort: false },
  { name: 'MCap/TVL', width: 'w-33', class: ' justify-center  ', sort: false },
  { name: '类别', width: 'w-33', class: ' justify-center  ', sort: false },
  { name: '公链', width: 'w-33', class: ' justify-center  ', sort: false },
  { name: '用户/变化率', width: 'w-33', class: ' justify-center  ', sort: false },
  { name: '收入/变化率', width: 'w-33', class: ' justify-center  ', sort: false },
]
export enum chainPage {
  dapp_new='dapp_new',
  dapp_rank='dapp_rank',
  nft_new='nft_new',
  nft_rank='nft_rank',
}