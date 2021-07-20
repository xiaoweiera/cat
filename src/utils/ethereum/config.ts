// @ts-ignore
import { ChainId, WETH } from '@uniswap/sdk'

/**
 * uni路由地址
 */
const UniRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
/**
 * Uni工厂合约地址
 */
const UniFactoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
/**
 * ETH浏览器url
 */
const EthBrowserUrl = 'https://rinkeby.etherscan.io/tx/'
// const EthBrowserUrl = 'https://etherscan.io/tx/'
/**
 * BSC 浏览器URL
 */
const BscBrowserUrl = 'https://bscscan.com/tx/'

/**
 * H
 */
const HecoBrowserUrl = 'https://hecoinfo.com'
/**
 * pancake路由合约
 */
const PanckaeRouterAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
/**
 * pancake工厂合约地址
 */
const PanckaeFactoryAddress = '0xBCfCcbde45cE874adCB698cC183deBcF17952812'
/**
 * mdex路由合约
 */
const MdexRouterAddress = '0xED7d5F38C79115ca12fe6C0041abb22F0A06C300'
/**
 * mdex工厂合约
 */
const MdexFactoryAddress = '0xb0b670fc1F7724119963018DB0BfA86aDb22d941'
/**
 * sushi路由合约
 */
// 这是正式
// const SuShiRouterAddress = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
    // 这是测试
const SuShiRouterAddress = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'

const SushiFactoryAddress = '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac'
/**
 * uni网络ID
 */
const UniChainId = ChainId.RINKEBY
/**
 * WETH地址
 */
const UniWETHAddress = WETH[UniChainId].address
// 正式
// const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
/**
 * WBNB地址
 */
const WBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

const WHTAddress = '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f'
/**
 * sushi WETH地址
 */
const SushiWETHAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

export default {
    EthBrowserUrl,
    HecoBrowserUrl,
    BscBrowserUrl,
    UniRouterAddress,
    UniFactoryAddress,
    PanckaeRouterAddress,
    PanckaeFactoryAddress,
    MdexRouterAddress,
    MdexFactoryAddress,
    SuShiRouterAddress,
    SushiFactoryAddress,
    UniChainId,
    UniWETHAddress,
    WBNBAddress,
    WHTAddress,
    SushiWETHAddress,

}
