/**
 * @file 获取 window 下的 ethereum 对象
 */

interface EthereumOption {
  isMetaMask: boolean // 是否安装
  selectedAddress: string // 地址
  isConnected: () => boolean // 是否已链接
  [key: string]: any
}

const Ethereum = function(): EthereumOption {
  // @ts-ignore
  return window?.ethereum
}

export default Ethereum
