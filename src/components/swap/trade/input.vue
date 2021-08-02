<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue'
// @ts-ignore
import { toUpper } from 'ramda'
import { getInject, margetState } from '~/utils/use/state'
import { toNumber } from '~/utils'
import { getPairSymbolData, Web3Util } from '~/utils/ethereum/util'
import { stateName } from '~/utils/ethereum/interface'

const props = defineProps({
  // symbol 地址
  symbol: {
    type: String,
    required: true
  },
  // 钱包地址
  web3: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
})

const active = ref<number>(1)
const balance = ref<number>(0)
const decimals = ref<number>(0)

let input = ref<string | number>('')
const updateInput = margetState(stateName.stateInput)
const state = getInject(stateName.stateInput)

// 监听 state input 数据
watch(state, function([data]: [any]) {
  if (data) {
    // 获取当前 symbol 对应的数据，并设置
    input.value = data[props.symbol]
  }
})

// 数量发生变化
const onChangeInput = function() {
  const value = input.value
  const data = {
    [props.symbol]: value, // 修改的值
    trigger: props.symbol, // 触发的 symbol 名称
  }
  updateInput(data)
}


const ready = async function() {
  const state = getInject(stateName.statePair)
  const [detail] = state.value
  const symbol = getPairSymbolData(detail, props.symbol)
  if (symbol) {
    if (symbol.token) {
      const web3: Web3Util = props.web3 as any
      const count = await web3.getSymbolBalance(symbol.token)
      console.log(count)
      balance.value = count || 0
    } else {
      balance.value = 0
    }
    decimals.value = toNumber(symbol.decimals)
  }
}

// @ts-ignore
const onChangeBalance = function(index: number) {
  active.value = index
  const ratio = index - 1
  const split = balance.value / 4
  const value = split * ratio
  if (value > 0) {
    input.value = value
  } else {
    input.value = ''
  }
  onChangeInput()
}

onMounted(ready)

</script>

<template>
  <div class="bg-global-body p-3 rounded-md select-none">
    <div class="text-sm text-global-default text-opacity-65 flex justify-between items-center">
      <span>{{ index === 0 ? 'From': 'To' }}</span>
      <span v-show="index === 0">
        <span>钱包余额:</span>
        <span class="ml-1">{{ balance }}</span>
        <span class="ml-1">{{ toUpper(symbol) }}</span>
      </span>
    </div>
    <div class="pt-3.5 flex items-center justify-between">
      <div class="text-lg select-none">
        <span>{{ toUpper(symbol) }}</span>
      </div>
      <div class="flex-1 ml-5">
        <input class="w-full text-right text-global-highTitle" placeholder="0" v-model="input" @input="onChangeInput"/>
      </div>
    </div>
  </div>
  <div v-if="index === 0" class="pt-1.5 flex">
    <template v-for="i in 5" :key="i">
      <span class="speedy" :class="{'active': active === i}" @click="onChangeBalance(i)">{{ i }}</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
input {
  background: none;
  border: 0;
  outline:none;
  box-shadow: none;
  /* chrome / webkit */
  &::-webkit-input-placeholder{
    @apply text-global-default text-opacity-35;
  }
  /* 火狐 */
  &::-moz-placeholder{
    @apply text-global-default text-opacity-35;
  }
  /* ie */
  &::-ms-input-placeholder{
    @apply text-global-default text-opacity-35;
  }
}

.speedy {
  transition: all 0.3s;
  @apply cursor-pointer ml-1.5 first:ml-0;
  @apply flex-1 text-center inline-block rounded py-1 bg-global-body;
  &.active {
    @apply bg-global-primary text-white;
  }
}

</style>



