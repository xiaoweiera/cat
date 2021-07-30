<script setup lang="ts">
import { defineProps, onMounted, ref, watch, computed, reactive } from 'vue'
import { getPairSymbolData, Web3Util, getAmountOut } from '~/utils/ethereum/util'
import { useProvide } from '~/utils/use/state'
import { toArray, numberDecimal, decimalFormat, equalsIgnoreCase } from '~/utils'
import { EventType, stateName } from '~/utils/ethereum/interface'
// @ts-ignore
import { getAddress } from '~/utils/ethereum/status'
import { toUpper } from 'ramda'
import bignumber from 'bignumber.js'
import safeGet from '@fengqiaogang/safe-get'
import Message from '~/utils/message'

const props = defineProps({
  // 合约地址
  pair: {
    type: String,
    required: true
  },
  // 钱包地址
  walletAddress: {
    type: String,
  }
})

let web3: Web3Util

// @ts-ignore
const [ detail, setDetail ] = useProvide(stateName.statePair, {})
const [ symbolInput, setSymbolInput ] = useProvide(stateName.stateInput, {
})

// 获取 input symbol 名称
const getInputSymbolName = function(): string | undefined {
  const [ data ] = symbolInput.value
  const name = safeGet<string>(data, 'trigger')
  if (name) {
    return name
  }
  return void 0
}

// loading 装
// @ts-ignore
const loading = ref<boolean>(false)

// 币种名称
const symbolNames = ref<string[]>([])
// 币种授权状态
const symbolAuths = reactive<{[key: string]: boolean}>({})
// 交易按钮状态
// @ts-ignore
const swapStatus = computed<boolean>(function(): boolean {
  let flag = true
  const names: string[] = symbolNames.value
  const [ data ] = symbolInput.value
  for(let i = 0; i < names.length; i++) {
    const key = names[i]
    const status = symbolAuths[key]
    const count = safeGet<number>(data, key)
    if (!status || !count) {
      flag = false
      break
    }
  }
  if (flag) {
    if (!getInputSymbolName()) {
      flag = false
    }
  }
  return flag
})

// 切换交易对 symbol 信息
// @ts-ignore
const onSwitch = function() {
  const names = toArray(symbolNames.value)
  symbolNames.value = names.reverse()
}

// 兑换比例
const swapRatio = function(symbol0: string, symbol1: string): string | number | undefined {
  if (symbol0 && symbol1) {
    const pairInfo = detail.value[0]
    const info0 = getPairSymbolData(pairInfo, symbol0)
    const info1 = getPairSymbolData(pairInfo, symbol1)
    if (info0 && info1) {
      const amountIn = numberDecimal(1, info0.decimals)
      const value = getAmountOut(amountIn, info0.reserveCount, info1.reserveCount)
      if (value) {
        return decimalFormat(value, info1.decimals)
      }
    }
  }
  return void 0
}

const ready = async function() {
  web3 = new Web3Util(props.pair)
  const data = await web3.getPairInfo()
  if (data) {
    const names: string[] = [
      data.symbol0.symbol,
      data.symbol1.symbol
    ]
    symbolNames.value = names
    const status = await Promise.all([
      web3.getAuthorizatioStatus(data.symbol0.token),
      web3.getAuthorizatioStatus(data.symbol1.token)
    ])
    symbolAuths[data.symbol0.symbol] = status[0]
    symbolAuths[data.symbol1.symbol] = status[1]

    setDetail(data)
  }
}

// 监听 symbol 合约数量变化
watch(symbolInput, function([data]: [any]) {
  // 获取触发的 symbol 名称
  const { trigger: formSymbol } = data
  if (formSymbol) {
    // 获取目标 symbol 名称
    let toSymbol: string = ''
    const names: string[] = symbolNames.value
    for(let i = 0; i < names.length; i++) {
      if (equalsIgnoreCase(formSymbol, names[i])) {
        continue
      }
      toSymbol = names[i]
      break
    }
    const form: string | number = data[formSymbol]
    let to: number = 0
    if (form) {
      // 根据兑换比例，计算目标 symbol 数量
      const ratio = swapRatio(formSymbol, toSymbol)
      if (ratio) {
        to = new bignumber(form).times(ratio).toNumber()
      }
    }
    // 修改数据
    setSymbolInput({
      trigger: formSymbol,
      [formSymbol]: form,
      [toSymbol]: to
    })
  }
})


// 兑换比例
// @ts-ignore
const symbolRatio = computed<string>(function(): string {
  const [ symbol0, symbol1 ] = symbolNames.value
  if (symbol0 && symbol1) {
    const ratio = swapRatio(symbol0, symbol1)
    if (ratio) {
      return toUpper(`1 ${symbol0} = ${ratio} ${symbol1}`)
    }
  }
  return ''
})

// 授权
// @ts-ignore
const onAuthorizatio = async function() {
  const [ symbol ] = symbolNames.value
  const info = getPairSymbolData(detail.value[0], symbol)
  if (info) {
    try {
      // 发起授权
      await web3.postApprove(info.token)
      // 设置授权状态
      symbolAuths[info.symbol] = true
    } catch (e) {

    }
  }
}

// 发起交易
// @ts-ignore
const onSwap = async function() {
  const [ symbol0, symbol1 ] = symbolNames.value
  const info0 = getPairSymbolData(detail.value[0], symbol0)
  const info1 = getPairSymbolData(detail.value[0], symbol1)
  if (info0 && info1) {
    const inputName = getInputSymbolName()
    if (inputName) {
      const [ data ] = symbolInput.value
      const amount: number = safeGet<number>(data, inputName)
      const onChangeCallBack = function(type: EventType) {
        if (type === EventType.transactionHash) {
          loading.value = true
        }
      }
      try {
        const status = await web3.swap(info0.token, info1.token, inputName === symbol0 ? info0.token : info1.token, amount, onChangeCallBack)
        if (status) {
          Message.alert('提示', '交易完成')
        }
      } catch (e) {
        Message.alert('提示', '交易失败，请重试')
      } finally {
        loading.value = false
      }
    }
  }
}

onMounted(ready)

</script>

<template>
  <div class="relative w-full h-full">
    <Spin :fit="false" :loading="loading">
      <div class="w-100 p-4 text-kdExp">
        <div class="flex justify-between text-global-default text-opacity-65 pb-4">
          <div>
            <span class="text-base">交易</span>
          </div>
          <div>
            <el-popover placement="bottom" >
              <template #reference>
                <IconFont type="icon-setting" class="text-xl cursor-pointer"/>
              </template>
              <div class="w-50 whitespace-nowrap">
                这是一段内容,这是一段内容,这是一段内容,这是一段内容。
              </div>
            </el-popover>
          </div>
        </div>
        <template v-for="(symbol, index) in symbolNames" :key="`${symbol}-${index}`">
          <div>
            <div v-show="index > 0" class="text-center py-4">
              <IconFont type="icon-switch" class="text-3xl cursor-pointer" @click="onSwitch"></IconFont>
            </div>
            <SwapTradeInput :symbol="symbol" :wallet-address="walletAddress" :index="index"/>
          </div>
        </template>
        <div class="mt-4" v-show="symbolRatio">
          <p class="text-sm leading-5">
            <span class="text-global-default text-opacity-65">兑换比例:</span>
            <span class="ml-1 text-global-highTitle">{{ symbolRatio }}</span>
          </p>
        </div>
        <div class="mt-4">
          <!--已连接钱包-->
          <template v-if="walletAddress">
            <!-- 判断是否已授权 -->
            <div v-if="symbolAuths[symbolNames[0]]">
              <Before :app="getAddress" content="请先连接钱包">
                <el-button :disabled="!swapStatus" type="primary" class="rounded w-full bg-global-primary text-base py-2.5 text-center cursor-pointer" @click="onSwap">
                  <span class="text-white select-none">交易</span>
                </el-button>
              </Before>
            </div>
            <!-- 进行授权 -->
            <div v-else>
              <Before :app="getAddress" content="请先连接钱包">
                <div class="rounded bg-global-primary text-base py-2.5 text-center cursor-pointer" @click="onAuthorizatio">
                  <span class="text-white select-none">授权</span>
                </div>
              </Before>
            </div>
          </template>
          <div v-show="!walletAddress">
            <slot name="wallet"></slot>
          </div>
        </div>
      </div>
    </Spin>
  </div>
</template>



