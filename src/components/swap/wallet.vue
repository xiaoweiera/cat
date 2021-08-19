<script setup lang="ts">
import Wallet from '~/utils/ethereum/wallet'
import { EventType } from '~/utils/ethereum/interface'
import { getErrorMessageContent } from '~/utils/ethereum/message'
import { defineEmits, onMounted, ref, defineProps } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import Message from '~/utils/message'
import { sleep } from '~/utils'

const props = defineProps({
  chainId: {
    type: Number,
    required: true
  }
})

const emitEvent = defineEmits(['change', 'click'])

const address = ref<string>('')

let wallet: Wallet

const format = function(value) {
  if (value) {
    return value.replace(/(\w{3})\w*(\w{4})/,"$1****$2")
  }
  return ''
}
// 监听钱包地址变化
const onChangeAccount = async function() {
  const value = await wallet.getChainAddress()
  if (value) {
    address.value = value
  } else {
    address.value = ''
  }
  emitEvent('change', value)
}

const beforeAuthorize = function(): boolean {
  try {
    wallet.expectNetWork()
    return true
  } catch (e) {
    return false
  }
}

// 点击
// @ts-ignore
const onClick = async function() {
  try {
    const status = await wallet.enableEthereum()
    if (status) {
      emitEvent('click')
    }
  } catch (e) {
    const code = safeGet<number>(e, 'code')
    const tips = getErrorMessageContent(code)
    Message.alert('提示', tips)
  }
}

const switchNetWork = async function() {
  try {
    // 切换网络
    await wallet.connectChain()
    // 授权钱包连接
    await sleep(onClick)
  } catch (e) {
    const code = safeGet<number>(e, 'code')
    const tips = getErrorMessageContent(code)
    Message.alert('提示', tips)
  }
}

onMounted(function() {
  wallet = new Wallet(props.chainId)
  // 切换账户
  wallet.on(EventType.account, onChangeAccount)
  // 账户退出
  wallet.on(EventType.disconnect, onChangeAccount)
  setTimeout(onChangeAccount, 0)
})

</script>

<template>
  <Before :app="beforeAuthorize" @confirm="switchNetWork">
    <div class="py-2.5 px-3 bg-global-primary inline-block rounded cursor-pointer" @click="onClick">
      <template v-if="address">
        <slot name="default" :address="address" :format="format(address)">
          <span class="text-white">{{ format(address) }}</span>
        </slot>
      </template>
      <template v-else>
        <IconFont type="icon-wallet" class="text-white text-base"></IconFont>
        <span class="text-white ml-1">链接钱包</span>
      </template>
    </div>
    <template #content>
      <p>当前不是 Heco 网络， 是否切换？</p>
    </template>
  </Before>
</template>
