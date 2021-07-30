
import { ChainItem } from './interface'

// https://cdn.jsdelivr.net/gh/CoinTool-App/cdn/static/js/chunk-4f52e2c6.51aeb87c.js

export enum ChainId {
  BNB = 56,
  tBNB = 97,
}

export const chainList: ChainItem[] = [{
  name: "BSC Mainnet",
  chainID: ChainId.BNB,
  rpc: "https://bsc-dataseed1.binance.org",
  scan: "https://bscscan.com",
  decimals: 18,
  currency: "BNB"
}, {
  name: "BSC Testnet",
  chainID: ChainId.tBNB,
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  scan: "https://testnet.bscscan.com",
  decimals: 18,
  currency: "tBNB"
}, {
  name: "Heco Mainnet",
  chainID: 128,
  rpc: "https://http-mainnet.hecochain.com",
  scan: "https://hecoinfo.com",
  decimals: 18,
  currency: "HT"
}, {
  name: "Heco Testnet",
  chainID: 256,
  rpc: "https://http-testnet.hecochain.com",
  scan: "https://testnet.hecoinfo.com",
  decimals: 18,
  currency: "tHT"
}, {
  name: "OKEX Testnet",
  chainID: 65,
  rpc: "https://exchaintestrpc.okex.org",
  scan: "https://www.oklink.com/okexchain-test/",
  decimals: 18,
  currency: "tOKT"
}, {
  name: "HSC Testnet",
  chainID: 170,
  rpc: "https://http-testnet.hoosmartchain.com",
  scan: "https://testnet.hscscan.com",
  decimals: 18,
  currency: "HOO"
}]
