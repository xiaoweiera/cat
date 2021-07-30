<script setup lang="ts">
import Wallet from '~/utils/ethereum/wallet'
import { onMounted, ref, defineEmit } from 'vue'
import Message from '~/utils/message'
import safeGet from '@fengqiaogang/safe-get'
import { onAdd } from '~/utils/ethereum'

const emitEvent = defineEmit(['change'])

const address = ref<string>('')

// @ts-ignore
let wallet: Wallet

const onWatchAddress = function() {
  try {
    // 监听用户钱包地址
    web3.onChangeAccount(function(value: string) {
      if (value) {
        address.value = value.replace(/(\w{3})\w*(\w{4})/,"$1****$2")
      } else {
        address.value = ''
      }
      emitEvent('change', value)
    })
  } catch (e) {
  }
}


// 链接钱包
// @ts-ignore
const openWallet = async function() {

}

onMounted(function() {
  wallet = new Wallet(128) // 默认为
  onWatchAddress()
})

</script>

<template>
  <div class="py-2.5 px-3 bg-global-primary inline-block rounded cursor-pointer" @click="openWallet">
    <IconFont type="icon-wallet" class="text-white text-base"></IconFont>
    <template v-if="address">
      <span class="text-white ml-1">{{ address }}</span>
    </template>
    <template v-else>
      <span class="text-white ml-1">链接钱包</span>
    </template>
  </div>
</template>
