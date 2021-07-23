<script setup lang="ts">
import { defineProps, onMounted, ref, watch, computed } from 'vue'
import { getPairSymbolData, Web3Util, getAmountOut } from '~/utils/ethereum/util'
import { useProvide } from '~/utils/use/state'
import { toArray, numberDecimal, decimalFormat, equalsIgnoreCase } from '~/utils'
import { stateName } from '~/utils/ethereum/interface'
// @ts-ignore
import { getAddress } from '~/utils/ethereum/status'
import { toUpper } from 'ramda'
import bignumber from 'bignumber.js'

const props = defineProps({
  // 合约地址
  pair: {
    type: String,
    required: true
  }
})
// @ts-ignore
const [ detail, setDetail ] = useProvide(stateName.statePair, {})
const [ symbolInput, setSymbolInput ] = useProvide(stateName.stateInput, {
})


const symbolNames = ref<string[]>([])

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
  const web3 = new Web3Util()
  const data = await web3.getPairInfo(props.pair)
  if (data) {
    const names: string[] = [
      data.symbol0.symbol,
      data.symbol1.symbol
    ]
    symbolNames.value = names

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
  const web3 = new Web3Util()
  const info = getPairSymbolData(detail.value[0], symbol)
  if (info) {
    const status = await web3.getAuthorizatioStatus(info.token)
    console.log('status = ', status)
  }
}

onMounted(ready)

</script>

<template>
  <div class="w-100 p-4 text-kdExp">
    <template v-for="(symbol, index) in symbolNames" :key="`${symbol}-${index}`">
      <div>
        <div v-show="index > 0" class="text-center py-4">
          <IconFont type="icon-switch" class="text-3xl cursor-pointer" @click="onSwitch"></IconFont>
        </div>
        <SwapTradeInput :symbol="symbol" :index="index"/>
      </div>
    </template>
    <div class="mt-4" v-show="symbolRatio">
      <p class="text-sm leading-5">
        <span class="text-global-default text-opacity-65">兑换比例:</span>
        <span class="ml-1 text-global-highTitle">{{ symbolRatio }}</span>
      </p>
    </div>
    <Before :app="getAddress" content="请先连接钱包">
      <div class="mt-4 rounded bg-global-primary text-base py-2.5 text-center cursor-pointer" @click="onAuthorizatio">
        <span class="text-white select-none">授权</span>
      </div>
    </Before>
  </div>
</template>



