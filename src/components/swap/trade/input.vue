<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue'
// @ts-ignore
import { toUpper } from 'ramda'
import { getInject } from '~/utils/use/state'
import { decimalFormat, toNumber } from '~/utils'
import { Web3Util } from '~/utils/ethereum/util'
import { stateName } from '~/utils/ethereum/interface'
import safeGet from '@fengqiaogang/safe-get'

const props = defineProps({
  // symbol 地址
  info: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
})
//
const active = ref<number>(1)
const balance = ref<number>(0)

const tmpWeb3 = getInject(stateName.swap)
const symbolInput = getInject(stateName.stateInput)
const watchSymbolInput = getInject(stateName.watchInput)

const getWeb3Util = function<T>(): T | undefined {
  const [ web3 ] = tmpWeb3.value
  if (web3) {
    try {
      return web3() as any
    }
    catch (e) {
      // todo
    }
  }
}

let input = ref<string | number>('')


// 监听 state input 数据
watch(symbolInput, function([data]: [any]) {
  const key = props.info?.token
  if (data && key) {
    // // 获取当前 symbol 对应的数据，并设置
    const value = safeGet<number>(data, key) || 0
    if (toNumber(input.value) !== toNumber(value)) {
      input.value = value
    }
  }
})

// 数量发生变化
const onChangeInput = function() {
  if (watchSymbolInput) {
    const [change] = watchSymbolInput.value
    if (change) {
      const value = input.value
      change(props.index, value)
    }
  }
}

const ready = async function() {
  const info = props.info
  const web3 = getWeb3Util<Web3Util>()
  if (info && web3) {
    const count = await web3.getSymbolBalance(info.token)
    if (count) {
      const number = decimalFormat(count, info.decimals)
      balance.value = toNumber(number, 4)
    } else {
      balance.value = 0
    }
  }
}
//
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
//
onMounted(() => setTimeout(ready))

</script>

<template>
  <div class="bg-global-body p-3 rounded-md select-none">
    <div class="text-sm text-global-default text-opacity-65 flex justify-between items-center">
      <span>{{ index === 0 ? 'From': 'To' }}</span>
      <span v-show="index === 0">
        <span>钱包余额:</span>
        <span class="ml-1">{{ balance }}</span>
        <span class="ml-1">{{ toUpper(info.symbol) }}</span>
      </span>
    </div>
    <div class="pt-3.5 flex items-center justify-between">
      <div class="text-lg select-none">
        <span>{{ toUpper(info.symbol) }}</span>
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



